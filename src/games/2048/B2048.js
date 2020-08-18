import React from "react";

import Board from "./components/Board";
import Panel from "./components/Panel";

import moveAudio from "../../assets/audio/2048/move.mp3";
import popupAudio from "../../assets/audio/2048/popup.mp3";

import "../../assets/css/game/2048/index.scss";

export default class B2048 extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            delay: 200,
        };
        // Control game audio
        this.audioMove = new Audio(moveAudio);
        this.audioPopup = new Audio(popupAudio);
    }

    componentDidMount() {
        this.props.initGame();
    }
    render() {
        let { board, score, gameOver } = this.props;
        const { audioMove, audioPopup } = this;
        const { delay } = this.state;
        return (
            <div className="b2048__container">
                <Board board={board}></Board>
                <Panel
                    score={score}
                    gameOver={gameOver}
                    audioMove={audioMove}
                    audioPopup={audioPopup}
                    delay={delay}
                ></Panel>
            </div>
        );
    }
}
