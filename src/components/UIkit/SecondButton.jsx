import React from 'react'

const SecondButton = (props) => {
  return (
    // <div className="second-button">
      <div className="second-button" onClick={props.onClick}>{props.label}</div>
    // </div>
  )
}

export default SecondButton