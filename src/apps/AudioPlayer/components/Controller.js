import React from "react";

import { connect } from "react-redux";
import * as actionCreator from "../store/actionCreator";

class Controller extends React.Component {
    render() {
        let { isPlaying, hasMusic } = this.props;
        let centerIcon = <i className="fa fa-ban" />;
        if (hasMusic) {
            centerIcon = isPlaying ? (
                <i className="fa fa-pause" />
            ) : (
                <i className="fa fa-play" />
            );
        }
        return (
            <div className="APlayer__controller__container">
                <div
                    className="APlayer__controller__radio"
                    onClick={this.ControllHandler.bind(
                        this,
                        this.props.getPrev
                    )}
                >
                    <i className="fa fa-backward" />
                </div>
                <div
                    className={
                        isPlaying
                            ? "APlayer__controller__radio APlayer__controller__radio--active"
                            : "APlayer__controller__radio"
                    }
                    onClick={this.ControllHandler.bind(
                        this,
                        isPlaying ? this.props.pause : this.props.start
                    )}
                >
                    {centerIcon}
                </div>
                <div
                    className="APlayer__controller__radio"
                    onClick={this.ControllHandler.bind(
                        this,
                        this.props.getNext
                    )}
                >
                    <i className="fa fa-forward" />
                </div>
            </div>
        );
    }
    ControllHandler(handler) {
        if (this.props.hasMusic) {
            handler();
        } else {
            alert("no musics");
        }
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getNext() {
            dispatch(actionCreator.getNextMusic());
        },
        getPrev() {
            dispatch(actionCreator.getPrevMusic());
        },
        start() {
            dispatch(actionCreator.start());
        },
        pause() {
            dispatch(actionCreator.pause());
        },
    };
};

export default connect(null, mapDispatchToProps)(Controller);
