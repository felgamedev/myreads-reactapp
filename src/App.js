import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'

class BooksApp extends React.Component {
  state = {
    bookshelves: ["currentlyReading", "wantToRead", "read"],
    allBooks: []
  }

  componentWillMount(){
    BooksAPI.getAll()
    .then(allBooks => {
      this.setState({allBooks})
    })
  }

  render() {
    let { bookshelves, allBooks } = this.state
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {allBooks !== null && (
          <div className="list-books-content">
            {bookshelves.map(bshelf => (
            <Bookshelf key={bshelf} books={allBooks.filter(book => book.shelf === bshelf)}/>
          ))}
          </div>
        )}

      </div>
    )
  }
}

export default BooksApp
