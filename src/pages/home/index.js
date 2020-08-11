import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { actionCreator } from "./store";

import "../../assets/css/home/index.scss";

import Game from "./components/Game";

class Home extends React.Component {
    render() {
        const { games } = this.props;
        return (
            <div className="g-home__container">
                {games.map((item, index) => {
                    return (
                        <Link key={index} to={item.url}>
                            <Game
                                title={item.title}
                                completed={item.completed}
                                img={item.img}
                            ></Game>
                        </Link>
                    );
                })}
            </div>
        );
    }
    componentDidMount() {
        this.props.changeHomeData();
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.getIn(["home", "games"]),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeHomeData() {
            dispatch(actionCreator.getGames());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
