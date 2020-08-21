import React from "react";

import gif from "./asset/gif.svg";
import png from "./asset/png.svg";
import jpg from "./asset/jpg.svg";
import jpeg from "./asset/jpeg.svg";
import svg from "./asset/svg.svg";
import bmp from "./asset/bmp.svg";
import tiff from "./asset/tiff.svg";

import unknown from "./asset/unknown.svg";

import "../../assets/css/public/fileIcon.scss";

export default class FileIcon extends React.Component {
    render() {
        let { type } = this.props;
        let subType = this.formatImgType(type);
        let imgIcon;
        switch (subType) {
            case "gif":
                imgIcon = <img src={gif} className="" alt={subType} />;
                break;
            case "png":
                imgIcon = <img src={png} className="" alt={subType} />;
                break;
            case "jpeg":
                imgIcon = <img src={jpeg} className="" alt={subType} />;
                break;
            case "jpg":
                imgIcon = <img src={jpg} className="" alt={subType} />;
                break;
            case "svg":
                imgIcon = <img src={svg} className="" alt={subType} />;
                break;
            case "bmp":
                imgIcon = <img src={bmp} className="" alt={subType} />;
                break;
            case "tiff":
                imgIcon = <img src={tiff} className="" alt={subType} />;
                break;
            default:
                imgIcon = <img src={unknown} className="" alt={subType} />;
        }

        return <div className="file-icon">{imgIcon}</div>;
    }
    formatImgType(type) {
        let multiType = type.split("/");
        let subType = multiType.length > 1 ? multiType[1] : "unknown";
        return subType;
    }
}
