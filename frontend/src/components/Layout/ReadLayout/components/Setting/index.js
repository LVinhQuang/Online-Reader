import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState,memo } from "react";

import styles from "./Setting.module.scss";
import DomainSetting from "../DomainSetting";

const cx = classNames.bind(styles);

function Setting({listDomain}) {
  const [isSetting, setIsSetting] = useState(false);
  function ShowDomainSetting() {
    setIsSetting((preState) => !preState);
  }
  // function HandlerShowSetting()
  // {
  //   setIsSetting(false)
  // }
  return (

    <div className={cx("setting")}>
        <div className={cx('setting__icon')}>
            <FontAwesomeIcon icon={faGear}  onClick={ShowDomainSetting}/>
        </div>
      {
        isSetting && <DomainSetting listDomain={listDomain} />
      }
    </div>
  );
}

export default memo(Setting);
