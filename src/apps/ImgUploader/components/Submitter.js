import React from "react";

export default class Submitter extends React.Component {
    render() {
        return (
            <div>
                <button
                    className="FUploader__btn crumbledPixel"
                    onClick={this.props.uploadAll}
                >
                    upload
                </button>
            </div>
        );
    }
}
