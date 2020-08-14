import * as actionTypes from "./constants";

const defaultState = {
    games: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_GAMES:
            return Object.assign({}, state, {
                games: action.data,
            });
        default:
            return state;
    }
};
