import React from "react";

import Progress from "../../../common/progress";

export default class Game extends React.Component {
    render() {
        let { title, completed, img } = this.props;
        if (!img) {
            img = "https://www.monterail.com/hubfs/vuevsreact.jpg";
        }
        let imgUrl = `url("${img}")`;
        return (
            <div className="g-home__box" style={{ "background-image": imgUrl }}>
                <div>
                    <h1 className="crumbledPixel">{title}</h1>
                    <Progress completed={completed}></Progress>
                </div>
            </div>
        );
    }
}
