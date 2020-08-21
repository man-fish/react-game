import * as actionTypes from "./constants";

import { loader } from "./imgUpLoader";

const defaultState = {
    files: [],
    isUploading: false,
    isPrepared: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMG: {
            return { ...state, ...action.res };
        }
        case actionTypes.DELETE_IMG: {
            const result = loader.delete(action.idx);
            return { ...state, ...result };
        }
        case actionTypes.UPLOAD_PREPARE: {
            const result = loader.uploadPrepare();
            return { ...state, ...result };
        }
        case actionTypes.UPLOAD_ALL: {
            return { ...state, ...action.res };
        }
        case actionTypes.UPLOAD_CANCEL: {
            const result = loader.cancel(action.idx);
            return { ...state, ...result };
        }
        default:
            return state;
    }
};
