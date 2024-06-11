import classNames from "classnames/bind";
import { useState, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

function Dropdown({ listElements, currentElement, position, name }) {
  const navigate = useNavigate();
  const [context, setContext] = useState(currentElement);
  const [displayNode, setDisplayNode] = useState(true);
  function HandlerDisplayDropdown() {
    setDisplayNode((prev) => !prev);
  }
  function HandlerSetContext(id) {
    HandlerDisplayDropdown();
    navigate(`/read/${name}/${id}`);
  }
  useEffect(() => {
    setContext(currentElement);
  }, [currentElement]);
  return (
    <div className={cx("dropdown")}>
      <div
        className={cx("dropdown__context")}
        onClick={() => HandlerDisplayDropdown()}
      >
        <span>{context}</span>
      </div>
      <div
        className={cx("dropdown__listcontext", {
          "display--none": displayNode,
          top: position,
          bottom: !position,
        })}
      >
        {listElements &&
          listElements.map((element, index) => {
            return (
              <div
                key={index}
                className={cx("dropdown__listcontext-element")}
                onClick={() => HandlerSetContext(index)}
              >
                <div
                  className={cx("dropdown__listcontext-element-context", {
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
