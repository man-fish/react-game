import React from "react";

import Loader from "./components/Loader";
import Submitter from "./components/Submitter";

import Uploader from "./components/Uploader";

import "../../assets/css/app/ImgUploader/index.scss";

export default class ImgUploader extends React.Component {
    render() {
        let { files, isPrepared, isUploading } = this.props;
        return (
            <div className="FUploader">
                <div className="FUploader__left">
                    <Loader
                        files={files}
                        addImg={this.props.addImg}
                        deleteImg={this.props.deleteImg}
                    ></Loader>
                    <Submitter uploadAll={this.props.uploadAll}></Submitter>
                </div>
                <div className="divider"></div>
                <div className="FUploader__right">
                    <Uploader
                        files={files}
                        isPrepared={isPrepared}
                        isUploading={isUploading}
                        cancelUpload={this.props.cancelUpload}
                    ></Uploader>
                </div>
            </div>
        );
    }
}
