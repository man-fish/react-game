import React from "react";
import { connect } from "react-redux";

import * as actionCreator from "../store/actionCreator";

class Disk extends React.Component {
    constructor(props) {
        super(props);

        this.handleFile = this.handleFile.bind(this);
    }

    render() {
        let { hasMusic, isPlaying } = this.props;
        return (
            <div
                className={
                    !isPlaying
                        ? "APlayer__disk__container"
                        : "APlayer__disk__container APlayer__disk__container--playing"
                }
            >
                <label
                    htmlFor="file"
                    className={
                        !isPlaying
                            ? "APlayer__disk__cover"
                            : "APlayer__disk__cover APlayer__disk__cover--playing"
                    }
                ></label>
                <input
                    id="file"
                    type="file"
                    htmlref="file"
                    accept=".mp3"
                    multiple
                    onChange={this.handleFile}
                />
            </div>
        );
    }
    handleFile(e) {
        e.persist();
        let files = e.target.files ? e.target.files : [];
        for (let i = 0; i < files.length; i++) {
            this.props.addMusic(files[i]);
        }
        e.target.value = "";
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMusic(file) {
            dispatch(actionCreator.addMusic(file));
        },
    };
};

export default connect(null, mapDispatchToProps)(Disk);
