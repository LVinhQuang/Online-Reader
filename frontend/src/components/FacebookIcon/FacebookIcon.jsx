import FacebookIcon from '@mui/icons-material/Facebook';
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import React from 'react'

export default () => {
    const navigate = useNavigate();

    const handleFacebookLogin = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                
                navigate('/');
            })
    }

    return (
        <FacebookIcon fontSize='large' color='primary' onClick={handleFacebookLogin} sx={{cursor: "pointer"}}/>
    )
}
