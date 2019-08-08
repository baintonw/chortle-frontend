import React from 'react'

import { connect } from 'react-redux'

function Login(props){
  console.log("Current User", props.user)
  return <div className="ui form">
      <div className="fields">
        <div className="field">
          <label>Username</label>
          <input onChange={(e) => props.handleChange(e.target.value)} type="text" placeholder="Username" />
        </div>
      </div>
      <div className="field">
        <label>Password</label>
        <input placeholder="Password" type="password" />
        <button onClick={props.login} type="submit" value="Submit">Log In</button>
      </div>
  </div>
}

function msp(state){
  return{
    user: state.user,
    userInput: state.userInput
  }
}

function mdp(dispatch){
  return{
    handleChange: (text) => {
      return dispatch({type: "USER_INPUT", payload: text})
    },
    login: () => {
      return dispatch({type: "LOGIN"})
    }
  }
}

export default connect(msp, mdp)(Login);
