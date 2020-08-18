import { connect } from "react-redux";

import AudioPlayer from "./AudioPlayer";

let mapStateToProps = (state) => {
    return {
        hasMusic: state.getIn(["APlayer", "hasMusic"]),
        isPlaying: state.getIn(["APlayer", "isPlaying"]),
        player: state.getIn(["APlayer", "player"]),
    };
};

export default connect(mapStateToProps, null)(AudioPlayer);
