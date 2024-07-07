import React from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"


export default (props) => {
  const handleSignUp = ({displayName, email, password}) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {displayName: displayName})
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  return (
    <button className={props.className} style={props.style} onClick={()=>handleSignUp(props.signupData)}>Sign Up</button>
  )
}
