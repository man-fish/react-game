import React from "react";

import Controller from "./Controller";

export default class Panel extends React.Component {
    render() {
        let { score, gameOver } = this.props;
        return (
            <div className="b2048__panel">
                <div className="b2048__panel__info">
                    <h1>2048 Game</h1>
                    <p>Score: {score}</p>
                </div>
                <Controller delay={300}></Controller>
            </div>
        );
    }
}
