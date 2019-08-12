import React from 'react'
import { connect } from 'react-redux'

import { postClaim, toggleClaimed, updateChores, updateUserChores } from '../actions'

const Chore = (props) => {

  const postClaim = (event) => {
    event.preventDefault()
    console.log('claimed!', props.chore.id)
    props.postClaim(props.user, props.chore)
    props.toggleClaimed(props.chore)
    props.updateChores(props.chore)
    props.updateUserChores(props.chore)
    console.log(props.userChores)
  }

  return(
    <div className="column">
      <div className="ui card tile">
        <div className="image">
          <img src="https://cdn3.iconfinder.com/data/icons/cleaning-icons-4/453/Brooms-512.png" alt="chore" />
        </div>
        <div className="content">
          <a className="header">{props.chore.name}</a>
        <div className="meta">
          <span className="date">Due by: {props.chore.duedate}</span>
        </div>
        <div className="description">
          I won't be home till 7:30, can someone take care of these pleaaase!
        </div>
      </div>
        <div className="extra content">
          Claimed: {props.chore.claimed ? "Yep!" : "Pick me!"}
          <button onClick={(event) => postClaim(event)} className="ui button">I'm on it!</button>
        </div>
      </div>
    </div>
  )
}

function msp(state){
  return{
    user: state.user,
    userChores: state.userChores
  }
}

function mdp(dispatch){
  return{
    postClaim: (user, chore) => {
      dispatch(postClaim(user, chore))
    },
    toggleClaimed: (chore) => {
      dispatch(toggleClaimed(chore))
    },
    updateChores: (chore) => {
      dispatch(updateChores(chore))
    },
    updateUserChores: (userChore) => {
      dispatch(updateUserChores(userChore))
    }
  }
}


export default connect(msp, mdp)(Chore);
