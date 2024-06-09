import classNames from "classnames/bind" 


import styles from "./Header.module.scss"
import Setting from "../components/Setting"
import Title from "../components/Title"
import History from "../components/History"
const cx= classNames.bind(styles)

function Header({listDomain,nameStory,chapter}) {
    return <div className={cx('header')}>
        <Title name={nameStory} chapter={chapter}/>
        <div className={cx('history_setting')}>
        <Setting listDomain={listDomain}/>
        <History />
        </div>
         </div>;
}

export default Header;