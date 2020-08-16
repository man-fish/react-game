import { connect } from "react-redux";

import { actionCreator } from "./store/index";

import B2048 from "./B2048";

const mapStateToProps = (state) => {
    return {
        size: state.getIn(["2048", "size"]),
        maxLevel: state.getIn(["2048", "maxLevel"]),
        score: state.getIn(["2048", "score"]),
        board: state.getIn(["2048", "board"]),
        gameOver: state.getIn(["2048", "gameOver"]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initGame() {
            dispatch(actionCreator.init());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(B2048);
