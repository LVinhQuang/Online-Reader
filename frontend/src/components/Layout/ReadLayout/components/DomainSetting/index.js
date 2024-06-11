import classNames from "classnames/bind";
import { useEffect, useState, memo } from "react";
import styles from "./DomainSetting.module.scss";

const cx = classNames.bind(styles);

function DomainSetting({ listDomain }) {
  const [active, setActive] = useState("");
  // Lấy dữ liệu từ Local Storage khi component được render
  useEffect(() => {
    const storedData = localStorage.getItem("domain");
    if (storedData) {
      setActive(storedData);
    } else {
      setActive(listDomain[0]);
    }
  }, [listDomain]);

  // Lấy danh sách domain từ backend
  useEffect(() => {}, []);

  // Lưu giá trị mới vào Local Storage khi data thay đổi
  useEffect(() => {
    localStorage.setItem("domain", active.toString());
  }, [active]);

  function saveActivate(index) {
    setActive(index);
    // onUpdateSeting()
  }
  return (
    <div className={cx("setting")}>
      <div className={cx("setting__title")}>
        <div className={cx("setting__title-format")}>Source</div>
      </div>
      <div className={cx("setting__domains")}>
        <div className={cx("setting__domains-list")}>
          {listDomain &&
            listDomain.map((domain, index) => {
              return (
                <div
                  className={cx("setting__domains-domain-name", {
                    active: listDomain[index] === active,
                  })}
                  key={index}
                  onClick={() => saveActivate(domain)}
                >
                  <div>{domain}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default memo(DomainSetting);
