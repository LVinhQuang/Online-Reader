import classNames from "classnames/bind";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./ReadLayout.module.scss";
import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
const cx = classNames.bind(styles);

function ReadLayout({ children }) {
  const [listDomain, setListDomain] = useState([]);
  const [context, setContext] = useState("");
  const [chapters, setChapters] = useState([]);
  const [domain, setDomain] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const { name, id } = useParams();
  // reset when set chapterconfig is not json
  // const storedDataJson = localStorage.setItem("chapterconfig","");

  // get domain
  useLayoutEffect(() => {
    const url =
      "https://0276e346-049a-4de3-8728-dd1f43fd215b.mock.pstmn.io/domains";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Lưu dữ liệu vào state
        setListDomain(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Get context
  useEffect(() => {
    const url =
      "https://0276e346-049a-4de3-8728-dd1f43fd215b.mock.pstmn.io/context";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Lưu dữ liệu vào state
        setContext(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Get chapters
  useLayoutEffect(() => {
    const url =
      "https://0276e346-049a-4de3-8728-dd1f43fd215b.mock.pstmn.io/chapters";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Lưu dữ liệu vào state
        setChapters(jsonData);
        console.log(jsonData[parseInt(id)]);
        setCurrentElement(jsonData[parseInt(id)]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  //
  useEffect(() => {
    let dataConfig = localStorage.getItem("chapterconfig");
    if (dataConfig) {
      dataConfig = JSON.parse(dataConfig);
      if (dataConfig.domain) {
        setDomain(dataConfig.domain);
      } else {
        setDomain(listDomain[0]);
      }
    } else {
      let storedData = localStorage.getItem("domain");
      if (storedData) {
        setDomain(storedData);
      } else {
        storedData = listDomain[0];
        setDomain(listDomain[0]);
      }
      const data = {
        domain: storedData,
        size: "20",
        font: "Arial",
        color: "black",
        line: 1.5,
        background: "white",
        scroll: 0,
      };
      localStorage.setItem("chapterconfig", JSON.stringify(data));
    }
  }, [listDomain]);

  // insert data into local storage when domain changed
  useEffect(() => {
    const storageDataJson = localStorage.getItem("chapterconfig");
    if (storageDataJson) {
      const storageData = JSON.parse(storageDataJson);
      const data = {
        ...storageData,
        domain,
      };
      localStorage.setItem("chapterconfig", JSON.stringify(data));
    }
  }, [domain]);

  return (
    <div className={cx("readlayout")}>
      <Header listDomain={listDomain} />
      <Nav
        currentElement={currentElement}
        position={true}
        listDomain={listDomain}
        domain={domain}
        setDomain={setDomain}
        listElements={chapters}
        name={name}
        id={id}
      />
      <div className={cx("container")}>
        <Content context={context} />
      </div>
      <Nav
        currentElement={currentElement}
        position={false}
        listElements={chapters}
        name={name}
        id={id}
      />
    </div>
  );
}

export default ReadLayout;
