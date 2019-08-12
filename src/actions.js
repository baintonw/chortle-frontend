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
  return {type: "LOGIN", payload: user}
}

function logout(){
  return {type: "LOGOUT"}
}

function signup(){
  return {type: "SIGN_UP"}
}

function userPage(){
  return {type: "USER_PAGE"}
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

function updateChores(chore){
  return {type: "UPDATE_CHORES", payload: chore}
}

function updateUserChores(userChores){
  return {type: "UPDATE_USER_CHORES", payload: userChores}
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
  logout,
  signup,
  postUser,
  postClaim,
  toggleClaimed,
  updateChores,
  updateUserChores,
  userPage
}
