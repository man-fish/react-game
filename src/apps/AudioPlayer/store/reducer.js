import Player from "./player";
import * as actionTypes from "./contants";

let player = new Player();

const defaultState = {
    player,
    isPlaying: false,
    hasMusic: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MUSIC: {
            player.append(action.file);
            return Object.assign({}, state, {
                hasMusic: action.file ? true : false,
            });
        }
        case actionTypes.GET_NEXT: {
            player.next();
            return Object.assign({}, state, {
                isPlaying: true,
            });
        }
        case actionTypes.GET_PREV: {
            player.prev();
            return Object.assign({}, state, {
                isPlaying: true,
            });
        }
        case actionTypes.START: {
            player.play();
            return Object.assign({}, state, {
                isPlaying: true,
            });
        }
        case actionTypes.PAUSE: {
            player.pause();
            return Object.assign({}, state, {
                isPlaying: false,
            });
        }
        default:
            return state;
    }
};
