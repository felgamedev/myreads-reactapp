import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'

class BooksApp extends React.Component {
  state = {
    bookshelves: [ "read", "wantToRead", "currentlyReading"],
    allBooks: {}
  }

  componentWillMount(){
    BooksAPI.getAll()
    .then(allBooks => {
      this.setState({allBooks})
    })
  }

  render() {

    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf />
        </div>
      </div>
    )
  }
}

export default BooksApp
