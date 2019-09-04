import React from 'react'
import MyCalendar from '../BigCalendar'

import 'antd/dist/antd.css'


import { DatePicker } from 'antd';

import MainChoreContainer from './MainChoreContainer'
import RoommatesContainer from './RoommatesContainer'
import UserContainer from './UserContainer'
import AddChoreForm from '../components/AddChoreForm'
import RoommatePage from '../components/RoommatePage'
import ChoreView from '../components/ChoreView'
import EditChoreForm from '../components/EditChoreForm'

import Empty from '../components/Empty'
import Footer from '../components/Footer'



import { connect } from 'react-redux'

import { setChores, setAvailable, logout, updateUserChores, addForm, showCalendar, showChoreView } from '../actions'


class MainContainer extends React.Component {
  componentDidMount(){
    fetch('http://localhost:3000/chores')
      .then(res=>res.json())
      .then(choreData => {
        this.props.setChores(choreData)
        this.props.setAvailable(choreData)
      })
      this.props.updateUserChores(this.props.user.id)
}

showChoreView = (event) => {
  console.log("%cThis is telling me if it's chore view or not", "color: red; font-size:30px", this.props.choreView, "the event", event)
  this.props.showChoreView(event.id)
}

mainRender = () => {
  if(this.props.user && this.props.userPage){
    return <UserContainer />
  } else if(this.props.user && this.props.calendar){
      return <MyCalendar handleClick={(event) => this.showChoreView(event)} />
  } else if(this.props.user && this.props.roommateState){
      return <RoommatePage />
  } else if(this.props.addFormPage) {
      return <AddChoreForm />
  } else if(this.props.choreView){
      return <ChoreView choreId={this.props.choreView} />
  } else if(this.props.editChoreView){
      return <EditChoreForm />
  } else {
    return (
      <div>
          <MainChoreContainer />
          <RoommatesContainer />
      </div>
    )
  }
}




  render(){
    console.log("This is the old chore view action", this.props.showChoreView)
    return(
      <div>
        <div className="ui container">
            {this.mainRender()}
        </div>
        <div className="ui raised segment footer primary">
          <Footer />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    chores: state.chores,
    availableChores: state.availableChores,
    userPage: state.userPage,
    roommateState: state.roommateState,
    addFormPage: state.addFormPage,
    userChores: state.userChores,
    calendar: state.calendar,
    choreView: state.choreView,
    editChoreView: state.editChoreView,
  }
}

function mapDispatchToProps(dispatch){
  return{
    setChores: (chores) => {
      return dispatch(setChores(chores))
    },
    logout: () => {
      return dispatch(logout())
    },
    updateUserChores: (userChores) => {
      return dispatch(updateUserChores(userChores))
    },
    addForm: () => {
      return dispatch(addForm())
    },
    showCalendar: () => {
      return dispatch(showCalendar())
    },
    setAvailable: (chores) => {
      return dispatch(setAvailable(chores))
    },
    showChoreView: (chore => {
      return dispatch(showChoreView(chore))
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
