import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import { getStoryByName } from '../../../../utils/apiFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [showHistory, setShowHistory] = useState(false)
    const [historyStories, setHistoryStories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const toggleHistory = () => setShowHistory(!showHistory)

    const handleDelete = (e, name) => {
        e.preventDefault()
        const historyLS = JSON.parse(localStorage.getItem('history'))
        if (historyLS && historyLS[name]) {
            // remove from local storage
            delete historyLS[name]
            localStorage.setItem('history', JSON.stringify(historyLS))
            console.log("update local storage with key 'history'")

            // remove from current state
            setHistoryStories(prev => prev.filter(story => story.name != name))
        }
    }

    useEffect(() => {
        const fetchedReadingStories = async () => {
            const historyLS = JSON.parse(localStorage.getItem('history'))
            if (historyLS) {
                setIsLoading(true)
                let stories = []
                for (const key in historyLS) {
                    const domain = historyLS[key].domain
                    const fetchedStory = await getStoryByName(domain, key)
                    const data = fetchedStory?.data
                    if (data) {
                        stories.push({
                            name: key,
                            image: data.image,
                            title: data.title,
                            author: data.author,
                            id: historyLS[key].id
                        })
                    }
                }
                // console.log("stories history", stories)
                setIsLoading(false)
                setHistoryStories(stories)
            }
        }
        fetchedReadingStories()
    }, [])

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to={"/"} className="header__logo-link">
                        <span className="header__logo-first-letter">O</span>
                        <span className="header__logo-rest">nline story reader</span>
                    </Link>
                </div>
                <div className="header__history">
                    <button className="header__history-button" onClick={toggleHistory}>
                        History
                    </button>
                    {showHistory && (
                        <div className="header__history-popup">
                            {historyStories?.length > 0 ? (
                                <ul className="header__history-list">
                                    {historyStories.map((story, index) => (
                                        <li key={index} className="header__history-item container">
                                            <div className="history-item__card d-flex align-items-center">
                                                <div id="history-item-card-image col-4 ">
                                                    <img
                                                        src={story.image}
                                                        alt="Story's photo"
                                                        style={{ width: "100%", maxWidth: "100px", height: "auto" }}
                                                    />
                                                </div>
                                                <div className="history-item__card-info col-8">
                                                    <p className="py-0 my-1"><b>{story.title}</b></p>
                                                    <p className="py-0 my-1">{story.author}</p>
                                                    <Link
                                                        className="py-0 my-1 text-success header__logo-link"
                                                        to={`/read/${story.name}/${story.id}`}
                                                        style={{ "display": "block" }}
                                                    >
                                                        <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: "6px" }} />
                                                        Continue chapter {story.id}
                                                    </Link>
                                                    <button
                                                        className="text-danger header__delete-button"
                                                        onClick={(e) => handleDelete(e, story.name)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            ) : (
                                <p className="p-2 m-3">No story</p>
                            )}
                            {isLoading && (
                                <div className="p-2 m-3">
                                    <div className="component__spinner"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Header;
