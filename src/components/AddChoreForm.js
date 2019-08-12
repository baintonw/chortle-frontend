import React from 'react'

import { connect } from 'react-redux'

import { postChore, addToChores, updateChores, addForm } from '../actions'

class AddChoreForm extends React.Component{
  state = {
    name: "",
    room: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, console.log("%cHEY THERE THIS STUFF IS IN STATE", "color: red", this.state.room))
  }

  handleClick = (event) => {
    event.preventDefault()
    const chore = {
      name: this.state.name,
      room: this.state.room
    }

    this.props.postChore(chore)
    this.props.updateChores(chore)
    this.props.addToChores(chore)
    this.props.addForm()


  }

  render(){
    console.log("%cWHATUP HOMIE THIS POST CHORE FUNK IS HERE", "color:red; font-size: 25px", this.props.postChore)
    return(
      <div>
        <form className="ui form">
          <div className="field">
            <label>Chore Name</label>
            <input onChange={(event) => this.handleChange(event)} type="text" name="name" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Room</label>
            <input onChange={(event) => this.handleChange(event)} type="text" name="room" placeholder="Last Name" />
          </div>
          <div className="field">
          </div>
          <button onClick={(event) => this.handleClick(event)} className="ui button" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function msp(state){
  return {
    chores: state.chores
  }
}

function mdp(dispatch){
  return {
    postChore: (chore) => {
      dispatch(postChore(chore))
    },
    addToChores: (chore) => {
      dispatch(addToChores(chore))
    },
    updateChores: (chore) => {
      return dispatch(updateChores(chore))
    },
    addForm: () => {
      return dispatch(addForm())
    }
  }
}

export default connect(msp, mdp)(AddChoreForm);
