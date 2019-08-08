import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import MainContainer from './containers/MainContainer'

import { connect } from 'react-redux'

import Chore from './components/Chore'

class App extends React.Component {


  componentDidMount(){
    fetch('http://localhost:3000/chores')
    	.then(res=>res.json())
    	.then(choreData=>console.log(choreData))
  }



  render(){

    console.log("APP PROPS", this.props.user)

    return (
      <div className="App">
        Chortle!
      <NavBar />
      {this.props.user ? <MainContainer /> : <Login />}
      </div>
    );
  }

}//end of app component

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
