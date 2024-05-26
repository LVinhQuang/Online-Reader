import classNames from "classnames/bind";

import styles from "./Read.module.scss";

const cx = classNames.bind(styles);

function Read() {
    return (<div className={cx('readpage')}>Read page</div>  );
}

export default Read;