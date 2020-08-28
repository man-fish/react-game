import React from "react";
import { Link } from "react-router-dom";
import handler from "./../../assets/icon/header/handler.svg";

import "../../assets/css/public/header/index.scss";

export default class Header extends React.Component {
    render() {
        return (
            <div className="g-header">
                <div className="g-header__title">
                    <img src={handler} className="" alt="handler" />
                    <span className="origami">
                        <Link to={"/"}>React Game</Link>
                    </span>
                </div>
                <div className="g-header__title "></div>
            </div>
        );
    }
}
