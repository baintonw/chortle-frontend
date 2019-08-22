import React from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const events = [
    {
      start: new Date(moment("08-10-2019")),
      end: new Date(moment("08-10-2019").add(1, "hour")),
      title: "Do the dishes",
      id: 1
    },
    {
      start: new Date(moment("08-16-2019")),
      end: new Date(moment("08-16-2019")),
      title: "Some title",
      id: 2
    },
    {
      start: new Date(moment("08-23-2019")),
      end: new Date(moment("08-23-2019")),
      title: "Graduate!",
      id: 3
    }
  ]
class MyCalendar extends React.Component{

  state = {
    events: []
  }

  convertChores = () => {
    const newEvents = this.props.chores.map(chore => {
      if(!chore.completed){

        return {
          start: new Date(moment(chore.duedate)),
          end: new Date(moment(chore.duedate).add(1, "hours")),
          title: chore.title,
          description: chore.description,
          id: chore.id
        }
      }
    })
    this.setState({
      events: newEvents
    })
  }

  componentDidMount(){
    this.convertChores()
  }



  render(){
    console.log("ALL THE CHORES ON CALENDAR", this.state.events)
    return(
        <div className="ui segment calendar">
          <Calendar
            popup="true"
            localizer={localizer}
            events={this.state.events}
            onDoubleClickEvent={(event) => this.props.handleClick(event)}
            startAccessor="start"
            endAccessor="end"
          />
        </div>


    )
  }
}

function msp(state){
  return{
    chores: state.chores
  }
}

function mdp(dispatch){
  return{}
}



//
// Moment format
// moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

export default connect(msp, mdp)(MyCalendar);
