import React from 'react'

import { connect } from 'react-redux'

class RoommatesContainer extends React.Component{

  renderRoommates = () => {
    return <div>
      <div className="card">
       <div className="image">
         <img src="/images/avatar2/large/matthew.png" />
       </div>
       <div className="content">
         <div className="header">Matt Giampietro</div>
         <div className="meta">
           <a>Friends</a>
         </div>
         <div className="description">
           Matthew is an interior designer living in New York.
         </div>
       </div>
       <div className="extra content">
         <span className="right floated">
           Joined in 2013
         </span>
         <span>
           <i className="user icon"></i>
           75 Friends
         </span>
       </div>
     </div>
    </div>
  }
  render(){
    return(
      <div className="ui container">
        <h3>I am your go-to Roommates container</h3>
          {this.renderRoommates()}
      </div>
    )
  }
}

function msp(state){
  return{
    roommates: state.roommates
  }
}

function mdp(){
  return{}
}

export default connect(msp, mdp)(RoommatesContainer);
