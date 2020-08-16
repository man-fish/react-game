import React from "react";

import { connect } from "react-redux";

import * as actionCreator from "../store/actionCreator";

import Piece from "./Piece";

class Board extends React.Component {
    renderPiece(index) {
        return <Piece piece={this.props.board[index]} index={index}></Piece>;
    }
    render() {
        let { isNextX, winner } = this.props;
        let info = "TicTacToe";
        info = isNextX ? `Next player: X` : `Next player: O`;
        if (winner) info = `Winner: ${winner}`;
        return (
            <div className="ttt__board">
                <div className="ttt__board__info">{info}</div>
                <div className="ttt__board__row">
                    {this.renderPiece(0)}
                    {this.renderPiece(1)}
                    {this.renderPiece(2)}
                </div>
                <div className="ttt__board__row">
                    {this.renderPiece(3)}
                    {this.renderPiece(4)}
                    {this.renderPiece(5)}
                </div>{" "}
                <div className="ttt__board__row">
                    {this.renderPiece(6)}
                    {this.renderPiece(7)}
                    {this.renderPiece(8)}
                </div>
                <button
                    className="ttt__board__btn"
                    onClick={this.props.restartGame}
                >
                    Restart
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.getIn(["ttt", "board"]),
        isNextX: state.getIn(["ttt", "isNextX"]),
        winner: state.getIn(["ttt", "winner"]),
    };
};

const mapDispatchToprops = (dispatch) => {
    return {
        restartGame() {
            dispatch(actionCreator.restartGame());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(Board);
