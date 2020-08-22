import * as actionType from "./constants";

const defaultState = {
    thing: "",
    intended: ["something to do"],
    completed: ["something completed"],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionType.CHANGE_INPUT_VALUE:
            return Object.assign({}, state, {
                thing: action.value,
            });
        case actionType.CLEAR_TODO_LIST:
            return Object.assign({}, state, {
                intended: [],
                completed: [],
            });
        case actionType.ADD_TODO_ITEM:
            let thing = state.thing ? state.thing : "no thing is everything";
            return Object.assign({}, state, {
                intended: [...state.intended, thing],
            });
        case actionType.FINISH_TODO_ITEM:
            return Object.assign({}, state, {
                completed: [...state.completed, state.intended[action.index]],
                intended: [
                    ...state.intended.slice(0, action.index),
                    ...state.intended.slice(action.index + 1),
                ],
            });
        default:
            return state;
    }
};
