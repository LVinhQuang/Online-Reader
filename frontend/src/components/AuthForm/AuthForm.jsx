import React from 'react'
import InputWithIcon from '../InputWithIcon/InputWithIcon.jsx'
import '../InputWithIcon/InputWithIcon.css'
import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import personIcon from '../../assets/person.png';

export const AuthForm = () => {
    return (
        <form className="signup-box">
            <div className="header">
                <div className="text">Sign up</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                
                <InputWithIcon icon={personIcon} type={"text"} placeholder={"Username"}/>

                <InputWithIcon icon={passwordIcon} type={"password"} placeholder={"Password"}/>
                
                <InputWithIcon icon={emailIcon} type={"email"} placeholder={"Email"}/>

            </div>

            <div className="submit-container">
                <div className="have-account">Already have an account? <a href="/login">Login</a></div>
                <button className="signup-button">Sign up</button>
            </div>
        </form>
    )
}

