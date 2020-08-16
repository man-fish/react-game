import * as actionTypes from "./constants";

const actionCreator = (type) => () => ({ type });

export const init = actionCreator(actionTypes.INIT);

export const placeRandom = actionCreator(actionTypes.PLACE_RANDOM);

export const moveUp = actionCreator(actionTypes.MOVE_UP);

export const moveDown = actionCreator(actionTypes.MOVE_DOWN);

export const moveLeft = actionCreator(actionTypes.MOVE_LEFT);

export const moveRight = actionCreator(actionTypes.MOVE_RIGHT);

export const reset = actionCreator(actionTypes.RESET);
