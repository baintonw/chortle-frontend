const defaultState = {
  user: null,
  userInput: ""
}

function reducer(prevState=defaultState, action){
  switch(action.type){
    case "USER_INPUT":
      return {...prevState, userInput: action.payload}
    case "LOGIN":
      return {...prevState, user: prevState.userInput}
    default:
      return prevState
  }

}

export default reducer
