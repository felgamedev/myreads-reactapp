import React from 'react'
import { Route } from 'react-router-dom'
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
    this.getAllBooks()
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)

    let newBookcase = this.state.allBooks.filter(oldBook => oldBook.title !== book.title)
    book.shelf = shelf
    newBookcase.push(book)

    this.setState({
      allBooks: newBookcase
    })
  }

  getAllBooks(){
    BooksAPI.getAll()
    .then(allBooks => this.saveToState(allBooks))
  }

  saveToState(jsonData){
    let array = []
    for(let book in jsonData){
      array.push(jsonData[book])
    }

    this.setState({
      allBooks: array
    })
  }

  render() {
    let { bookshelves, allBooks } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={props => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {allBooks !== null && (
              <div className="list-books-content">
                {bookshelves.map(bshelf => (
                  <Bookshelf key={bshelf.shelf} shelf={bshelf.shelf} shelfName={bshelf.displayName} books={allBooks.filter(book => book.shelf === bshelf.shelf)} onUpdateBook={this.updateBook}/>
                ))}
              </div>)
            }
          </div>)
        }/>
      </div>
    )
  }
}

export default BooksApp
