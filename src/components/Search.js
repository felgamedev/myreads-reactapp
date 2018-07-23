import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
  state = {
    query: ''
  }

  onUpdateQuery = (value) => {
    this.setState({
      query: value
    })

    this.props.onSearch(this.state.query)
  }

  onUpdateBook = (book, shelf) => {this.props.onUpdateBook(book, shelf)}

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}

            <input value={this.state.query} type="text" onChange={(event) => this.onUpdateQuery(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {console.log(this.props.searchQueryResults)}
            {this.props.searchQueryResults[0] !== "empty query" && this.props.searchQueryResults.map(book => (<Book book={book} onUpdateBook={this.onUpdateBook}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
