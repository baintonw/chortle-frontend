const defaultState = {
  user: null,
  username: null,
  password: null,
  signupForm: false,
  userPage: false,
  addFormPage: false,
  roommateState: null,
  calendar: false,
  choreView: null,
  editChoreView: null,
  chores: [],
  roommates: [],
  available: [],
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
    case "AVAILABLE":
      return {...prevState, available: action.payload}
    case "SET_ROOMMATES":
      return {...prevState, roommates: action.payload}
    case "ADD_TO_CHORES":
      return {...prevState, chores: [...prevState.chores, action.payload],
      available: [...prevState.chores, action.payload]}
    case "UPDATE_CHORES":
      console.log("%cAND THERE BE A CHORE", "color: green; font-size:60px", action.payload)
      return {
        ...prevState,
        available: prevState.available.filter(chore => {
          return chore.id !== action.payload.id
        }),
        userChores: prevState.userChores.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
        }),
        chores: prevState.chores.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
        })
      }
    case "USER_INPUT":
      return {...prevState, username: action.payload}
    case "PASSWORD_INPUT":
      return {...prevState, password: action.payload}
    case "LOGIN":
      return {...prevState, user: action.payload}
    case "AUTO_LOGIN":
      return {...prevState, user: action.payload}
    case "HOME":
      return {...prevState, signupForm: false,
        userPage: false,
        addFormPage: false,
        roommateState: null,
        calendar: false,
        choreView: false,
        editChoreView: false
      }
    case "LOGOUT":
      return {...prevState, user: null,
         userPage: false,
        roommateState: null,
        signupForm: false,
        addFormPage: false,
        calendar: false,
        choreView: false,
        editChoreView: null,
        userChores: []}
    case "SIGN_UP":
      return {...prevState, signupForm: !prevState.signupForm, }
    case "ADD_FORM":
      return {...prevState, addFormPage: !prevState.addFormPage, signupForm: false,
      userPage: false,
      roommateState: null,
      calendar: false,
      choreView: false,
      editChoreView: false}
    case "USER_PAGE":
      return {...prevState, userPage: !prevState.userPage,
        roommateState: null}
    case "ROOMMATE_PAGE":
        return {...prevState, roommateState: action.payload, userPage: false, addFormPage: false, signupForm: false}
    case "UPDATE_USER_CHORES":
      return {...prevState, userChores: action.payload}
    case "COMPLETE":
      console.log("PAyloaaaad", action.payload)
      return {...prevState,
        userChores: prevState.userChores.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
        }),
        chores: prevState.chores.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
        })
      }
    case "DELETE":
      return {...prevState,
        userChores: prevState.userChores.filter(chore => {
          return chore.id !== action.payload.id
        }),
        available: prevState.available.filter(chore => {
          return chore.id !== action.payload.id
        }),
        chores: prevState.chores.filter(chore => {
          return chore.id !== action.payload.id
        })
      }
    case "ADD_TO_USER_CHORES":
      return {...prevState, userChores: [...prevState.userChores, action.payload]}
    case "CALENDAR":
      return {...prevState, calendar: true,
          signupForm: false,
          userPage: false,
          addFormPage: false,
          roommateState: null,
          editChoreView: false}
    case "CHORE_VIEW":
      return {...prevState, choreView: action.payload,
            editChoreView: false,
            calendar: false,
            signupForm: false,
            userPage: false,
            addFormPage: false,
            roommateState: null
      }
    case "EDIT_CHORE_VIEW":
      return {...prevState, editChoreView: action.payload,
              choreView: null,
              calendar: false,
              signupForm: false,
              userPage: false,
              addFormPage: false,
              roommateState: null}
    case "EDIT_AND_UPDATE":
      return {...prevState,
        chores: prevState.chores.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
      }),
        available: prevState.available.map(chore => {
          if(chore.id === action.payload.id){
            return action.payload
          } else {
            return chore
          }
      }),
        editChoreView: null
    }
    default:
      return prevState
  }
  // chores: prevState.chores.filter(chore => {
  //   return chore.id !== action.payload.id
  // })


}

export default reducer
