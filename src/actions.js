//Action creators

function like(){
  return{type: "LIKE"}
}

function dislike(){
  return{type:"DISLIKE"}
}

function setChores(chores){
  return {type: "SET_CHORES", payload: chores}
}

function setAvailable(chores){
  return {type: "AVAILABLE", payload: chores}
}

function setRoommates(roommates){
  return {type: "SET_ROOMMATES", payload: roommates}
}

function usernameInput(text){
  return {type: "USER_INPUT", payload: text}
}

function passwordInput(text){
  return {type: "PASSWORD_INPUT", payload: text}
}

function login(user){
  localStorage.userId = user.id
  return {type: "LOGIN", payload: user}
}

function home(){
  return {type: "HOME"}
}

function logout(){
  localStorage.removeItem("userId")
  return {type: "LOGOUT"}
}

function signup(){
  return {type: "SIGN_UP"}
}

function userPage(){
  return {type: "USER_PAGE"}
}

function roommatePage(roommate){
  return {type: "ROOMMATE_PAGE", payload: roommate}
}

function addForm(){
  return {type: "ADD_FORM"}
}

function showCalendar(){
  return {type: "CALENDAR"}
}

function showChoreView(chore){
  return {type:"CHORE_VIEW", payload: chore}
}

function showEditChoreForm(chore){
  console.log("EDIT VIEW!")
  return {type:"EDIT_CHORE_VIEW", payload: chore}
}

function editChore(chore){
  return function(dispatch){
    fetch(`http://localhost:3000/chores/${chore.id}/edit`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(chore)
  })
    .then(res=>res.json())
    .then(editedChore=>{
      dispatch({type: "EDIT_AND_UPDATE", payload: editedChore})
    })
  }
}

// function editChore(chore){
//   return function(dispatch){
//     fetch(`http://localhost:3000/chores/${chore.id}`, {
//       method: "PATCH"
//     })
//   }
// }

function autoLogin(){
  return function(dispatch){
      fetch('http://localhost:3000/auto_login', {
        method: "POST",
        headers: {"Authorization": localStorage.userId}
      })
        .then(res=>res.json())
        .then(user => {
          dispatch({type: "AUTO_LOGIN", payload: user})
        })
  }
}

function postUser(username, password){
  return function(dispatch){
    return fetch('http://localhost:3000/signup', {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({username: username, password: password})
      }).then(response => response.json())
  }

}

function postClaim(user, chore){
  return function(dispatch){
    return fetch('http://localhost:3000/claims',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              user_id: user.id, chore_id: chore.id
            })
        })
          .then(
            fetch(`http://localhost:3000/chores/${chore.id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                claimed: true
              })
            })
              .then(res=> res.json())
              .then(chore => {
                console.log("%cTHIS IS THE CHORE AFTER IT HAS BEEN CLAIMOED", "color:red; font-size:30px", chore)
                dispatch({type: "UPDATE_CHORES", payload: chore})
              })
          )


  }
}

// function toggleClaimed(chore){
//   return function(dispatch){
//     fetch(`http://localhost:3000/chores/${chore.id}`,{
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         claimed: true
//       })
//     })
//       .then(res=> res.json())
//       .then(chore => {
//         return {type: "UPDATE_CHORES", payload: chore}
//       })
//   }
// }

function postChore(chore){
  return function(dispatch){
    fetch('http://localhost:3000/chores', {
    	method: "POST",
    	headers: {
    		"Content-Type": "application/json"
    	},
    	body: JSON.stringify({chore})
    })
      .then(res=> res.json())
      .then(newChore => {
        dispatch({type: "ADD_TO_CHORES", payload: newChore})
      }
    )

  }
}

function addToChores(chore){
  return {type: "ADD_TO_CHORES", payload: chore}
}

// name: "Test Chore",
// room: "Basement",
// duedate: null,
// completed: false,
// claimed: false

function updateChores(chore){
  console.log("%cHERE BE A CHORE", "color:pink; font-size:30px", chore)

  return {type: "UPDATE_CHORES", payload: chore}
}

function updateUserChores(userId){
  return function(dispatch){
    fetch(`http://localhost:3000/users/${userId}`)
      .then(res=>res.json())
      .then(user => {
        dispatch({type: "UPDATE_USER_CHORES", payload: user.chores})
      })
  }
}

function addToUserChores(chore){
  return {type:"ADD_TO_USER_CHORES", payload: chore}
}

function completeChore(chore){
  return function(dispatch){
    fetch(`http://localhost:3000/chores/${chore.id}/complete`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({completed: true})
    })
      .then(res=>res.json())
      .then(chore => {
        console.log("THIS CHORE IS DONEZO", chore)
        dispatch({type: "COMPLETE", payload: chore})
      })
  }
}

function deleteChore(chore){
  return function(dispatch){
    fetch(`http://localhost:3000/chores/${chore.id}`, {
	     method: "DELETE"
    })
      .then(res=>res.json())
      .then(deletedChore => {
        console.log("DELETE DELETE", deletedChore)
        dispatch({type:"DELETE", payload: deletedChore})
      })
  }
}



function thunkAction(argsFromComponent){
  return function(dispatch){

  }
}





export {
  like,
  dislike,
  setChores,
  setAvailable,
  setRoommates,
  usernameInput,
  passwordInput,
  login,
  autoLogin,
  home,
  logout,
  signup,
  postUser,
  postClaim,
  postChore,
  addToChores,
  // toggleClaimed,
  updateChores,
  updateUserChores,
  addToUserChores,
  userPage,
  roommatePage,
  addForm,
  completeChore,
  deleteChore,
  showCalendar,
  showChoreView,
  showEditChoreForm,
  editChore
}
