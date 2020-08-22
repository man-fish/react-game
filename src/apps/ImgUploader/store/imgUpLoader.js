import config from "../../../config/config";
const imgFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

class Dispatcher {
    constructor() {
        this.handlers = [];
    }
    listen(handler) {
        this.handlers.push(handler);
    }
    emit(...args) {
        this.handlers.forEach((handler) => {
            handler(...args);
        });
    }
}

class ImgUpLoader {
    constructor(uploadUrl) {
        this.uploadUrl = uploadUrl;
        this.files = [];
        this.emptyImg = {
            xhr: null,
            name: "",
            mime: "",
            size: 0,
            base64: "",
            binaryString: "",
            loaded: 0,
            total: 0,
            percentage: 0,
            isPrepared: false,
            isUploaded: false,
            isUploading: false,
        };
        this.isUploading = false;
        this.isPrepared = false;
        // this.uploadingIdx = -1;
        this.onUploading = new Dispatcher();
        this.onError = new Dispatcher();
        this.onLoaded = new Dispatcher();
    }

    _loadImgFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const loader = new FileReader();
            if (!file || !imgFilter.test(file.type)) {
                resolve(new Error("not a img"));
            }
            loader.onload = (e) => {
                let imgBase64 = e.target.result;
                resolve(imgBase64);
            };
            loader.onerror = reject;
            loader.readAsDataURL(file);
        });
    }

    _loadImgFileToBinary(file) {
        return new Promise((resolve, reject) => {
            const loader = new FileReader();
            if (!file || !imgFilter.test(file.type)) {
                resolve(new Error("not a img"));
            }
            loader.onload = (e) => {
                let imgBase64 = e.target.result;
                resolve(imgBase64);
            };
            loader.onerror = reject;
            loader.readAsBinaryString(file);
        });
    }

    async append(file) {
        const imgBase64 = await this._loadImgFileToBase64(file);
        const imgBinary = await this._loadImgFileToBinary(file);
        const img = {
            xhr: null,
            name: file.name,
            mime: file.type,
            size: file.size,
            base64: imgBase64,
            binaryString: imgBinary,
            loaded: 0,
            total: 0,
            percentage: 0,
            isPrepared: false,
            isUploaded: false,
            isUploading: false,
        };
        let newList = [...this.files.slice(), img];
        this.files = newList;
        return this;
    }

    delete(idx) {
        if (
            idx < 0 ||
            idx >= this.files.length ||
            this.files[idx].isUploading ||
            this.files[idx].isUploaded
        ) {
            return this;
        }
        const newList = [
            ...this.files.slice(0, idx),
            ...this.files.slice(idx + 1),
        ];
        this.files = newList;
        return this;
    }

    cancel(idx) {
        if (
            (idx >= 0 &&
                idx < this.files.length &&
                this.files[idx].isUploading) ||
            this.files[idx].isUploaded
        ) {
            this.files[idx].xhr.abort();
            this.files[idx].isUploading = false;
            this.files[idx].isUploaded = false;
            this.isUploading = false;
            for (let i = 0; i < this.files.length; i++) {
                if (i === idx) {
                    continue;
                }
                if (this.files[i].isUploading) {
                    this.isUploading = true;
                }
            }
            return this.delete(idx);
        }
        return this;
    }

    uploadPrepare() {
        this.isUploading = true;
        this.isPrepared = true;
        for (let i = 0; i < this.files.length; i++) {
            this.files[i].isPrepared = true;
            this.files[i].xhr = new XMLHttpRequest();
        }
        let newList = this.files.slice();
        this.files = newList;
        return this;
    }

    async uploadAll() {
        if (!this.isPrepared) {
            return this;
        }
        for (let i = 0; i < this.files.length; i++) {
            if (!this.files[i].isUploaded && !this.files[i].isUploading) {
                this.files[i].isUploading = true;
                await this._upload(this.files[i], i).catch((err) => {
                    console.log(err);
                });
            }
        }
        this.isUploading = false;
        this.isPrepared = false;
        return this;
    }

    _upload(imgFile, fileIdx) {
        const { xhr, binaryString } = imgFile;
        return new Promise((resolve, reject) => {
            // 更新文件上传进度
            xhr.upload.addEventListener(
                "progress",
                function (e) {
                    if (e.lengthComputable) {
                        imgFile.loaded = e.loaded;
                        imgFile.total = e.total;

                        var percentage = Math.ceil((e.loaded * 100) / e.total);
                        imgFile.percentage = percentage;
                        // this.onUploading.emit(this);
                    }
                },
                false
            );
            // 文件上传成功
            xhr.upload.addEventListener(
                "load",
                (e) => {
                    imgFile.isUploaded = true;
                    imgFile.isUploading = false;
                    this.onLoaded.emit(fileIdx);
                    resolve("upload success");
                },
                false
            );
            // 文件上传失败
            xhr.addEventListener("error", (e) => {
                imgFile.isUploading = false;
                this.onError.emit(fileIdx);
                reject("error" + e.type.toString());
            });
            xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
            xhr.open("POST", this.uploadUrl);
            xhr.send(binaryString);
        });
    }
}

export const loader = new ImgUpLoader(config.uploadUrl);
