import React from "react";

import close from "../../../assets/icon/public/close.svg";

import ImgIcon from "../../../common/ImgIcon";
import RoundProgress from "../../../common/RoundProgress";

import { byteTransform } from "../../../utils/byte";

export default class UploadBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: 0,
            total: 0,
            percentage: "0%",
        };
    }

    render() {
        let { file, idx } = this.props;
        let { loaded, total, percentage } = this.state;
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
                    <img
                        src={close}
                        alt="close"
                        onClick={this.props.cancelUpload.bind(this, idx)}
                    />
                    <span>
                        {byteTransform(loaded) + " "}/
                        {" " + byteTransform(total)}
                    </span>
                </div>
            </div>
        );
    }
    componentDidMount() {
        let { file } = this.props;
        const draw = () => {
            requestAnimationFrame(draw);
            this.setState({
                loaded: file.loaded,
                total: file.total === 0 ? file.size : file.total,
                percentage: `${file.percentage}%`,
            });
        };
        draw();
    }
}
