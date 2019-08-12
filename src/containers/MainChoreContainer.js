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
    return this.props.chores.map(chore => {
      if(chore.claimed !== true){
          return <Chore rerender={this.rerender} chore={chore} />
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
    chores: state.chores
  }

}

function mdp(){
  return{}
}

//ADD A CHORE FETCH COMPLETE

// fetch('http://localhost:3000/chores', {
// 	method: "POST",
// 	headers: {
// 		"Content-Type": "application/json"
// 	},
// 	body: JSON.stringify({
// 		name: "Test Chore",
// 		room: "Basement",
// 		duedate: null,
// 		completed: false,
// 		claimed: false
// 	})
// })

export default connect(msp, mdp)(MainChoreContainer);
