import * as actionTypes from "./contants";

export const addMusic = (file) => {
    return {
        file,
        type: actionTypes.ADD_MUSIC,
    };
};

export const start = () => {
    return {
        type: actionTypes.START,
    };
};

export const pause = () => {
    return {
        type: actionTypes.PAUSE,
    };
};

export const getPrevMusic = () => {
    return {
        type: actionTypes.GET_PREV,
    };
};

export const getNextMusic = () => {
    return {
        type: actionTypes.GET_NEXT,
    };
};
