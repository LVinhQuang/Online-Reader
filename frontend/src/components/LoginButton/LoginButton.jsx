import React from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default (props) => {
  const navigate = useNavigate();
  const handleLogin = ({ email, password }, setErrorMess) => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-credential':
            setErrorMess('Invalid email or password.');
            break;
          case 'auth/user-disabled':
            setErrorMess('Your account has been disabled.');
            break;
          case 'auth/user-not-found':
            setErrorMess('User not found with this email address.');
            break;
          default:
            setErrorMess(errorMessage);
            break;
        }
      })
  }

  return (
    <button className={props.className} style={props.style} onClick={() => handleLogin(props.loginData, props.setErrorMess)}>Login</button>
  )
}
