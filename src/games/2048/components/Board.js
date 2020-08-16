import React from "react";

import Row from "./Row";

export default class Board extends React.Component {
    render() {
        let { board } = this.props;
        return (
            <div className="b2048__board">
                {board.map((row, idx) => {
                    return <Row row={row} key={idx}></Row>;
                })}
            </div>
        );
    }
}
