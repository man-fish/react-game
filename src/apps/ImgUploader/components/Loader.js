import React from "react";

export default class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }

    render() {
        let { files } = this.props;
        return (
            <div className="FUploader__loader">
                <label
                    htmlFor="file"
                    className="FUploader__box FUploader__box--add"
                >
                    <input
                        id="file"
                        type="file"
                        htmlref="file"
                        multiple
                        onChange={this.handleAdd}
                    />{" "}
                </label>{" "}
                {files.map((file, idx) => {
                    if (file.isUploading || file.isUploaded) {
                        return null;
                    }
                    return (
                        <div className="FUploader__box" key={idx}>
                            <img src={file.base64} alt={file.name} />
                            <button
                                className="FUploader__box__btn"
                                onClick={this.handleDel.bind(this, idx)}
                            ></button>
                        </div>
                    );
                })}
            </div>
        );
    }

    handleAdd(e) {
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            this.props.addImg(files[i]);
        }

        e.target.value = "";
    }
    handleDel(idx) {
        this.props.deleteImg(idx);
    }
}
