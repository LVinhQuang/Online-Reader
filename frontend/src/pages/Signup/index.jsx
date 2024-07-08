import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import personIcon from '../../assets/person.png';
import './signup.css';
import SignupButton from '../../components/SignupButton/SignupButton'

import { useState } from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"

function Signup() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('');

    return (
        <div className="big-container">
            <div className="signup-box">
                <div className="header">
                    <div className="text">Sign up</div>
                    <div className="underline"></div>
                </div>
                
                <div className="inputs">
                    <div className="input">
                        <img src={personIcon} alt="user icon" />
                        <input type="text" placeholder="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                    </div>

                    <div className="input">
                        <img src={emailIcon} alt="email icon" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <div className="input">
                        <img src={passwordIcon} alt="password icon" />
                        <input type="password" placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
                    </div>
                </div>

                <div className="error-message">{errorMess}</div>

                <div className="submit-container">
                    <div className="have-account">Already have an account? <a href="/login">Login</a></div>
                    <SignupButton className="signup-button" signupData={{displayName, email, password}} setErrorMess={setErrorMess}/>
                </div>
            </div>

        </div>
    );
}

export default Signup;