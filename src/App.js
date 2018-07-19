import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      {"shelf": "currentlyReading", "displayName":"Currently Reading"},
      {"shelf": "wantToRead", "displayName":"Want to read"},
      {"shelf": "read", "displayName":"Read"}
    ],
    allBooks: []
  }

  componentWillMount(){
    let booksFromAPI = []
    BooksAPI.getAll()
    .then(allBooks => {
      for(let bookIndex in allBooks){
        booksFromAPI.push(allBooks[bookIndex])
      }
      this.setState({allBooks: booksFromAPI})
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
            <Bookshelf key={bshelf.shelf} shelf={bshelf.shelf} shelfName={bshelf.displayName} books={allBooks.filter(book => book.shelf === bshelf.shelf) }/>
          ))}
          </div>
        )}

      </div>
    )
  }
}

export default BooksApp
