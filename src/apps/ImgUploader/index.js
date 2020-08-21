import { connect } from "react-redux";
import ImgUploader from "./ImgUploader";

import { actionCreator } from "./store/index";

const mapStateToProps = (state) => {
    return {
        files: state.getIn(["ImgUploader", "files"]),
        isPrepared: state.getIn(["ImgUploader", "isPrepared"]),
        isUploading: state.getIn(["ImgUploader", "isUploading"]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAll() {
            dispatch(actionCreator.uploadPrepare());
            dispatch(actionCreator.FinishUpload());
        },
        addImg(file) {
            dispatch(actionCreator.uploadImg(file));
        },
        deleteImg(idx) {
            dispatch(actionCreator.deleteImg(idx));
        },
        cancelUpload(idx) {
            console.log(idx);
            dispatch(actionCreator.uploadCancel(idx));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImgUploader);
