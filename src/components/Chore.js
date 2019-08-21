import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'


import { postClaim, updateChores, updateUserChores, addToUserChores, completeChore, deleteChore } from '../actions'

class Chore extends React.Component{

  state = {
    open: false,
    complete: false,
  }

 claim = (event) => {
    // event.preventDefault()
    this.props.postClaim(this.props.user, this.props.chore)
    //adds chore to user BACKEND WORKS WITH AVAILABLE
    // this.props.toggleClaimed(this.props.chore)
    //changes claimed boolean on each chore WORKS WITH AVAILABLE
    this.props.updateChores(this.props.chore)
    //it's always this one
    // //removes chore from CHORES state
    this.props.addToUserChores(this.props.chore)
    //adds chore to userChores state WORKS WITH AVAILABLE
  }

 handleClick = (event, chore) => {
    this.props.completeChore(this.props.chore)
  }

 deleteClick = (event, chore) => {
    this.props.deleteChore(this.props.chore)
  }
 renderButtons = () => {
    if(this.props.userPage && !this.props.chore.completed){
      return <button onClick={(event) => this.handleClick(event)} className="ui button">Done!</button>
    } else if(this.props.roommateState){
      return<div>They're working on it...</div>
    } else if(!this.props.userPage){
        return <button onClick={(event) => this.claim(event)} className="ui button">I'm on it!</button>
  } else {
      return(<div>Nice!</div>)
  }
}
 displayClick = () => {
  this.setState({
    clicked: !this.state.clicked
  })

  }

 renderOwner = () => {
    if(this.props.userPage){
      return this.props.user.username
    } else if(this.props.roommateState){
      return this.props.roommateState.username
    } else {
      return null
    }
  }

 renderColor = () => {
    let now = moment()
    let soon = moment().add(2, "days")
    let due = moment(this.props.chore.duedate)
    if(this.props.chore.completed){
      return <div className="green">Done!</div>
    }else if(due < now){
      return <div className="red">Overdue!</div>
    } else if(due > now && due < soon){
      return <div className="yellow">Soon!</div>
    } else {
      return <div className="blue">Take your time</div>
    }
  }



  renderDetails = () => {
    if(this.state.clicked){
      return(
        <div className="extra content">
        Description: {this.props.chore.description}
        <div>
         {this.props.chore.completed && this.props.userPage ? "Done!" : null}
        </div>
        {this.renderButtons()}
        {this.props.userPage && this.props.chore.completed ? <button onClick={this.deleteClick}>Delete</button> : null}
        </div>
      )
    }
  }
  renderDone = () => {
    if(this.props.chore.completed){
      return(<div id="finished" className="ui card">
        {this.renderColor()}
        <div  className="ui image">
          <i className="thumbtack icon"></i>
        </div>
        <div  onClick={this.displayClick} id="chore" className="content">
          <a className="header">{this.props.chore.title}</a>
        <div className="meta">
          <span className="date">Due on: {moment(this.props.chore.duedate).format("dddd DD MMMM [at] h:mmA")}</span>
        </div>
      <div className="description">
        {this.props.chore.description}
          <div id="chore-details">
            {this.renderOwner()}
          </div>
        </div>
      </div>
        {this.renderDetails()}
      </div>
    )
    } else {
      return (
        <div className="ui card">
          {this.renderColor()}
          <div className="ui image">
            <i className="thumbtack icon"></i>
          </div>
          <div  onClick={this.displayClick} id="chore" className="content">
            <a className="header">{this.props.chore.title}</a>
          <div className="meta">
            <span className="date">Due on: {moment(this.props.chore.duedate).format("dddd DD MMMM [at] h:mmA")}</span>
          </div>
        <div className="description">
          {this.props.chore.description}
            <div id="chore-details">
              {this.renderOwner()}
            </div>
          </div>
        </div>
          {this.renderDetails()}
        </div>
      )
    }
  }


  render(){
    return(
      <div className="column">
        {this.renderDone()}
      </div>
    )
  }

}//COMPONENT ENDS HERE

// <div className="ui card">
//   {this.renderColor()}
//   <div className="ui image">
//     <i className="thumbtack icon"></i>
//   </div>
//   <div  onClick={this.displayClick} id="chore" className="content">
//     <a className="header">{this.props.chore.title}</a>
//   <div className="meta">
//     <span className="date">Due on: {moment(this.props.chore.duedate).format("dddd DD MMMM [at] h:mmA")}</span>
//   </div>
// <div className="description">
//   {this.props.chore.description}
//     <div id="chore-details">
//       {this.renderOwner()}
//     </div>
//   </div>
// </div>
//   {this.renderDetails()}
// </div>

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
