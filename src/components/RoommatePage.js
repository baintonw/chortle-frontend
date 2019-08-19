import React from 'react'
import Chore from './Chore'

import { connect } from 'react-redux'

class RoommatePage extends React.Component{
  roommateChores = () => {
    return this.props.roommateState.chores.map(chore => {
        return <Chore chore={chore}/>
      })
  }
  render(){
    return(
      <div>
        <p>Roommate name: {this.props.roommateState.username}</p>
        <p>ID:{this.props.roommateState.id}</p>
        {this.roommateChores()}
      </div>
    )
  }
}

function msp(state){
  return{
    roommateState: state.roommateState
  }
}

function mdp(dispatch){
  return{}
}

export default connect(msp, mdp)(RoommatePage);
