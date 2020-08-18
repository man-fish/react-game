import React from "react";

import "../../assets/css/app/AudioPlayer/index.scss";

import Disk from "./components/Disk";
import Controller from "./components/Controller";
import ProgressBar from "./components/ProgressBar";

export default class AudioPlayer extends React.Component {
    render() {
        let { hasMusic, isPlaying, player } = this.props;
        return (
            <div className="APlayer">
                <div className="APlayer__disk">
                    <Disk hasMusic={hasMusic} isPlaying={isPlaying}></Disk>
                </div>
                <div className="APlayer__controller">
                    <Controller
                        hasMusic={hasMusic}
                        isPlaying={isPlaying}
                    ></Controller>
                </div>
                <div className="APlayer__progress">
                    <ProgressBar
                        hasMusic={hasMusic}
                        isPlaying={isPlaying}
                        player={player}
                    ></ProgressBar>
                </div>
            </div>
        );
    }
}
