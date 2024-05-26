import classNames from "classnames/bind";
// import {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faArrowDown,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";


import { memo } from "react";
import Dropdown from "../components/Dropdown";
import styles from "./Nav.module.scss";
import ButtonReadPage from "../components/ButtonReadPage";
const cx = classNames.bind(styles);
const listElements = ["Chuong 1", "Chuong 2", "Chuong 3", "Chuong 4"];
function Nav({ currentElement, position, listDomain, domain, setDomain }) {

  console.log("domain recieve", domain);

  return (
    <div className={cx("nav")}>
        <div className={cx('nav-domains')}>
            {position && listDomain && listDomain.map((element,index)=>{
                return <div key={index} className={cx('domain',{active: element===domain})} onClick={()=>setDomain(element)}> <span>{element}</span></div>
            })}
        </div>
      <div className={cx("nav-action")}>
        <ButtonReadPage>
          <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          <span style={{ marginLeft: "5px" }}>Chương trước</span>
        </ButtonReadPage>
        <ButtonReadPage>
          <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
        </ButtonReadPage>

        <Dropdown
          listElements={listElements}
          currentElement={currentElement}
          position={position}
        />

        <ButtonReadPage>
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        </ButtonReadPage>
        <ButtonReadPage>
          <span style={{ marginRight: "5px" }}>Chương sau</span>
          <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
        </ButtonReadPage>
      </div>
    </div>
  );
}

export default memo(Nav);
