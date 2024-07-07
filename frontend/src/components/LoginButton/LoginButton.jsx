import React from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export default (props) => {
  const handleLogin = ({email, password}) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,password)
      .then((userCredetial) => {
        const user = userCredetial.user;
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <button className={props.className} style={props.style} onClick={() => handleLogin(props.loginData)}>Login</button>
  )
}
