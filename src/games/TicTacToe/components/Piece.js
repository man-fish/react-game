import React from "react";

import { connect } from "react-redux";

import * as actionCreator from "../store/actionCreator";

class Piece extends React.Component {
    render() {
        let { piece, index } = this.props;
        return (
            <button
                className="ttt__piece"
                onClick={(e) => {
                    this.props.setPiece(e, index);
                }}
            >
                {piece}
            </button>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPiece(e, index) {
            e.preventDefault();
            dispatch(actionCreator.setPiece(index));
        },
    };
};

export default connect(null, mapDispatchToProps)(Piece);
