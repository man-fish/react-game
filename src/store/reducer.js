import { combineReducers } from "redux-immutable";
import { reducer as homeReducer } from "../pages/home/store";
import { reducer as tttReducer } from "../games/TicTacToe/store";
import { reducer as B2048Reducer } from "../games/2048/store";
import { reducer as APlayerReducer } from "../apps/AudioPlayer/store";
import { reducer as ImgUploaderReducer } from "../apps/ImgUploader/store";
import { reducer as TodoReducer } from "../apps/Todo/store";

const reducer = combineReducers({
    home: homeReducer,
    ttt: tttReducer,
    2048: B2048Reducer,
    APlayer: APlayerReducer,
    ImgUploader: ImgUploaderReducer,
    todo: TodoReducer,
});

export default reducer;
