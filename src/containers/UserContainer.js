import React from 'react'

import { connect } from 'react-redux'

import Chore from '../components/Chore'

class UserContainer extends React.Component{

  state = {
    user: "",
    localChores: []
  }

  componentDidMount(user){
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
      .then(res=>res.json())
      .then(userObj =>
         this.setState({
            user: userObj,
            localChores: userObj.chores
          }, () => console.log("The eagle has landed!", this.state.user, this.state.user.chores)
        ))
  }


  // renderUserChores = () => {
  //   if(this.state.user.chores){
  //
  //   }
  //   this.state.user.chores.map(chore => {
  //     return <Chore chore={chore} />
  //   })
  // }
  renderUserChores = () => {
    return this.props.userChores.map(chore => {
      return <Chore chore={chore} />
    })
  }

  completeUserChore = (chore) => {
    console.log("completed!")
  }
  //Render user.chores when I have the user object set in state

  render(){

    console.log("ALL CHORES", this.props.chores)
    console.log("USER CHORES", this.props.userChores)
    console.log("AVAILABLE", this.props.available)
    console.log("user", this.state.user)
    return(
      <div className="ui container user">
        <h2>This is the user user container</h2>
          {this.state.user ? this.renderUserChores() : null}
      </div>
    )
  }
}

function msp(state){
  return{
    user: state.user,
    chores: state.chores,
    userChores: state.userChores,
    available: state.available
  }
}

function mdp(dispatch){
  return{}
}

export default connect(msp, mdp)(UserContainer);
