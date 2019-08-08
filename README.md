This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

Will's front end
//////////////
REDUX TEMPLATE
//////////////

import { createStore } from 'redux'

//REDUCER is called once initially to set up default state
const defaultState = {
  user: "",
  likes: 0,
  on: false,
  text: "",
  list: []
}
function reducer(prevState=defaultState, action){
  switch(action.type){
    case "LIKE":
      return {...prevState, likes: prevState.likes + 1}
    case "DISLIKE":
      return {...prevState, likes: prevState.likes - 1}
    case "TOGGLE":
      return {...prevState, on: !prevState.on}
    case "HANDLE_CHANGE":
      return {...prevState, text: action.payload}
    case "PRINT":
      return {...prevState, list: [...prevState.list, prevState.text]}
    default:
      return prevState
  }

}

const store = createStore(reducer)

console.log("BEFORE", store.getState())

store.dispatch({type: "LIKE"})//SET state
store.dispatch({type: "LIKE"})//SET state

store.dispatch({type: "DISLIKE"})
store.dispatch({type: "TOGGLE"})
store.dispatch({type: "HANDLE_CHANGE", payload: "I'm a piece of captured text !"})
store.dispatch({type: "PRINT"})


console.log("AFTER", store.getState())

////////
REDUX TEMPLATE end
/////////

Login Form:

CHORTLE
<form action="action_page.php">
    <div class="container">
      <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required />
      <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />
      <button type="submit">Login</button>
    </div>
  <div class="container">
    <span class="psw"><a href="#">Not a member? Sign up</a></span>
  </div>
</form>
