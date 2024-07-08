import React from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom'


export default (props) => {
  const navigate = useNavigate();

  const handleSignUp = ({ displayName, email, password }, setErrorMess) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: displayName })
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            setErrorMess('The email address is already in use. Please use a different email.');
            break;
          case 'auth/invalid-email':
            setErrorMess('The email address is invalid. Please check the email format.');
            break;
          case 'auth/weak-password':
            setErrorMess('The password is too weak. Please choose a stronger password.');
            break;
          default:
            setErrorMess(errorMessage);
            break;
        }
      })
  }

  return (
    <button className={props.className} style={props.style} onClick={() => handleSignUp(props.signupData, props.setErrorMess)}>Sign Up</button>
  )
}
