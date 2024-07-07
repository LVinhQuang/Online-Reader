import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import personIcon from '../../assets/person.png';
import './login.css';
import LoginButton from '../../components/LoginButton/LoginButton'

import React from 'react'
import { useState } from 'react'; 

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    return (
        <div className="big-container">
            <div className="signup-box">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                
                <div className="inputs">
                    <div className="input">
                        <img src={emailIcon} alt="email icon" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src={passwordIcon} alt="password icon" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="have-account" style={{margin: "50px 0 0 0"}}>Forgot your password? <a href="/">Click here</a></div>
                
                <div className="submit-container">
                    <LoginButton className="login-button" loginData={{email,password}}/>
                    <a href='/signup' className="signup-button">Sign up</a>
                </div>
            </div>

        </div>
    );
}

export default Signup;