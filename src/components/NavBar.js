import React from 'react'

import { connect } from 'react-redux'

import { logout, userPage } from '../actions.js'


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
               <div onClick={this.props.logout} className="ui animated button" tabIndex="0">
                 <div className="visible content">Next</div>
                 <div className="hidden content">
                   Log out
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
      return dispatch(userPage(), console.log("hit", userPage()))
    }
  }
}

export default connect(msp, mdp)(NavBar);
