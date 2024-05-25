import classNames from "classnames/bind" 


import styles from "./ReadLayout.module.scss"
import Header from "./Header";


const cx= classNames.bind(styles)

function ReadLayout({children}) {
    return <div className={cx("readlayout")}>
        <Header/>
        <div className="container">
            <div className="content">{children}</div>
        </div>
    </div>;
}

export default ReadLayout;