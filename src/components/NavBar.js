import React from 'react'

import { connect } from 'react-redux'

import { home, logout, userPage, addForm, showCalendar } from '../actions.js'


class NavBar extends React.Component{
  render(){
    return(
      <div className="ui raised segment navbar primary">
        <div id="chortle" className="left">
          Chortle!
        </div>
        <div>
          {this.props.user
             ?
             <div>

               <div className="nav-btns">
                 <button onClick={() => this.props.addForm()} className="ui button add-btn">Add A Chore!</button>
                 <button onClick={() => {this.props.showCalendar()}} className="ui button calendar-btn">The Calendar</button>
               </div>
               <div id="apt-name">
                  Jerry's Apartment
               </div>
              <div className="right">
              <div id="username" onClick={() => this.props.userPage()}>
                {this.props.user.username}
              </div>
              <div onClick={this.props.home} id="home" className="ui animated button" tabIndex="0">
                <div className="visible content">Home</div>
                <div className="hidden content">
                  OK!
                </div>
              </div>
               <div onClick={this.props.logout} id="logout" className="ui animated button" tabIndex="0">
                 <div className="visible content">Logout</div>
                 <div className="hidden content">
                   Bye!
                 </div>
              </div>
              </div>
            </div>
             :
            null}
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
    logout: () => {
      return dispatch(logout())
    },
    userPage: () => {
      return dispatch(userPage())
    },
    home: () => {
      return dispatch(home())
    },
    showCalendar: () => {
      return dispatch(showCalendar())
    },
    addForm: () => {
      return dispatch(addForm())
    }
  }
}

export default connect(msp, mdp)(NavBar);
