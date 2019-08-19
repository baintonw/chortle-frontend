import React from 'react'

import { connect } from 'react-redux'
import { postUser, login } from '../actions'


class SignupForm extends React.Component{
  state = {
    newUsername: "",
    newPassword: ""
  }

  newUser = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postUser = (event) => {
    event.preventDefault()

    this.props.postUser(this.state.newUsername, this.state.newPassword)
      .then(data => {
        console.log("Logged in a new user!", data)
        this.props.login(data)
      })//not working

    this.setState({
      newUsername: "",
      newPassword: ""
    })
  }


  render(){
    console.log("current user", this.props.user)
    return(
      <div>
        <form className="ui equal width form">
          <div className="fields">
            <div className="field">
              <label>Username</label>
                <input onChange={(event) => this.newUser(event)} name="newUsername" value={this.state.newUsername} type="text" placeholder="Username"></input>
            </div>
            <div className="field">
              <label>Password</label>
                <input onChange={(event) => this.newUser(event)} name="newPassword" value={this.state.newPassword} type="password"></input>
            </div>
            </div>
          <div onClick={(event) => this.postUser(event)} className="ui submit button">Submit</div>
        </form>
      </div>
    )
  }
}

function msp(state){
  return {
    user: state.user,
    signupForm: state.signupForm
  }
}

function mdp(dispatch){
  return{
    postUser: (newUsername, newPassword) => {
      return dispatch(postUser(newUsername, newPassword))
    },
    login: (user) => {
      return dispatch(login(user))
    }
  }
}



export default connect(msp, mdp)(SignupForm);
