import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import MainContainer from './containers/MainContainer'
import SignupForm from './components/SignupForm'
import UserContainer from './containers/UserContainer'

import { connect } from 'react-redux'

import { like, dislike, handleChange } from './actions'

import Chore from './components/Chore'

class App extends React.Component {


  // componentDidMount(){
  //   fetch('http://localhost:3000/chores')
  //   	.then(res=>res.json())
  //   	.then(choreData=>console.log(choreData))
  // }

  renderHome = () => {
    if(this.props.user){
      return <MainContainer />
    } else if(this.props.signupForm){
      return <SignupForm />
    } else {
        return <Login />
    }
  }



  render(){
    return (
      <div className="App">
        Chortle!
        <NavBar />

          {this.renderHome()}
      </div>
    );
  }

}//end of app component

function mapStateToProps(state){
  return {
    user: state.user,
    chores: state.chores,
    username: state.username,
    signupForm: state.signupForm,
    userPage: state.userPage,
    likes: state.likes
  }
}

function mapDispatchToProps(dispatch){
  return {
    like: () => {
      return dispatch(like())
    },
    dislike: () => {
      return dispatch(dislike())
    }
  }
}

// {this.props.user ? <MainContainer /> : <Login />}

export default connect(mapStateToProps, mapDispatchToProps)(App);
