import { combineReducers } from "redux-immutable";
import { reducer as homeReducer } from "../pages/home/store";
import { reducer as tttReducer } from "../games/TicTacToe/store";

const reducer = combineReducers({
    home: homeReducer,
    ttt: tttReducer,
});

export default reducer;
