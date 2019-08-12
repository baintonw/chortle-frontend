import React from 'react'

import { connect } from 'react-redux'

import Chore from '../components/Chore'

class UserContainer extends React.Component{

  renderUserChores = () => {
    return this.props.userChores.map(chore => {
      return <Chore chore={chore} />
    })
  }

  //Render user.chores when I have the user object set in state

  render(){
    console.log("%cREAD EM AND WEEP BABY", "color: red; font-size: 40px", this.props.userChores)
    return(
      <div className="ui container user">
        <h2>This is the user user container</h2>
          {this.renderUserChores()}
      </div>
    )
  }
}

function msp(state){
  return{
    user: state.user,
    chores: state.chores,
    userChores: state.userChores
  }
}

function mdp(dispatch){
  return{}
}

export default connect(msp, mdp)(UserContainer);
