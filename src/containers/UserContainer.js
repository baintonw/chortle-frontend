import React from 'react'

import { connect } from 'react-redux'

import Chore from '../components/Chore'
import Star from '../components/Star'
import Empty from '../components/Empty'

class UserContainer extends React.Component{

  state = {
    user: "",
    localChores: [],
    edit: false,
    description: ""
  }

  editDescription = () => {
    console.log("Description")
    this.setState({
      edit: !this.state.edit
    }, () => {console.log(this.state.edit)})
  }

  handleChange = (event) => {
    this.setState({
      description: event.target.value
    }, ()=> {console.log(this.state.description)})
  }

  submitDescription = (event) => {
    console.log("description in state", this.state.description)
    fetch(`http://localhost:3000/users/${this.props.user.id}/edit`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                description: this.state.description
              })
            })
            .then(res=>res.json())
            .then(updatedUser =>{
              console.log(updatedUser)
              this.setState({
                user: updatedUser,
                edit: false
              })
            }
            )
  }
  componentDidMount(user){
    fetch(`http://localhost:3000/users/${this.props.user.id}`)
      .then(res=>res.json())
      .then(userObj =>
         this.setState({
            user: userObj,
            localChores: userObj.chores
          }, () => console.log("The eagle has landed!", this.state.user, this.state.user.chores)
        ))

  }


  // renderUserChores = () => {
  //   if(this.state.user.chores){
  //
  //   }
  //   this.state.user.chores.map(chore => {
  //     return <Chore chore={chore} />
  //   })
  // }
  renderUserChores = () => {
        return this.props.userChores.map(chore => {
          return <Chore chore={chore} />
        })

  }

  completeUserChore = (chore) => {
    console.log("completed!")
  }
  //Render user.chores when I have the user object set in state
  completed = () => {
    console.log(this.props.userChores)
    const completedChores = this.props.userChores.filter(chore => {
      return chore.completed
    })
    return completedChores.length
  }

  noChores = () => {
    if(this.props.userChores.length === 0){
      return true
    }
  }
  renderContainer = () => {
    return(
      <div className="ui raised segment user-chores primary">
        <div className="ui three column grid" >
          {this.state.user ? this.renderUserChores() : null}
        </div>
      </div>
    )
  }
  render(){

    return(
    <div className="userpage">
        <div className="ui raised segment about-me primary">
          <h1>My page</h1>
                <div className="star">{this.completed()}<i class="star outline icon"></i></div>
            <h3>About:</h3>
              <p>{this.state.user.description}</p>
              {this.state.edit
                ?
                <div>
                  <textarea autofocus="true" onChange={this.handleChange}></textarea>
                  <div>
                    <button id="edit" className="ui button" onClick={(event) => this.submitDescription(event)}>Submit</button>
                  </div>
                </div>
                :
                <button id="edit" className="ui button" onClick={this.editDescription}>Edit description</button>}
        </div>
          {this.noChores() ? <Empty /> : this.renderContainer()}
      </div>

    )
  }
}

function msp(state){
  return{
    user: state.user,
    chores: state.chores,
    userChores: state.userChores,
    available: state.available
  }
}

function mdp(dispatch){
  return{}
}

export default connect(msp, mdp)(UserContainer);
