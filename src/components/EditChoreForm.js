import React from 'react'

import 'antd/dist/antd.css'

import { DatePicker } from 'antd';

import { connect } from 'react-redux'

import { editChore } from '../actions'


class EditChoreForm extends React.Component{

  state = {
    title: this.props.editChoreView.title,
    room: "",
    duedate: this.props.editChoreView.duedate,
    description: this.props.editChoreView.description
  }


  handleStateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {console.log(this.state.duedate)})
  }

  handleDueDate = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      duedate: dateString
    }, () => console.log(this.state.duedate))
  }

  handleClick = (event) => {
    event.preventDefault()
    const chore = {
      title: this.state.title,
      room: this.state.room,
      duedate: this.state.duedate,
      description: this.state.description,
      id: this.props.editChoreView.id
    }
    this.props.editChore(chore)
  }

  render(){
    console.log(this.props.editChoreView)
    return(
      <div>
        <form className="ui form">
          <div className="field">
            <label>Chore Name</label>
            <input onChange={(event) => this.handleStateChange(event)} value={this.state.title} type="text" name="title" placeholder="First Name" />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea onChange={(event) => this.handleStateChange(event)} value={this.state.description} type="text" name="description" placeholder="First Name" />
          </div>
          <div>
            <DatePicker showTime onChange={this.handleDueDate} />
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
  return{
    editChoreView: state.editChoreView
  }
}

function mdp(dispatch){
  return{
    editChore: (chore) => {
      return dispatch(editChore(chore))
    }
  }
}

export default connect(msp, mdp)(EditChoreForm);
