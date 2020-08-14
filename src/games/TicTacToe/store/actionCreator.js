import * as actionTypes from "./constants";

export const setPiece = (index) => {
    return {
        type: actionTypes.SET_PIECE,
        index,
    };
};

export const restartGame = () => {
    return {
        type: actionTypes.RESTART_GAME,
    };
};
