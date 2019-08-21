import React from 'react'

import { connect } from 'react-redux'
import { postUser, login, home } from '../actions'


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
        <form className="ui form signup">
            <h1 id="signup-title">Sign up!</h1>
          <div className="fields">

            <div id="signup-name" className="field input focus">
              <label>Username</label>
                <input onChange={(event) => this.newUser(event)} name="newUsername" value={this.state.newUsername} type="text" placeholder="Username"></input>
            </div>
            <div id="signup-pass" className="field input focus">
              <label>Password</label>
                <input onChange={(event) => this.newUser(event)} name="newPassword" value={this.state.newPassword} type="password"></input>
            </div>
          </div>

          <div onClick={(event) => this.postUser(event)} id="signup-submit" className="ui submit button">Submit</div>
          <div onClick={(event) => this.props.home(event)} id="back" className="ui submit button">Back</div>

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
    },
    home: () => {
      return dispatch(home())
    }
  }
}



export default connect(msp, mdp)(SignupForm);
