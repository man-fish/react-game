import React from "react";

export default class Piece extends React.Component {
    render() {
        let { point } = this.props;
        let calculatedPoint = 2 ** point;
        let generateClass = `b2048__piece b2048__piece__${calculatedPoint}`;
        return (
            <div className={generateClass}>
                {" "}
                {point === -1 ? "" : calculatedPoint}
            </div>
        );
    }
}
