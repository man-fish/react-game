import * as actionType from "./constants";

const defaultState = {
    winner: "",
    isNextX: true,
    board: new Array(9).fill("O"),
};

export default (state = defaultState, action) => {
    let board, isNextX, winner;
    switch (action.type) {
        case actionType.SET_PIECE:
            board = state.board.slice();
            isNextX = state.isNextX;
            winner = state.winner;
            if (board[action.index]) {
                return state;
            }
            if (!calculateWinner(board)) {
                board[action.index] = isNextX ? "X" : "O";
                isNextX = !isNextX;
                winner = calculateWinner(board);
            }

            return Object.assign({}, state, {
                winner,
                isNextX,
                board,
            });
        case actionType.RESTART_GAME:
            board = new Array(9).fill(null);
            isNextX = true;
            winner = "";
            return {
                winner,
                isNextX,
                board,
            };
        default:
            return state;
    }
};

function calculateWinner(board) {
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        let [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}
