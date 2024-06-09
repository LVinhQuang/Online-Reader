import classNames from "classnames/bind";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./ReadLayout.module.scss";
import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";
import { getStoryByName,getDomains, getDetailChapterNovel } from "../../../utils/apiFunctions";

const cx = classNames.bind(styles);

function ReadLayout({ children }) {
  const [listDomain, setListDomain] = useState([]);
  const [context, setContext] = useState("");
  const [chapters, setChapters] = useState([]);
  const [domain, setDomain] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const { name, id } = useParams();
  const [nameStory, setNameStory] = useState("");
  // reset when set chapterconfig is not json
  // const storedDataJson = localStorage.setItem(`${name}`,"");
  // get domain
  useLayoutEffect(() => {
    getDomains().then((result) => {
      if (result.success) {
        setListDomain(result.data);
      }
    });
    // setListDomain(result.data);
  }, []);

  //Get chapters
  useLayoutEffect(() => {
    if (!name || !domain) {
      return;
    }
    getStoryByName(domain,name)
      .then(result => { 
        // Lưu dữ liệu vào state
        if (result.success) {
          setNameStory(result.data.title);
        }
        if (result.success) {
          const dataChapter = result.data.chapters;
          if (dataChapter[parseInt(id)] && dataChapter[parseInt(id)].title) {
            setCurrentElement(dataChapter[parseInt(id)].title);
          }
          const titles = dataChapter.map((chapter) => chapter.title);
          setChapters(titles);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name, domain, id]);

  //Get context
  useEffect(() => {
    if (!name || !currentElement || !domain) {
      setContext("No data");
      return;
    }

    const currentChapter = currentElement.split(" ");
    if (!currentChapter[1]) {
      return;
    }
    let chapter = "chuong-" + currentChapter[1].split(":")[0];
    chapter = chapter.trim();

    getDetailChapterNovel(domain, name, chapter).then((result) => {
      if (result?.success) {
        // console.log("story fetched", result.data)
        setContext(result?.data);
        const storageDataJson = localStorage.getItem(`history`);
        if (storageDataJson) {
          let dataJson = JSON.parse(storageDataJson);

          let dataStory = dataJson[name];
          if (dataStory) {
            dataStory = {
              ...dataStory,
              domain: domain,
              id: id,
            };
            dataJson[name] = dataStory;

            localStorage.setItem("history", JSON.stringify(dataJson));
          } else {
            dataStory = {
              domain: domain,
              id: id,
            };
            dataJson[name] = dataStory;
            localStorage.setItem("history", JSON.stringify(dataJson));
          }
        } else {
          let dataStory = {
            domain: domain,
            id: id,
          };
          let dataJson = {};
          dataJson[name] = dataStory;

          localStorage.setItem("history", JSON.stringify(dataJson));
        }
      } else {
        setContext("No data");
      }
    });
  }, [name, domain, currentElement, id]);

  useEffect(() => {
    let dataConfig = localStorage.getItem(`${name}`);
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
      };
      localStorage.setItem(`${name}`, JSON.stringify(data));
    }
  }, [listDomain, name, id]);

  // insert data into local storage when domain changed
  useEffect(() => {
    const storageDataJson = localStorage.getItem(`${name}`);
    if (storageDataJson) {
      const storageData = JSON.parse(storageDataJson);
      const data = {
        ...storageData,
        domain,
      };
      localStorage.setItem(`${name}`, JSON.stringify(data));
    }
  }, [domain, name, id]);
  return (
    <div className={cx("readlayout")}>
      <Header
        listDomain={listDomain}
        nameStory={nameStory}
        chapter={currentElement}
      />
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
        <Content context={context} name={name} id={id} />
      </div>
      <Nav
        currentElement={currentElement}
        position={false}
        listElements={chapters}
        name={name}
        id={id}
        context={context}
      />
      <div className={cx('footer')}></div>
    </div>
  );
}

export default ReadLayout;
