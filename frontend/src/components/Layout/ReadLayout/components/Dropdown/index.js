import classNames from "classnames/bind";
import { useState,memo } from "react";
import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

function Dropdown({ listElements, currentElement ,position}) {
  //   console.log(listElements);
  const [context, setContext] = useState(currentElement);
  const [displayNode, setDisplayNode] = useState(true);
  function HandlerDisplayDropdown() {
    setDisplayNode((prev) => !prev);
  }
  function HandlerSetContext(currentContext) {
    // console.log(currentContext);
    setContext(currentContext);
    HandlerDisplayDropdown();
  }
  return (
    <div className={cx("dropdown")}>
      <div
        className={cx("dropdown-context")}
        onClick={() => HandlerDisplayDropdown()}
      >
        <span>{context}</span>
      </div>
      <div
        className={cx("dropdown-listcontext", { "display-none": displayNode,'top':position,'bottom':!position })}
      >
        {listElements &&
          listElements.map((element, index) => {
            return (
              <div
                key={index}
                className={cx("dropdown-listcontext-element")}
                onClick={() => HandlerSetContext(element)}
              >
                <div
                  className={cx("dropdown-listcontext-element-context", {
                    active: element === context,
                  })}
                >
                  {element}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(Dropdown);
