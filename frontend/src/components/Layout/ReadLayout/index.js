import classNames from "classnames/bind";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./ReadLayout.module.scss";
import Header from "./Header";
import Nav from "./Nav";
import Content from "./Content";


const cx = classNames.bind(styles);
const backendURL="http://localhost:3000";


function ReadLayout({ children }) {
  const [listDomain, setListDomain] = useState([]);
  const [context, setContext] = useState("");
  const [chapters, setChapters] = useState([]);
  const [domain, setDomain] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const { name, id } = useParams();
  const [nameStory, setNameStory]=useState('')
  // reset when set chapterconfig is not json
  // const storedDataJson = localStorage.setItem(`${name}-${id}`,"");

  // get domain
  useLayoutEffect(() => {
    const url = `${backendURL}/getdomains`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // console.log(jsonData);
        // Lưu dữ liệu vào state
        setListDomain(jsonData.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);


  //Get chapters
  useLayoutEffect(() => {
    if(!name ||!domain)
      {
        return;
      }
    const url = `${backendURL}/${name}?domain=${domain}`;
    

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Lưu dữ liệu vào state
        if(jsonData && jsonData.data && jsonData.data.title)
          {
            setNameStory(jsonData.data.title)
          }
          if(jsonData && jsonData.data && jsonData.data.chapters)
            {
                const dataChapter= jsonData.data.chapters;
                if(dataChapter[parseInt(id)]&& dataChapter[parseInt(id)].title)
                  {
                    setCurrentElement(dataChapter[parseInt(id)].title);
                  } 
                  const titles = dataChapter.map(chapter => chapter.title);
                  setChapters(titles);
            }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name,domain,id]);

  //Get context
  useEffect(() => {
    if(!name || !currentElement ||!domain)
      {
        setContext('No data');
        return;
      }

    const currentChapter= currentElement.split(' ');
    if(!currentChapter[1])
      {
        return;
      }
    let chapter= 'chuong-'+currentChapter[1].split(':')[0];
    chapter=chapter.trim();
    const url = `${backendURL}/${name}/${chapter}?domain=${domain}`;
    console.log(url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        if(!jsonData)
          {
            setContext('No data');
            return;
          }
        // Lưu dữ liệu vào state
        setContext(jsonData.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name,domain,currentElement]);



  useEffect(() => {
    let dataConfig = localStorage.getItem(`${name}-${id}`);
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
      localStorage.setItem(`${name}-${id}`, JSON.stringify(data));
    }
  }, [listDomain,name,id]);

  // insert data into local storage when domain changed
  useEffect(() => {
    const storageDataJson = localStorage.getItem(`${name}-${id}`);
    if (storageDataJson) {
      const storageData = JSON.parse(storageDataJson);
      const data = {
        ...storageData,
        domain,
      };
      localStorage.setItem(`${name}-${id}`, JSON.stringify(data));
    }
  }, [domain,name,id]);
  return (
    <div className={cx("readlayout")}>
      <Header listDomain={listDomain} nameStory={nameStory} chapter={currentElement}/>
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
    </div>
  );
}

export default ReadLayout;
