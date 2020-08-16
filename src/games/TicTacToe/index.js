import React from "react";

import Board from "./components/Board";

import "../../assets/css/game/TicTacToe/index.scss";

export default class TTT extends React.Component {
    render() {
        return (
            <div className="ttt__container">
                <Board></Board>
            </div>
        );
    }
}
