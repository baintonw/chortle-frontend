import React from 'react'
import Roommate from '../components/Roommate'

import { connect } from 'react-redux'

import { setRoommates } from '../actions'

class RoommatesContainer extends React.Component{
  componentDidMount(){
    fetch('http://localhost:3000/users')
    	.then(res=> res.json())
    	.then(users => {
        const roommates = users.filter(user => user.id !== this.props.user.id)
        this.props.setRoommates(roommates)
      })
  }




  renderRoommates = () => {
    return this.props.roommates.map(roommate => {
      return <Roommate roommate={roommate} />
    })
  }


  render(){
    return(
      <div id="roommates">
      <div className="ui raised segment primary">
        <div className="ui one column grid">
          <div id="col" className="column">
            <div id="my-roommates">My Roommates!</div>
            {this.renderRoommates()}
          </div>
        </div>
      </div>
      </div>
    )
  }
}

function msp(state){
  return{
    user: state.user,
    roommates: state.roommates
  }
}

function mdp(dispatch){
  return{
    setRoommates: (roommates) => {
      return dispatch(setRoommates(roommates))
    }
  }
}

export default connect(msp, mdp)(RoommatesContainer);
