import React from "react";

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: "0%",
            position: 0,
            duration: 0,
            name: "Unkown",
            frameId: "",
        };
    }

    componentDidMount() {
        const draw = () => {
            let frameId = requestAnimationFrame(draw);
            const percent =
                this.props.player.position / this.props.player.duration;
            this.setState({
                progress: `${(percent * 100).toFixed(2)}%`,
                position: this.props.player.position,
                duration: this.props.player.duration,
                name: this.props.player.current.file
                    ? this.props.player.current.file.name
                    : "Unkown",
                frameId,
            });
        };

        draw();
    }
    componentWillUnmount() {
        if (this.state.frameId) {
            cancelAnimationFrame(this.state.frameId);
        }
    }
    formatTime(val) {
        const min = Math.floor(val / 60);
        const sec = Math.floor(val % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
    formatName(val) {
        return val.replace(/\.mp3$/, "");
    }
    render() {
        let { hasMusic, isPlaying } = this.props;
        let { position, duration, progress, name } = this.state;
        return (
            <div
                className={
                    hasMusic && isPlaying
                        ? "APlayer__progress__container APlayer__progress__container--active"
                        : "APlayer__progress__container"
                }
            >
                {" "}
                <h2 className="APlayer__progress__title">
                    {this.formatName(name)}
                </h2>{" "}
                <div className="APlayer__progress__line">
                    <span style={{ width: progress }}></span>
                </div>{" "}
                <span className="APlayer__progress__time">
                    {this.formatTime(position) +
                        "/" +
                        this.formatTime(duration)}
                </span>{" "}
            </div>
        );
    }
}
