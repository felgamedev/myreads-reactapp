import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

  onChangeShelf = (book, shelf) => {
    this.props.onUpdateBook(book, shelf)
  }

  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(book => (
            <Book key={book.id} book={book} onChangeShelf={this.onChangeShelf}/>
            ))}
            </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
