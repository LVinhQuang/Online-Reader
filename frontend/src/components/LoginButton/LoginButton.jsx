import React from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default (props) => {
  const navigate = useNavigate();
  const handleLogin = ({email, password}) => {
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code)
      })
  }

  return (
    <button className={props.className} style={props.style} onClick={() => handleLogin(props.loginData)}>Login</button>
  )
}
