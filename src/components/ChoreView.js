import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { showEditChoreForm } from '../actions'

class ChoreView extends React.Component{

  state = {
    chore: "",
    time: "",
    priority: ""
  }

  componentDidMount(){
    this.interval = setInterval(() => this.setState({ time: moment() }, () => console.log(this.state.time)), 3000);

    fetch(`http://localhost:3000/chores/${this.props.choreId}`)
      .then(res=>res.json())
      .then(chore =>
        this.setState({
          chore: chore
        })
      )
  }

  componentWillUnmount(){
    clearInterval(this.interval)
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
    if(!this.state.chore.claimed){
      return <button onClick={this.handleClick} class="ui button">Edit</button>
    }
  }

  showPriority = () => {
    let now = moment()
    let soon = moment().add(4, "hours")
    let due = moment(this.state.chore.duedate)
      if(due < this.state.time){
          return "Overdue!"
      } else if(due > this.state.time && due < soon){
          return "Hurry up!"
      } else {
          return "Take your time!"
      }
  }

  render(){
    console.log("MOUNTED")
    console.log("Chore view's Id", this.state.chore.users)
    return(
      <div background-color="red" class="ui card">
        <div class="content">
          <div class="header">{this.state.chore.title}</div>
        </div>
        <div class="content">
          <h4 class="ui sub header"></h4>
            {this.ownerRender()}
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">
                   <a>Description</a> I could really use some help on this one!
                </div>
              </div>
            </div>
            <div class="event">
              <div class="content">
                <div class="summary">
                   <a>Priority</a> {this.showPriority()}
                </div>
              </div>
            </div>
            <div class="event">
              <div class="content">
                <div class="summary">
                   Due {moment(this.state.chore.duedate).fromNow()} on {moment(this.state.chore.duedate).format("dddd DD MMMM [at] h:mmA")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="extra content">
          {this.renderButtons()}
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
    }
  }
}

export default connect(msp, mdp)(ChoreView);
