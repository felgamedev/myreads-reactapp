import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookcase from './components/Bookcase'

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
        <Route exact path="/" render={props => (
          <Bookcase bookShelves={bookshelves} allBooks={allBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
