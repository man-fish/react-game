import React from "react";

import "../../assets/css/public/roundProgress.scss";

export default class RoundProgress extends React.Component {
    render() {
        let { percent } = this.props;
        return (
            <div className="round-progress">
                <span style={{ width: percent }}></span>
            </div>
        );
    }
}
