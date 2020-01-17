import React from 'react'
import Chore from '../components/Chore'
import Empty from '../components/Empty'

import { connect } from 'react-redux'

class MainChoreContainer extends React.Component{

  renderContainer = () => {
    return(
      <div className="ui segment raised chores primary">
          <h1>Available Chores!</h1>
        <div className="available">
          <div className="ui three column grid">
              {this.noChores() ? <Empty /> : this.renderChores()}
          </div>
        </div>
      </div>
    )
  }

  renderChores = () => {
    return this.props.available.map(chore => {
      if(chore.claimed !== true){
          return <Chore chore={chore} />
        }
      })
  }

  noChores = () => {
    if(this.props.available.length === 0){
      return true
    }
  }

  render(){
    console.log("%cAVAILABLE CHORES", "color: green; font-size: 30px", this.props.available)
    return(
      <div>
        {this.noChores() ? <Empty /> : this.renderContainer()}
      </div>
    )
  }
}

function msp(state){
  return{
    user: state.user,
    chores: state.chores,
    available: state.available
  }

}

function mdp(){
  return{}
}



export default connect(msp, mdp)(MainChoreContainer);
