import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import personIcon from '../../assets/person.png';
import LoginButton from '../../components/LoginButton/LoginButton'
import './login.css';
import '../../components/FacebookIcon/FacebookIcon'

import React from 'react'
import { useState } from 'react'; 
import MyFacebookIcon from '../../components/FacebookIcon/FacebookIcon';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('');

    return (
        <div className="big-container">
            <div className="form-box">
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

                <div className="error-message">{errorMess}</div>

                <div className="forgot-password" style={{margin: "40px 0 0 0"}}>Forgot your password? <a href="/forgot-password">Click here</a></div>
                
                <div className="submit-container">
                    <LoginButton className="login-button" loginData={{email,password}} setErrorMess={setErrorMess}/>
                    <a href='/signup' className="signup-button">Sign up</a>
                </div>
                <div className="login-with">
                    <p>Or continue with</p>
                    <MyFacebookIcon />
                </div>
            </div>

        </div>
    );
}

export default Login;