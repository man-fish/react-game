import * as actionTypes from "./constants";
import { loader } from "./imgUpLoader";

export const uploadImg = (file) => {
    return (dispatch) => {
        loader
            .append(file)
            .then((res) => {
                dispatch(addImg(res));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const addImg = (res) => {
    return {
        res,
        type: actionTypes.ADD_IMG,
    };
};

export const deleteImg = (idx) => {
    return {
        idx,
        type: actionTypes.DELETE_IMG,
    };
};

export const uploadPrepare = () => {
    return {
        type: actionTypes.UPLOAD_PREPARE,
    };
};

export const uploadAll = (res) => {
    return {
        type: actionTypes.UPLOAD_ALL,
        res,
    };
};

export const FinishUpload = () => {
    return (dispatch) => {
        loader
            .uploadAll()
            .then((res) => {
                dispatch(uploadAll(res));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const uploadCancel = (idx) => {
    return {
        type: actionTypes.UPLOAD_CANCEL,
        idx,
    };
};
