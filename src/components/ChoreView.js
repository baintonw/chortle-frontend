import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { showEditChoreForm, postClaim, updateChores, addToUserChores } from '../actions'

class ChoreView extends React.Component{

  state = {
    chore: "",
    time: moment(),
    priority: "",
    user: this.props.user,
    clicked: false
  }

  componentDidMount(){

    fetch(`http://localhost:3000/chores/${this.props.choreId}`)
      .then(res=>res.json())
      .then(chore =>
        this.setState({
          chore: chore
        })
      )
  }

  componentWillUnmount(){
  }

  claim = (event) => {
    // event.preventDefault()
    console.log("Chore in -claim-------", this.state.chore)
    this.props.postClaim(this.props.user, this.state.chore)
    //adds chore to user BACKEND WORKS WITH AVAILABLE
    // props.toggleClaimed(props.chore)
    //changes claimed boolean on each chore WORKS WITH AVAILABLE
    this.props.updateChores(this.state.chore)
    //it's always this one
    // //removes chore from CHORES state
    this.props.addToUserChores(this.state.chore)
    this.setState({
      clicked: true
    }, () => {console.log("clicked!", this.state.clicked)})
    //adds chore to userChores state WORKS WITH AVAILABLE
  }




  ownerRender = () => {
    if(this.state.chore.users && this.state.chore.users.length > 0){
      return this.state.chore.users[0].username
    } else {
      return "Up for grabs!"
    }
  }

  handleClick = (event) => {
    console.log("editing...", this.state.chore)
    this.props.showEditChoreForm(this.state.chore)

  }

  renderButtons = () => {
    if(!this.state.chore.claimed && !this.state.clicked){
      return (
      <div>
        <button onClick={(event) => this.claim(event)} className="ui button">I'm on it!</button>
        <button onClick={this.handleClick} class="ui button">Edit</button>
      </div>
    )
    }
  }

  showPriority = () => {
    let now = moment()
    let soon = moment().add(4, "hours")
    let due = moment(this.state.chore.duedate)
      if(due < now){
          return "Overdue!"
      } else if(due > now && due < soon){
          return "Hurry up!"
      } else {
          return "Take your time!"
      }
  }

  renderColor = () => {
    let now = moment()
    let soon = moment().add(2, "days")
    let due = moment(this.state.chore.duedate)
    if(due < now){
      return <div className="red">Overdue!</div>
    } else if(due > now && due < soon){
      return <div className="yellow">Soon!</div>
    } else {
      return <div className="blue">Take your time</div>
    }
  }



  render(){
    console.log("MOUNTED")
    console.log("Chore", this.state.time)
    return(
      <div>
        <div className="ui raised very padded container segment">
          <div className="w3-card">
            {this.renderColor()}
              <div className="content">
                <div className="header">{this.state.chore.title}</div>
              </div>
              <div className="content">
                <h4 className="ui sub header"></h4>
                  {this.ownerRender()}
                <div className="ui small feed">
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                         <a>Description</a> I could really use some help on this one!
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                         <a>Priority</a> {this.showPriority()}
                      </div>
                    </div>
                  </div>
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                         Due {moment(this.state.chore.duedate).fromNow()} on {moment(this.state.chore.duedate).format("dddd DD MMMM [at] h:mmA")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="extra content">
                {this.renderButtons()}
              </div>
            </div>
          </div>
        </div>

    )
  }
}

function msp(state){
  return{
    user: state.user
  }
}


function mdp(dispatch){
  return{
    showEditChoreForm: (chore) => {
      return dispatch(showEditChoreForm(chore))
    },
    postClaim: (user, chore) => {
      return dispatch(postClaim(user, chore))
    },
    updateChores: (chore) => {
      return dispatch(updateChores(chore))
    },
    addToUserChores: (chore) => {
      return dispatch(addToUserChores(chore))
    }
  }
}

export default connect(msp, mdp)(ChoreView);
