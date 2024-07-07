import './Header.css';

import { useState, useEffect } from 'react'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { getStoryByName } from '../../../../utils/apiFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

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

    // User menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    const id = parseInt(historyLS[key].id)
                    if (data) {
                        stories.push({
                            name: key,
                            image: data.image,
                            title: data.title,
                            author: data.author,
                            chapter: data.chapters[id]?.title,
                            id: id
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
                                                        Continue {story.chapter}
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

                {/* User menu */}
                {

                }
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </header >
    );
};

export default Header;
