import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

// import {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,  
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
  id
}) {
  const navigate = useNavigate();    
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
    const storageDataJson = localStorage.getItem(`history`);
        if (storageDataJson) {
          let dataJson = JSON.parse(storageDataJson);
          let dataStory = dataJson[name];
          if(dataStory)
            {
              const currentDomain= dataStory.domain;
              navigate(`/stories/${currentDomain}/${name}`);
              const storageDataJsonStory = localStorage.getItem(`${name}`);
              if(storageDataJsonStory)
                {
                  let jsonStory= JSON.parse(storageDataJsonStory)
                  jsonStory={
                    ...jsonStory,
                    domain:currentDomain
                  }
                  localStorage.setItem(`${name}`,JSON.stringify(jsonStory))
                }

            }else
            {
              navigate(`/stories/${domain}/${name}`);
            }
        }
        else
        {
          navigate(`/stories/${domain}/${name}`);
        }

  }
  return (
    <div className={cx("nav")}>
      <div className={cx("nav__domains")}>
        {position &&
          listDomain &&
          listDomain.map((element, index) => {
            return (
              <div
                key={index}
                className={cx("nav__domains-domain", { active: element === domain })}
                onClick={() => setDomain(element)}
              >
                {" "}
                <span>{element}</span>
              </div>
            );
          })}
      </div>
      <div className={cx("nav__action")}>
        {isPrevious && (
          <ButtonReadPage >
            <FontAwesomeIcon icon={faAnglesLeft} onClick={() => HandlerActionPrevious()}></FontAwesomeIcon>
            <span style={{ marginLeft: "5px" }} onClick={() => HandlerActionPrevious()}>Chương trước</span>
          </ButtonReadPage>
        )}
        
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
