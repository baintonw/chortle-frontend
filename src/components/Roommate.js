import React from 'react'

import { connect } from 'react-redux'

import { roommatePage } from '../actions'

class Roommate extends React.Component{

  handleClick = (event) => {
    this.props.roommatePage(this.props.roommate)
  }
  render(){
    return(
      <div>
       <div id="roommate" onClick={this.handleClick} className="ui card">
        <div className="content">
        <div id="roommate-icon"></div>
          <div className="roomate-icon">
          <i class="user icon"></i>
          </div>
        <div className="roommatename">{this.props.roommate.username}</div>
          <div className="description">
            {this.props.roommate.description}
          </div>
        </div>
        <div className="extra content">
          <a>Chores:</a>{this.props.roommate.chores.length}
        </div>
      </div>
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
  return{
    roommatePage: (roommate) => {
      return dispatch(roommatePage(roommate))
    }
  }
}

export default connect(msp, mdp)(Roommate);
