import React from 'react'

import { connect } from 'react-redux'
import { usernameInput, passwordInput, login, signup } from '../actions'

function Login(props){
  const getUser = (event, username, password) => {
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.message){
        alert(user.message)
      } else {
        console.log("THE response", user)
        props.login(user)
      }
    })
  }

  return(
  <div>
    <div className="login-bar">
      <div className="ui form login">
        <div className="fields">
          <div className="field input focus">
            <label>Username</label>
              <input onChange={(e) => props.usernameInput(e.target.value)} type="text" placeholder="Username" />
          </div>
        </div>
        <div className="field input focus">
          <label>Password</label>
            <input onChange={(e) => props.passwordInput(e.target.value)}  type="password" />
        </div>
      </div>
    <div>
      <button className="ui button login-btn" onClick={(e) => getUser(e, props.username, props.password)} type="submit" value="Submit">Log In</button>
      <button onClick={() => props.signup()} className="ui button signup-btn">Sign Up</button>
    </div>
    </div>
      <div className="icon-container">
        <img id="login-icon" src="https://iconsgalore.com/wp-content/uploads/2018/10/broom-1-featured-2.png" />
      </div>
  </div>
)
}

function msp(state){
  return{
    username: state.username,
    password: state.password,
    text: state.text,
    signupForm: state.signupForm
  }
}

function mdp(dispatch){
  return{
    usernameInput: (text) => {
      return dispatch(usernameInput(text))
      //this function mirrors the format of what's called in the onClick
    },
    passwordInput: (text) => {
      return dispatch(passwordInput(text))
    },
    login: (user) => {
      return dispatch(login(user))
    },
    signup: () => {
      return dispatch(signup())
    }
  }
}
//currently i'm loggin in the username not the whole user object
export default connect(msp, mdp)(Login);
