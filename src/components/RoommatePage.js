import React from 'react'
import Chore from './Chore'
import Star from './Star'
import Empty from './Empty'

import { connect } from 'react-redux'

class RoommatePage extends React.Component{

  roommateChores = () => {
    return this.props.roommateState.chores.map(chore => {
        return <Chore chore={chore}/>
      })
  }


  completed = () => {
    console.log(this.props.roommateState.chores)
    const completedChores = this.props.roommateState.chores.filter(chore => {
      return chore.completed
    })
    return completedChores.length
  }

  noChores = () => {
    if(this.props.roommateState.chores.length === 0){
      return true
    }
  }

  renderContainer = () => {
    return(
      <div className="ui raised segment user-chores primary">
        <div className="ui three column grid" >
          {this.props.roommateState ? this.roommateChores() : null}
        </div>
      </div>
    )
  }


  render(){
    return(
      <div className="userpage">
        <div className="ui raised segment about-me primary">
          <h1>{this.props.roommateState.username}</h1>
            <div className="star">{this.completed()}<i class="star outline icon"></i></div>
          <h3>About:</h3>
            <p>{this.props.roommateState.description}</p>
      </div>
          {this.noChores() ? <Empty /> : this.renderContainer()}
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
