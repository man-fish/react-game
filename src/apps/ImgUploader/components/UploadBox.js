import React from "react";

import ImgIcon from "../../../common/ImgIcon";
import RoundProgress from "../../../common/RoundProgress";
import UploadInfo from "./UploadInfo";

import { byteTransform } from "../../../utils/byte";

export default class UploadBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: 0,
            total: 0,
            percentage: "0%",
            info: "0B/0B",
            frameId: null,
        };
    }

    componentDidMount() {
        let { file } = this.props;
        const draw = () => {
            let frameId = requestAnimationFrame(draw);
            let loaded = file.loaded;
            let total = file.total === 0 ? file.size : file.total;
            let percentage = `${file.percentage}%`;
            let info = (
                <span>
                    {byteTransform(loaded) + " / " + byteTransform(total)}
                </span>
            );
            this.setState({
                loaded,
                total,
                percentage,
                info,
                frameId,
            });
        };
        draw();
    }

    componentWillUnmount() {
        if (this.state.frameId) {
            cancelAnimationFrame(this.state.frameId);
        }
    }

    render() {
        let { file, idx } = this.props;
        let { info, percentage } = this.state;
        return (
            <div className="FUploader__uploader__box">
                <div className="FUploader__uploader__icon">
                    <ImgIcon type={file.mime}></ImgIcon>
                </div>
                <div className="FUploader__uploader__progress">
                    {file.name}
                    <RoundProgress percent={percentage}></RoundProgress>
                    {/* {file.percentage} */}
                </div>
                <div className="FUploader__uploader__info">
                    <UploadInfo
                        cancelUpload={this.props.cancelUpload}
                        info={info}
                        idx={idx}
                    ></UploadInfo>
                </div>
            </div>
        );
    }
}
