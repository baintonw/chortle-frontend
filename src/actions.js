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

function addForm(){
  return {type: "ADD_FORM"}
}

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

  }
}

function toggleClaimed(chore){
  return function(dispatch){
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
  }
}

function postChore(chore){
  return function(dispatch){
    fetch('http://localhost:3000/chores', {
    	method: "POST",
    	headers: {
    		"Content-Type": "application/json"
    	},
    	body: JSON.stringify({chore})
    })
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



function thunkAction(argsFromComponent){
  return function(dispatch){

  }
}





export {
  like,
  dislike,
  setChores,
  usernameInput,
  passwordInput,
  login,
  autoLogin,
  logout,
  signup,
  postUser,
  postClaim,
  postChore,
  addToChores,
  toggleClaimed,
  updateChores,
  updateUserChores,
  userPage,
  addForm
}
