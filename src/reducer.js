const defaultState = {
  user: null,
  username: null,
  password: null,
  signupForm: false,
  userPage: false,
  addFormPage: false,
  chores: [],
  roommates: [],
  userChores: [],
  likes: 0
}

function reducer(prevState=defaultState, action){
  switch(action.type){
    case "LIKE":
      return {...prevState, likes: prevState.likes + 1}
    case "DISLIKE":
      return {...prevState, likes: prevState.likes - 1}
    case "SET_CHORES":
      return {...prevState, chores: action.payload}
    case "ADD_TO_CHORES":
      return {...prevState, chores: [...prevState.chores, action.payload]}
    case "UPDATE_CHORES":
      return {
        ...prevState,
        chores: prevState.chores.filter(chore => {
          return chore.id !== action.payload.id
        })
      }
    case "USER_INPUT":
      return {...prevState, username: action.payload}
    case "PASSWORD_INPUT":
      return {...prevState, password: action.payload}
    case "LOGIN":
      return {...prevState, user: action.payload}
    case "AUTO_LOGIN":
      console.log(action.payload)
      return {...prevState, user: action.payload}
    case "LOGOUT":
      return {...prevState, user: null, userPage: false, userChores: []}
    case "SIGN_UP":
      return {...prevState, signupForm: !prevState.signupForm, }
    case "ADD_FORM":
      return {...prevState, addFormPage: !prevState.addFormPage}
    case "USER_PAGE":
      return {...prevState, userPage: !prevState.userPage}
    case "UPDATE_USER_CHORES":
      return {...prevState, userChores: [...prevState.userChores, action.payload]}
    default:
      return prevState
  }



}

export default reducer
