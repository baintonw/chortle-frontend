import React from 'react'
import MainChoreContainer from './MainChoreContainer'
import RoommatesContainer from './RoommatesContainer'
import UserContainer from './UserContainer'
import AddChoreForm from '../components/AddChoreForm'



import { connect } from 'react-redux'

import { setChores, logout, updateUserChores, addForm } from '../actions'


class MainContainer extends React.Component {
  componentDidMount(){
    fetch('http://localhost:3000/chores')
      .then(res=>res.json())
      .then(choreData => {
        this.props.setChores(choreData)
      })
    //Set user's chores in state here?
    this.props.updateUserChores(this.props.user.id)

  }

mainRender = () => {
  if(this.props.user && this.props.userPage){
    return <UserContainer />
  } else if(this.props.addFormPage) {
    return <AddChoreForm />
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
    console.log("%cUSER CHORES", "color: red; background-color:black; font-size: 20px", this.props.userChores)
    return(
      <div className="ui container main">
        <h3>I am your favorite Main Container</h3>
        <p>{this.props.user ? this.props.user.username : null}</p>
          <button onClick={() => this.props.addForm()} className="ui button">{this.props.addFormPage ? "Back" : "Add A Chore!"}</button>
            {this.mainRender()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    chores: state.chores,
    userPage: state.userPage,
    addFormPage: state.addFormPage,
    userChores: state.userChores
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
    },
    addForm: () => {
      return dispatch(addForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
