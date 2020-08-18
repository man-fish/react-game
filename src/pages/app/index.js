import React from "react";
import { Route } from "react-router-dom";

import AudioPlayer from "../../apps/AudioPlayer";

import "../../assets/css/app/index.scss";

export default class Apps extends React.Component {
    render() {
        return (
            <div className="g-app__container">
                <Route path="/app/audio" component={AudioPlayer}></Route>
            </div>
        );
    }
}
