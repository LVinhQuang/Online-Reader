import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [showHistory, setShowHistory] = useState(false)
    const [historyStories, setHistoryStories] = ([])
    const toggleHistory = () => setShowHistory(!showHistory)

    useEffect(() => {
        const fetchedReadingStories = () => {
            const historyLS = localStorage.getItem('history')
            if (historyLS) {
                let stories = []
                for (const key in historyLS) {
                    stories.push({
                        name: key,
                        domain: key.domain,
                        id: key.id
                    })
                }
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
                {/* <nav className="header__nav">
                    <ul className="header__nav-list">
                    </ul>
                </nav> */}
                <div className="header__history">
                    <button className="header__history-button" onClick={toggleHistory}>
                        History
                    </button>
                    {showHistory && (
                        <div className="header__history-popup">
                            {historyStories?.length > 0 ? (
                                <ul className="header__history-list">
                                    {historyStories.map((story, index) => (
                                        <li key={index} className="header__history-item">
                                            <div>
                                                <p>nameUrl: {story.name}</p>
                                                <p>chapter: {story.id}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            ) : (
                                <p>No story</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Header;
