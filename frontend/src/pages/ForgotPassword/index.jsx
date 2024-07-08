import { colors } from '@mui/material';
import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { red } from '@mui/material/colors';

export default () => {

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const [errorMess, setErrorMess] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsEmailSent(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setErrorMess(errorMessage);
            })

    }
    return (
        <div className="big-container">
            <div className="form-box">
                {isEmailSent ?
                    <div style={{ padding: "30px" }}>
                        <p >An email were sent to {email} with instructions for reseting your password. This email may take a few minutes to arrive in your inbox. </p>
                        <a href="/login">Back to login</a>
                    </div>
                    :
                    <>
                        <div className="header">
                            <div className="text">Forgot Password</div>
                            <div className="underline"></div>
                        </div>
                        <form className="forgot-password-form" style={{ width: '340px' }} onSubmit={(e) => handleSubmit(e)}>
                            <p style={{ marginTop: "20px" }}>
                                Enter your email
                            </p>
                            <div className="input">
                                <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <p style={{marginTop: "5px", color: 'red'}}>{errorMess}</p>
                            <button type='submit' style={{ margin: "20px 0", backgroundColor: "#4f2eb1", color: 'white', border: "none", borderRadius: "5px", padding: "5px 10px" }}>Submit</button>
                            <p><a href="/login">Back to login</a></p>
                        </form>
                    </>
                }
            </div>
        </div>
    );
}
