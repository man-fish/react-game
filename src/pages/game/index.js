import React from "react";
import { Route } from "react-router-dom";

import TTT from "../../games/TicTacToe";
import B2048 from "../../games/2048";

import AudioPlayer from "../../apps/AudioPlayer";

import "../../assets/css/game/index.scss";

export default class Games extends React.Component {
    render() {
        return (
            <div className="g-game__container">
                <Route path="/game/ttt" component={TTT}></Route>
                <Route path="/game/2048" component={B2048}></Route>
                <Route path="/game/audio" component={AudioPlayer}></Route>
            </div>
        );
    }
}
