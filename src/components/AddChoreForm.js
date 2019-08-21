import React from 'react'

import 'antd/dist/antd.css'

import { DatePicker } from 'antd';

import { connect } from 'react-redux'

import { postChore, addToChores, updateChores, addForm } from '../actions'

class AddChoreForm extends React.Component{
  state = {
    title: "",
    room: "",
    duedate: "",
    description: ""
  }

  handleStateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick = (event) => {
    event.preventDefault()
    const chore = {
      title: this.state.title,
      room: this.state.room,
      duedate: this.state.duedate,
      description: this.state.description
    }

    this.props.postChore(chore)
    // this.props.updateChores(chore)
    // this.props.addToChores(chore)
    this.props.addForm()
    //turns off addForm


  }
  handleChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      duedate: dateString
    }, () => console.log("DUE DATE IN STATE", this.state.duedate))
  }
  render(){
    return(
      <div>
        <form className="ui form add-form">
          <div className="field">
            <label>Chore Name</label>
            <input onChange={(event) => this.handleStateChange(event)} type="text" name="title" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea onChange={(event) => this.handleStateChange(event)} type="text" name="description" placeholder="First Name" />
          </div>
          <div>
            <DatePicker showTime onChange={this.handleChange} />
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
