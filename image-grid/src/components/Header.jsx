import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
    const { selected, handleDelete, handleCancel } = props
    return (
        <>
            <div class="header">
                <button className="cancel" onClick={handleCancel} > Cancel </button>
                <p> {selected} Documents Selected </p>
            </div>
            <div className="delete">
                <button onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
            </div>
        </>
    )
}