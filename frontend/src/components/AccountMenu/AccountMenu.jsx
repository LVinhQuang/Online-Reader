import React, { useEffect } from 'react'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export const AccountMenu = (props) => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    // User menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                console.log("LOGOUT")
                navigate('/');
            })
    }

    //check logged in
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("LOGGED IN")
                setIsLoggedIn(true);
                setPhotoURL(user.photoURL);
                setDisplayName(user.displayName);
            }
            else {
                console.log("LOGGED OUT")
                setIsLoggedIn(false);
                setPhotoURL('');
                setDisplayName('');
            }
        })
    }, [])

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {isLoggedIn ? (<Avatar src={photoURL}>{photoURL ? '' : displayName && displayName[0]} </Avatar>) : <Avatar />}
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
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar style={{ width: "50px", height: "50px", margin: "0", padding: "0" }}>{photoURL ? '' : displayName && displayName[0]} </Avatar>
                        <span style={{ marginTop: "8px", fontSize: "large", fontWeight: "500", color: "deeppink" }}>{displayName ? displayName : "Guest"}</span>
                    </div>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                {isLoggedIn ?
                    <>
                        <MenuItem onClick={() => navigate('/history')}>
                            <ListItemIcon>
                                <HistoryIcon fontSize="small" />
                            </ListItemIcon>
                            Reading History
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </>
                        </MenuItem>
                    </>
                    :
                    <>
                        <MenuItem onClick={() => { navigate('/login') }}>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                    </>
                }
            </Menu>
        </>
    )
}
