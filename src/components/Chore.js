import React from 'react'
import { connect } from 'react-redux'

import { postClaim, updateChores, updateUserChores, addToUserChores, completeChore, deleteChore } from '../actions'

const Chore = (props) => {

  const claim = (event) => {
    // event.preventDefault()
    props.postClaim(props.user, props.chore)
    //adds chore to user BACKEND WORKS WITH AVAILABLE
    // props.toggleClaimed(props.chore)
    //changes claimed boolean on each chore WORKS WITH AVAILABLE
    props.updateChores(props.chore)
    //it's always this one
    // //removes chore from CHORES state
    props.addToUserChores(props.chore)
    //adds chore to userChores state WORKS WITH AVAILABLE
  }

  const handleClick = (event, chore) => {
    props.completeChore(props.chore)
  }

  const deleteClick = (event, chore) => {
    props.deleteChore(props.chore)
  }
  const renderButtons = () => {
    if(props.userPage && !props.chore.completed){
      return <button onClick={(event) => handleClick(event)} className="ui button">Done!</button>
    } else if(props.roommateState){
      return<div>They're working on it...</div>
    } else if(!props.userPage){
        return <button onClick={(event) => claim(event)} className="ui button">I'm on it!</button>
  } else {
      return(<div>Nice!</div>)
  }
}
  const verify = () => {
    console.log("%cThis here is a WHOLE chore", "color:white; font-size: 40px", props.chore, props.chores)

  }

  const renderOwner = () => {
    if(props.userPage){
      return props.user.username
    } else if(props.roommateState){
      return props.roommateState.username
    } else {
      return null
    }
  }

  return(
    <div className="column">
      <div onClick={verify} className="ui card tile teal">
        <div className="image">
          <img src="https://cdn3.iconfinder.com/data/icons/cleaning-icons-4/453/Brooms-512.png" alt="chore" />
        </div>
        <div className="content">
          <a className="header">{props.chore.title}</a>
        <div className="meta">
          <span className="date">Due by: {props.chore.duedate}</span>
        </div>
        <div className="description">
        They're in charge now!
        <div>
        {renderOwner()}
        </div>
        </div>
      </div>
        <div className="extra content">
          Description: {props.chore.description}
          <div>
            Completed: {props.chore.completed ? "Done!" : "I'm on it!"}
          </div>
          {renderButtons()}
          {props.userPage && props.chore.completed ? <button onClick={deleteClick}>Delete</button> : null}
        </div>
      </div>
    </div>
  )
}

function msp(state){
  return{
    user: state.user,
    roommateState: state.roommateState,
    userChores: state.userChores,
    userPage: state.userPage,
    chores: state.chores
  }
}

function mdp(dispatch){
  return{
    postClaim: (user, chore) => {
      dispatch(postClaim(user, chore))
    },
    // toggleClaimed: (chore) => {
    //   dispatch(toggleClaimed(chore))
    // },
    updateChores: (chore) => {
      dispatch(updateChores(chore))
    },
    updateUserChores: (userChore) => {
      dispatch(updateUserChores(userChore))
    },
    addToUserChores: (chore) => {
      dispatch(addToUserChores(chore))
    },
    completeChore: (chore) => {
      dispatch(completeChore(chore))
    },
    deleteChore: (chore) => {
      dispatch(deleteChore(chore))
    }
  }
}


export default connect(msp, mdp)(Chore);
