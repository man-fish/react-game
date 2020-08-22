import React from "react";

import close from "../../../assets/icon/public/close.svg";

import { loader } from "../store/imgUpLoader";

export default class UploadInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: null,
        };
    }

    render() {
        let { info, idx } = this.props;
        let { info: overInfo } = this.state;
        info = overInfo ? overInfo : info;
        return (
            <React.Fragment>
                <img
                    src={close}
                    alt="close"
                    onClick={this.props.cancelUpload.bind(this, idx)}
                />
                {info}
            </React.Fragment>
        );
    }

    componentDidMount() {
        loader.onError.listen((idx) => {
            this.showError(idx);
        });
        loader.onLoaded.listen((idx) => {
            this.showInfo(idx);
        });
    }

    showError(fileIdx) {
        if (fileIdx !== this.props.idx) {
            return;
        }
        let info = (
            <span style={{ color: "red", fontSize: "14px" }}>upload fail</span>
        );
        this.setState({
            info,
        });
    }

    showInfo(fileIdx) {
        if (fileIdx !== this.props.idx) {
            return;
        }
        let info = (
            <span style={{ color: "green", fontSize: "14px" }}>
                upload success
            </span>
        );
        this.setState({
            info,
        });
    }
}
