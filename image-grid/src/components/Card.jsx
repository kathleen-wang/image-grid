import React from 'react'

export default function Card(props) {
  const { name, path, id } = props.info
  return (
    <div className="card" id={id}>
      <div className="imgDiv" onClick={props.handleClick} >
        <img src={path}></img>
      </div>
      <p>{name}</p>
    </div>
  )
}