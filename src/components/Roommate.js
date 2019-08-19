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
       <div className="ui card">
        <div className="image">
          <img src="/images/avatar2/large/matthew.png" />
        </div>
        <div className="content">
          <div onClick={this.handleClick} className="roommatename">{this.props.roommate.username}</div>
          <div className="meta">
            <a>Friends</a>
          </div>
          <div className="description">
            Matthew is an interior designer living in New York.
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">
            Joined in 2013
          </span>
          <span>
            <i className="user icon"></i>
            75 Friends
          </span>
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
