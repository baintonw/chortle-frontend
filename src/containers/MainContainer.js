import React from 'react'
import MainChoreContainer from './MainChoreContainer'
import RoommatesContainer from './RoommatesContainer'
import UserContainer from './UserContainer'


import { connect } from 'react-redux'

import { setChores, logout, updateUserChores } from '../actions'


class MainContainer extends React.Component {
  componentDidMount(){
    fetch('http://localhost:3000/chores')
      .then(res=>res.json())
      .then(choreData => {
        this.props.setChores(choreData)
      })
    //Set user's chores in state here?
    this.props.updateUserChores(this.props.user.chores)

  }

mainRender = () => {
  if(this.props.user && this.props.userPage){
    return <UserContainer />
  } else {
    return (
      <div>
        <MainChoreContainer />
        <RoommatesContainer />
      </div>
  )
  }
}

  render(){
    console.log("updateUserChores FUNKAAAAY", this.props.updateUserChores)
    return(
      <div className="ui container main">
        <h3>I am your favorite Main Container</h3>
          {this.mainRender()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    chores: state.chores,
    userPage: state.userPage
  }
}

function mapDispatchToProps(dispatch){
  return{
    setChores: (chores) => {
      return dispatch(setChores(chores))
    },
    logout: () => {
      return dispatch(logout())
    },
    updateUserChores: (userChores) => {
      return dispatch(updateUserChores(userChores))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
