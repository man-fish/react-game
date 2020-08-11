import React from "react";

import "../../assets/css/public/progress.scss";

export default class ProgressBar extends React.Component {
    render() {
        const { completed } = this.props;
        const pxty = (completed / 100) * 74 + "px";
        return (
            <div className="progress-container">
                <div className="progress-bar">
                    <div className="completed" style={{ width: pxty }}></div>
                </div>
                <div className="progress-info origami">{completed + "%"}</div>
            </div>
        );
    }
}
