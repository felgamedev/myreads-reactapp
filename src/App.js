import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    // Test that the API is working and preview currently saved books
    BooksAPI.getAll().then(response => console.log(response))

    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
      </div>
    )
  }
}

export default BooksApp
