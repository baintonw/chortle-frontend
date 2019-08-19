import React from 'react'
import Chore from '../components/Chore'

import { connect } from 'react-redux'

class MainChoreContainer extends React.Component{


  // componentDidMount(){
  //   this.getChores()
  // }
  // getChores = () => {
  //   fetch('http://localhost:3000/chores')
  //     .then(res=>res.json())
  //     .then(choreData => {
  //       this.setState({
  //         availableChores: choreData
  //       })
  //     })
  // }

  renderChores = () => {
    return this.props.available.map(chore => {
      if(chore.claimed !== true){
          return <Chore chore={chore} />
        }
      })
  }



  render(){
    return(
      <div className="ui grid">
        <div className="three column row">
          {this.renderChores()}
        </div>
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
