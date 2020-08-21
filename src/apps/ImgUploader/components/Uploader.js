import React from "react";

import UploadBox from "./UploadBox";

export default class Uploader extends React.Component {
    render() {
        let { files, isPrepared } = this.props;
        let isUploading = false;
        for (let i = 0; i < files.length; i++) {
            if (files[i].isUploading || files[i].isUploaded) isUploading = true;
        }
        return (
            <div className="FUploader__uploader">
                {!isUploading && (
                    <span className="crumbledPixel">No image uploading...</span>
                )}
                {files.map((file, idx) => {
                    if (file.isUploading || file.isPrepared) {
                        return (
                            <UploadBox
                                file={file}
                                key={idx}
                                idx={idx}
                                cancelUpload={this.props.cancelUpload}
                            ></UploadBox>
                        );
                    }
                })}
            </div>
        );
    }
}
