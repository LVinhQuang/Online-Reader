import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.scss"
import Setting from "../components/Setting"
import Title from "../components/Title"
import History from "../components/History"


import { Link } from "react-router-dom"
import { AccountMenu } from "../../../AccountMenu/AccountMenu";
const cx = classNames.bind(styles)

function Header({ listDomain, nameStory, chapter,name }) {
    const navigate = useNavigate();    

    function HandlerActionHome()
    {
      const storageDataJson = localStorage.getItem(`history`);
          if (storageDataJson) {
            let dataJson = JSON.parse(storageDataJson);
            let dataStory = dataJson[name];
            if(dataStory)
              {
                const currentDomain= dataStory.domain;
                navigate(`/`);
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
                navigate(`/`);
              }
          }
          else
          {
            navigate(`/`);
          }

    }
    return <div className={cx('header')}>
        <div className={cx("header__logo-link")} onClick={()=>HandlerActionHome()}>
            <span className="header__logo-first-letter">O</span>
            <span className="header__logo-rest">nline story reader</span>
        </div>
        <Title name={nameStory} chapter={chapter} />
        <div className={cx('header__history-setting')}>
        <Setting listDomain={listDomain}/>
        {/* <History /> */}
        <AccountMenu/>
        </div>
    </div>;
}

export default Header;