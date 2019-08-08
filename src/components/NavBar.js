import React from 'react'

class NavBar extends React.Component{
  render(){
    return(
      <div className="ui navbar">
        <div className="left">
          Left!
        </div>
        <div className="right">
          This is the right section of the Nav Bar!
        </div>
        <div className="middle">
          This is the middle section!
        </div>
    </div>
    )
  }
}

export default NavBar
