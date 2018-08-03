import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./components/Bookshelf";
import Search from "./components/Search";
import DetailModal from "./components/DetailModal";

class BooksApp extends React.Component {
  state = {
    bookshelves: [
      { shelf: "currentlyReading", displayName: "Currently Reading" },
      { shelf: "wantToRead", displayName: "Want to read" },
      { shelf: "read", displayName: "Read" }
    ],
    allBooks: [],
    searchQueryResults: [],
    bookDetail: null
  };

  componentWillMount() {
    this.getAllBooks();
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let newBookcase = this.state.allBooks.filter(
      oldBook => oldBook.title !== book.title
    );
    book.shelf = shelf;
    newBookcase.push(book);

    this.setState({
      allBooks: newBookcase
    });
  };

  getAllBooks() {
    BooksAPI.getAll().then(allBooks => this.saveToState(this.convertToBooksArray(allBooks), "allBooks"));
  }

  saveToState(array, stateVariable) {
    if (stateVariable === "allBooks") {
      this.setState({
        allBooks: array
      });
    } else if (stateVariable === "searchQuery") {
      this.setState({
        searchQueryResults: array
      });
    }
  }

  convertToBooksArray(jsonData){
    let array = [];
    for (let book in jsonData) {
      array.push(jsonData[book]);
    }
    return array
  }

  searchForBooks(query) {
    let {allBooks} = this.state

    BooksAPI.search(query)
    .then(searchQueryResults => {
      // convert to iterable list
      let books = this.convertToBooksArray(searchQueryResults)

      let combinedSearchResults = books.map(book => {
        // Add relevant shelf data to items found in the search results that appear in your library
        for (let i = 0; i < allBooks.length; i++) {
          if (book.id === allBooks[i].id) {
            book.shelf = allBooks[i].shelf;
          }
        }
        return book;
      });
      this.saveToState(combinedSearchResults, "searchQuery")
      return true
    })
  }

  onSearch = query => {
    if (query === "") {
      this.setState({
        searchQueryResults: []
      });
    } else {
      this.searchForBooks(query);
    }
  };

  openDetailPanel = book => {
    this.setState({
      bookDetail: book
    });
  };

  closeDetailPanel = () => {
    this.setState({
      bookDetail: null
    });
  };

  render() {
    let { bookshelves, allBooks, searchQueryResults, bookDetail } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={props => (
            <div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {allBooks !== null && (
                <div className="list-books-content">
                  {bookshelves.map(bshelf => (
                    <Bookshelf
                      key={bshelf.shelf}
                      shelf={bshelf.shelf}
                      shelfName={bshelf.displayName}
                      books={allBooks.filter(
                        book => book.shelf === bshelf.shelf
                      )}
                      onUpdateBook={this.updateBook}
                      openDetailPanel={this.openDetailPanel}
                    />
                  ))}
                  {bookDetail && (
                    <DetailModal
                      book={this.state.bookDetail}
                      closeDetailPanel={this.closeDetailPanel}
                      onChangeShelf={this.updateBook}
                    />
                  )}
                </div>
              )}
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/search/"
          render={props => (
            <div>
              <Search
                searchQueryResults={searchQueryResults}
                onSearch={this.onSearch}
                onUpdateBook={this.updateBook}
                openDetailPanel={this.openDetailPanel}
                allBooks={this.state.allBooks}
              />
              {bookDetail && (
                <DetailModal
                  book={this.state.bookDetail}
                  closeDetailPanel={this.closeDetailPanel}
                  onChangeShelf={this.updateBook}
                />
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
