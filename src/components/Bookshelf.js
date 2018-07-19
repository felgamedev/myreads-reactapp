import React, { Component } from 'react'

class Bookshelf extends Component {

  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <p>I have {this.props.books.length} books</p>
      </div>
    )
  }
}

export default Bookshelf
