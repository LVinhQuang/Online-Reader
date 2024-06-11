import classNames from "classnames/bind";

import styles from "./Title.module.scss";

const cx = classNames.bind(styles);

function Title({name, chapter}) {
  return (
    <div className={cx("title")}>
      <div className ={cx('title__name')}>
        <span>{name}</span>
      </div>
      <div>
        <span className ={cx('title__chapter')}>
            {chapter}
        </span>
      </div>
    </div>
  );
}

export default Title;
