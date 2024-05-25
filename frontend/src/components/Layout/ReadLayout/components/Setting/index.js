import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import styles from "./Setting.module.scss";
import DomainSetting from "../DomainSetting";

const cx = classNames.bind(styles);

function Setting() {
  const [isSetting, setIsSetting] = useState(false);
  function ShowDomainSetting() {
    setIsSetting((preState) => !preState);
  }
  return (

    <div className={cx("setting")}>
        <div className={cx('icon_setting')}>
            <FontAwesomeIcon icon={faGear}  onClick={ShowDomainSetting}/>
        </div>
      {
        isSetting && <DomainSetting/>
      }
    </div>
  );
}

export default Setting;
