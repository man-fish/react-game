import React from "react";

import Piece from "./Piece";

export default class Row extends React.Component {
    render() {
        let { row } = this.props;
        // console.log(row);
        return (
            <div className="b2048__row">
                {row.map((ceil, idx) => {
                    return <Piece point={ceil} key={idx}></Piece>;
                })}
            </div>
        );
    }
}
