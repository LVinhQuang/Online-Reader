import classNames from "classnames/bind" 
import { memo } from "react";
import styles from "./ButtonReadPage.module.scss"

const cx= classNames.bind(styles)

function ButtonReadPage({children}) {
    return ( <div className={cx('button')}>{children}</div> );
}
export default memo(ButtonReadPage);