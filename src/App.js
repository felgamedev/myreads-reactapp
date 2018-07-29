import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'
import Search from './components/Search'
import DetailModal from './components/DetailModal'

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      {"shelf": "currentlyReading", "displayName":"Currently Reading"},
      {"shelf": "wantToRead", "displayName":"Want to read"},
      {"shelf": "read", "displayName":"Read"}
    ],
    allBooks: [],
    searchQueryResults: [],
    bookDetail: null
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
    .then(allBooks => this.saveToState(allBooks, "allBooks"))
  }

  saveToState(jsonData, stateVariable){
    let array = []
    for(let book in jsonData){
      array.push(jsonData[book])
    }
    if(stateVariable === "allBooks"){
      this.setState({
        allBooks: array
      })
    } else if(stateVariable === "searchQuery"){
      this.setState({
        searchQueryResults: array
      })
    }
  }

  searchForBooks(query){
    BooksAPI.search(query)
    .then(searchQueryResults => this.saveToState(searchQueryResults, "searchQuery"))
  }

  onSearch = (query) => {
    if(query !== "")
      this.searchForBooks(query)
    else
      this.setState({
        searchQueryResults: []
      })
  }

  openDetailPanel = (book) => {
    this.setState({
      bookDetail: book
    })
  }

  closeDetailPanel = () => {
    this.setState({
      bookDetail: null
    })
  }

  render() {
    let { bookshelves, allBooks, searchQueryResults, bookDetail } = this.state
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
                  <Bookshelf key={bshelf.shelf} shelf={bshelf.shelf} shelfName={bshelf.displayName} books={allBooks.filter(book => book.shelf === bshelf.shelf)} onUpdateBook={this.updateBook} openDetailPanel={this.openDetailPanel}/>
                ))}
                {bookDetail && (<DetailModal book={this.state.bookDetail} closeDetailPanel={this.closeDetailPanel} onChangeShelf={this.updateBook}/>)}
              </div>)
            }
          </div>)
        }/>

        <Route exact path="/search/" render={props => (
          <div>
            <Search searchQueryResults={searchQueryResults} onSearch={this.onSearch} onUpdateBook={this.updateBook} openDetailPanel={this.openDetailPanel}/>
            {bookDetail && (<DetailModal book={this.state.bookDetail} closeDetailPanel={this.closeDetailPanel} onChangeShelf={this.updateBook}/>)}
          </div>
        )} />

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
