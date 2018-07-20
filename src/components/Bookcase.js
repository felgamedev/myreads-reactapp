import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

class Bookcase extends Component {

  render(){
    let {allBooks, bookShelves} = this.props
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {allBooks !== null && (
          <div className="list-books-content">
            {bookShelves.map(bshelf => (
            <Bookshelf key={bshelf.shelf} shelf={bshelf.shelf} shelfName={bshelf.displayName} books={allBooks.filter(book => book.shelf === bshelf.shelf) }/>
          ))}
          </div>
        )}
      </div>
    )
  }
}

export default Bookcase
