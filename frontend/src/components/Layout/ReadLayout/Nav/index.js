import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

// import {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faArrowDown,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

import { memo, useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import styles from "./Nav.module.scss";
import ButtonReadPage from "../components/ButtonReadPage";
const cx = classNames.bind(styles);
function Nav({
  currentElement,
  position,
  listDomain,
  domain,
  setDomain,
  listElements,
  name,
  id,
  context
}) {
  const navigate = useNavigate();

  // console.log("domain recieve", domain);
  const [indexCurrentChapter, setIndexCurrentChapter] = useState(
    listElements.indexOf(currentElement)
  );
  // console.log("index ",indexCurrentElement );
  const [isNext, setIsNext] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);

  useEffect(() => {
    setIndexCurrentChapter(listElements.indexOf(currentElement));
  }, [listElements, currentElement]);
  useEffect(() => {
    setIsNext(indexCurrentChapter !== listElements.length - 1);
    setIsPrevious(indexCurrentChapter !== 0);
  }, [indexCurrentChapter, listElements]);

  function HandlerActionNext() {
    navigate(`/read/${name}/${parseInt(id) + 1}`);
  }
  function HandlerActionPrevious() {

    navigate(`/read/${name}/${ parseInt(id) - 1}`);
  }
  function HandlerActionHome()
  {
    navigate(`/stories/${name}`);

  }
  return (
    <div className={cx("nav")}>
      <div className={cx("nav-domains")}>
        {position &&
          listDomain &&
          listDomain.map((element, index) => {
            return (
              <div
                key={index}
                className={cx("domain", { active: element === domain })}
                onClick={() => setDomain(element)}
              >
                {" "}
                <span>{element}</span>
              </div>
            );
          })}
      </div>
      <div className={cx("nav-action")}>
        {isPrevious && (
          <ButtonReadPage >
            <FontAwesomeIcon icon={faAnglesLeft} onClick={() => HandlerActionPrevious()}></FontAwesomeIcon>
            <span style={{ marginLeft: "5px" }} onClick={() => HandlerActionPrevious()}>Chương trước</span>
          </ButtonReadPage>
        )}
        {/* TODO button download */}
        <ButtonReadPage>
          <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
        </ButtonReadPage>

        <Dropdown
          listElements={listElements}
          currentElement={currentElement}
          position={position}
          name={name}
        />

        <ButtonReadPage>
          <FontAwesomeIcon icon={faHouse} onClick={()=>HandlerActionHome()}></FontAwesomeIcon>
        </ButtonReadPage>
        {isNext && (
          <ButtonReadPage >
            <span style={{ marginRight: "5px" }} onClick={() => HandlerActionNext()}>Chương sau</span>
            <FontAwesomeIcon icon={faAnglesRight} onClick={() => HandlerActionNext()}></FontAwesomeIcon>
          </ButtonReadPage>
        )}
      </div>
    </div>
  );
}

export default memo(Nav);
