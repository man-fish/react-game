import React from "react";
import { connect } from "react-redux";

import { debounce } from "lodash";

import * as actionCreator from "../store/actionCreator";

const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyLeft = 37;
const keyW = 87;
const keyS = 83;
const keyA = 65;
const keyD = 68;
const keyEnter = 13;

class Controller extends React.Component {
    constructor(...args) {
        super(...args);
        const { delay } = this.props;
        this.keyUpHandler = debounce(this.handleKeyUp, delay, {
            leading: true,
        });
    }

    componentDidMount() {
        window.addEventListener("keyup", this.keyUpHandler, false);
        // Disable arrow keys scroll page
        window.addEventListener("keydown", this.keyDownHandler, false);
    }

    componentWillUnmount() {
        // Never forget remove event after component unmounted,
        // avoid memory leak
        window.removeEventListener("keyup", this.keyUpHandler, false);
        window.removeEventListener("keydown", this.keyDownHandler, false);
    }

    keyDownHandler = (e) => {
        switch (e.keyCode) {
            case keyUp:
            case keyDown:
            case keyLeft:
            case keyRight:
                // case keySpace:
                e.preventDefault();
                break;
            default:
                break;
        }
    };

    handleKeyUp = (e) => {
        switch (e.keyCode) {
            case keyW:
            case keyUp:
                this.handleMoveUp();
                break;
            case keyS:
            case keyDown:
                this.handleMoveDown();
                break;
            case keyA:
            case keyLeft:
                this.handleMoveLeft();
                break;
            case keyD:
            case keyRight:
                this.handleMoveRight();
                break;
            case keyEnter:
                console.log(keyEnter);
                this.handleReset();
                break;
            default:
                break;
        }
    };

    generalMove(move) {
        move();
        let { isMoved } = this.props;
        if (isMoved) this.props.audioMove.play();
        setTimeout(() => {
            if (isMoved) {
                this.props.audioPopup.play();
                this.props.onPlaceRandom();
            }
        }, 300);
    }

    handleMoveUp = (e) => {
        this.generalMove(this.props.onMoveUp);
    };

    handleMoveLeft = (e) => {
        this.generalMove(this.props.onMoveLeft);
    };

    handleMoveDown = (e) => {
        this.generalMove(this.props.onMoveDown);
    };

    handleMoveRight = (e) => {
        this.generalMove(this.props.onMoveRight);
    };

    handleReset = (e) => {
        this.props.onReset();
    };

    render() {
        // const { delay } = this.props;
        return (
            <div className="b2048__controller">
                Use "W","A","S","D" to Controll, And use "Enter" to Restart.
                {/* <button onClick={debounce(this.handleMoveUp, delay)}>↑</button>
                <div className="b2048__controller__two">
                    <button onClick={debounce(this.handleMoveLeft, delay)}>
                        ←
                    </button>
                    <button onClick={debounce(this.handleMoveDown, delay)}>
                        ↓
                    </button>
                    <button onClick={debounce(this.handleMoveRight, delay)}>
                        →
                    </button>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isMoved: state.getIn(["2048", "isMoved"]),
});

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaceRandom() {
            dispatch(actionCreator.placeRandom());
        },
        onMoveLeft() {
            dispatch(actionCreator.moveLeft());
        },
        onMoveRight() {
            dispatch(actionCreator.moveRight());
        },
        onMoveUp() {
            dispatch(actionCreator.moveUp());
        },
        onMoveDown() {
            dispatch(actionCreator.moveDown());
        },
        onReset() {
            dispatch(actionCreator.reset());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
