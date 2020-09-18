import React from 'react'
import './Backdrop.css'
function Backdrop() {
  render(){
    return(
      <div
        className="backdrop"
        onClick={this.props.close}
      />
    )
  }
}
export default Backdrop;