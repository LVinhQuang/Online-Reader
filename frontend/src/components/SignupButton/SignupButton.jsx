import React from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from 'react-router-dom'


export default (props) => {
  const navigate = useNavigate();

  const handleSignUp = ({displayName, email, password}) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {displayName: displayName})
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <button className={props.className} style={props.style} onClick={()=>handleSignUp(props.signupData)}>Sign Up</button>
  )
}
