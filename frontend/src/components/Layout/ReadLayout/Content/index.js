import classNames from "classnames/bind";
import { useState,useEffect,memo} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTextWidth,
  faFont,
  faHighlighter,
  faPalette,
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser';
import DownloadGroup from "../components/DownloadGroup";

import styles from "./Content.module.scss";

const cx = classNames.bind(styles);
const sizeText = ["12", "14", "16", "18", "20", "22", "24", "26"];
const fontText = ["Arial", "Times New Roman", "Courier New", "Verdana"];
const colorText = ["red", "blue", "green", "aqua", "white", "black", "yellow"];
const lineHeight = [1, 1.2, 1.5, 1.7, 1.9, 2.0, 2.2];
const backgroundColor = [
  "red",
  "blue",
  "green",
  "aqua",
  "white",
  "black",
  "yellow",
];
function Content({ context, name, id, downloadTypeList, downloadUrl }) {
  const [size, setSize] = useState(sizeText[4]);
  const [font, setFont] = useState(fontText[0]);
  const [color, setColor] = useState(colorText[5]);
  const [line, setLine] = useState(lineHeight[2]);
  const [background, setBackground] = useState(backgroundColor[4]);

  const [showSize, setShowSize] = useState(false);
  const [showFont, setShowFont] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  let content=''
  if(context)
  { 
    content= context.replace(/\n/g, '<br/>')
                    .replace(/\t/g, '    ');  }
  useEffect(() => {
    const storedDataJson = localStorage.getItem(`${name}`);
    if(storedDataJson)
      {
        // console.log(storedDataJson);
        const storedDate= JSON.parse(storedDataJson)
        setSize(storedDate.size);
        setFont(storedDate.font);
        setColor(storedDate.color);
        setLine(storedDate.line);
        setBackground(storedDate.background);
      }
  }, [name,id]);


  useEffect(()=>{
    const storedDataJson = localStorage.getItem(`${name}`);
    if(storedDataJson)
      {
        const storedData= JSON.parse(storedDataJson)
        const storageData= {...storedData,size,font,color,line,background};
        
        const storageDataJson= JSON.stringify(storageData);
        localStorage.setItem(`${name}`,storageDataJson)
    }
  },[size,font,color,line,background,name])

  return (
    <div className={cx("content")}>
      {/* TODO button download */}
      <DownloadGroup downloadTypeList={downloadTypeList} downloadUrl={downloadUrl}></DownloadGroup>
      <span
        style={{
          fontSize: size + "px",
          fontFamily: font,
          color: color,
          lineHeight: line,
          backgroundColor: background,
        }}
      >


        
        {parse(content)}




      </span>
      <div className={cx("action")}>
        <div className={cx("icon")}>
          <FontAwesomeIcon
            icon={faTextWidth}
            onClick={() => setShowSize((prev) => !prev)}
          />
          <div className={cx("icon-elements")}>
            {showSize &&
              sizeText.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={cx("icon-element-context", {
                      active: sizeText[index] === size,
                    })}
                    onClick={() => setSize(sizeText[index])}
                  >
                    <span>{element}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={cx("icon")}>
          <FontAwesomeIcon
            icon={faFont}
            onClick={() => setShowFont((prev) => !prev)}
          />
          <div className={cx("icon-elements")}>
            {showFont &&
              fontText.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={cx("icon-element-context", {
                      active: fontText[index] === font,
                    })}
                    onClick={() => setFont(fontText[index])}
                  >
                    <span>{element}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={cx("icon")}>
          <FontAwesomeIcon
            icon={faHighlighter}
            onClick={() => setShowColor((prev) => !prev)}
          />
          <div className={cx("icon-elements")}>
            {showColor &&
              colorText.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={cx("icon-element-context", {
                      active: colorText[index] === color,
                    })}
                    onClick={() => setColor(colorText[index])}
                  >
                    <span>{element}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={cx("icon")}>
          <FontAwesomeIcon
            icon={faTextHeight}
            onClick={() => setShowLine((prev) => !prev)}
          />
          <div className={cx("icon-elements")}>
            {showLine &&
              lineHeight.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={cx("icon-element-context", {
                      active: lineHeight[index] === line,
                    })}
                    onClick={() => setLine(lineHeight[index])}
                  >
                    <span>{element}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={cx("icon")}>
          <FontAwesomeIcon
            icon={faPalette}
            onClick={() => setShowBackground((prev) => !prev)}
          />
          <div className={cx("icon-elements")}>
            {showBackground &&
              backgroundColor.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={cx("icon-element-context", {
                      active: backgroundColor[index] === background,
                    })}
                    onClick={() => setBackground(backgroundColor[index])}
                  >
                    <span>{element}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Content);
