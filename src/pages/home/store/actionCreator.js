import axios from "axios";

import * as actionTypes from "./contants";

export const getGames = () => {
    return (dispatch) => {
        axios
            .get("/api/gameList.json")
            .then((res) => {
                const body = res.data;
                console.log(body.data);
                dispatch(updateGames(body.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const updateGames = (data) => {
    return {
        type: actionTypes.UPDATE_GAMES,
        data,
    };
};
