import React from 'react'

import { connect } from 'react-redux'

import { home, logout, userPage } from '../actions.js'


class NavBar extends React.Component{
  // const user = JSON.parse(this.props.user)
  render(){
    return(
      <div className="ui header">
        <div className="left">
          Left!
        </div>
        <div className="right">
          {this.props.user
             ?
             <div>
              <div className="username" onClick={() => this.props.userPage()}>
                {this.props.user.username}
              </div>
              <div onClick={this.props.home} className="ui animated button" tabIndex="0">
                <div className="visible content">Home</div>
                <div className="hidden content">
                  OK!
                </div>
              </div>
               <div onClick={this.props.logout} className="ui animated button" tabIndex="0">
                 <div className="visible content">Logout</div>
                 <div className="hidden content">
                   Bye!
                 </div>
              </div>
            </div>
             :
            null}
        </div>
        <div className="middle">
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
    }
  }
}

export default connect(msp, mdp)(NavBar);
