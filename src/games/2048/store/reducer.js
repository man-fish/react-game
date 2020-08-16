import * as actionTypes from "./constants";
import Board from "../ds/Board";

const initState = {
    size: 4,
    maxLevel: 13,
    score: 0,
    board: [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
    ],
    isMoved: true,
    // Array.from({ length: 4 }).map((row) => new Array(4).fill(-1)),
    gameOver: false,
};

export default (state = initState, action) => {
    let b2048 = new Board(state);
    switch (action.type) {
        case actionTypes.INIT: {
            b2048.birth();
            const result = b2048.birth();
            return { ...state, ...result };
        }
        case actionTypes.PLACE_RANDOM: {
            let newLevel = Math.random() > 0.5 ? 2 : 1;
            const result = b2048.birth(newLevel);
            return { ...state, ...result };
        }
        case actionTypes.MOVE_UP: {
            const result = b2048.up();
            return { ...state, ...result };
        }
        case actionTypes.MOVE_DOWN: {
            const result = b2048.down();
            return { ...state, ...result };
        }
        case actionTypes.MOVE_LEFT: {
            const result = b2048.left();
            return { ...state, ...result };
        }
        case actionTypes.MOVE_RIGHT: {
            const result = b2048.right();
            return { ...state, ...result };
        }
        case actionTypes.RESET: {
            const copy = JSON.parse(JSON.stringify(initState));
            b2048 = new Board(copy);
            b2048.birth();
            const result = b2048.birth();
            return { ...copy, ...result };
        }
        default:
            return state;
    }
};
