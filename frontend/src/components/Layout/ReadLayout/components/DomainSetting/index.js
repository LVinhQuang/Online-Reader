import classNames from "classnames/bind";
import { useEffect, useState,memo} from "react";
import styles from "./DomainSetting.module.scss";

const cx = classNames.bind(styles);

const listDomain = ["domain 1", "domain 2", "domain 3"];

function DomainSetting() {
  const [active, setActive] = useState("");
  // Lấy dữ liệu từ Local Storage khi component được render
  useEffect(() => {
    const storedData = localStorage.getItem("domain");
    if (storedData) {
      setActive(storedData);
    } else {
      setActive(listDomain[0]);
    }
  }, []);

  // Lấy danh sách domain từ backend
  useEffect(()=>{},[])


  // Lưu giá trị mới vào Local Storage khi data thay đổi
  useEffect(() => {
    localStorage.setItem("domain", active.toString());
  }, [active]);


  function saveActivate(index) {
    setActive(index);
    // onUpdateSeting()
  }
  return (
    <div className={cx("setting_domain")}>
      <div className={cx("title_setting")}>
        <div className={cx("title")}>Chọn Domain</div>
      </div>
      <div className={cx("domain_list")}>
        <div className={cx("list")}>
          {listDomain &&
            listDomain.map((domain, index) => {
              return (
                <div
                  className={cx("domain_name", { active: listDomain[index] === active })}
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

export default memo( DomainSetting);
