import React, { Component } from 'react'
import url from '../url'

import axios from 'axios'
import Card from './Card'
import Header from './Header'


export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      selected: 0,
      cards: [],
      selectedCardIds: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  async componentDidMount() {

    const resp = await axios.get(`${url}`)
    this.setState({
      data: resp.data,
      isLoaded: true
    })
    const { data } = this.state
    // now get all of the image elements to be displayed
    let imgCards = data.map((info) => {
      return <Card key={info.id} info={info} handleClick={this.handleClick} />
    })

    this.setState({
      cards: imgCards
    })
  }

  handleClick(e) {
    //add "select" or "notSelected" classes for images whenever clicked
    //increment or decrement "selected documents" count 
    //add the ids of the selected divs to state which will be used in the delete function 
 

    let className = e.currentTarget.className
    const { selected, selectedCardIds } = this.state

    const current = e.currentTarget.parentElement.id

    if (className !== "selected") {
      e.currentTarget.className = "selected"

      this.setState((prevState) => {
        return {
          selected: prevState.selected += 1,
          selectedCardIds: [...prevState.selectedCardIds, current]
        }
      })
    }

    else {
      e.currentTarget.className = "notSelected"

      //removing the deselected card id from the selected card id array
      this.setState((prevState) => {
        return {
          selected: prevState.selected -= 1,
          selectedCardIds: this.state.selectedCardIds.filter((card) => card !== current)
        }
      })
    }
  }

  handleDelete() {
    // all of the cards with "selected" classname should be removed from cards array 
    // also set the "selected" state back to 0 
    
    this.setState({
      cards: this.state.cards.filter((card) =>
        !this.state.selectedCardIds.includes(card.key)
      ),
      selected: 0
    })
  }

  handleCancel() {
    // all of the cards with "selected" classname should change to "notSelected"
    // also set the "selected" state back to 0 

    const imgs = document.getElementsByClassName('card')

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].children[0].className = "notSelected"
    }

    this.setState({
      selected: 0
    })
  }

  render() {

    const { cards, isLoaded, selected, selectedCardIds } = this.state

    const { handleDelete, handleCancel } = this
    if (!isLoaded) return <h1>Loading...</h1>

    return (
      <div className="container">
        <Header
          selected={selected}
          handleDelete={handleDelete}
          handleCancel={this.handleCancel}
        />
        <div className="imgGrid">
          {cards}
        </div>
      </div>
    )
  }
}