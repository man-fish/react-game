import React from "react";

import Board from "./components/Board";
import Panel from "./components/Panel";

import "../../assets/css/game/2048/index.scss";

export default class B2048 extends React.Component {
    componentDidMount() {
        this.props.initGame();
    }
    render() {
        let { board, score, gameOver } = this.props;
        return (
            <div className="b2048__container">
                <Board board={board}></Board>
                <Panel score={score} gameOver={gameOver}></Panel>
            </div>
        );
    }
}
