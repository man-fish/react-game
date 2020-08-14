import React from "react";
import { Route } from "react-router-dom";

import TTT from "../../games/TicTacToe";

import "../../assets/css/game/index.scss";

export default class Game extends React.Component {
    render() {
        return (
            <div className="g-game__container">
                <Route path="/game/ttt" component={TTT}></Route>
            </div>
        );
    }
}
