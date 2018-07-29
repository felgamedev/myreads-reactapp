import React, { Component } from "react";

class Book extends Component {
  onChangeShelf = e => {
    console.log("Click!");
    this.props.onUpdateBook(this.props.book, e.target.value);
  };

  openDetailPanel = e => {
    this.props.openDetailPanel(this.props.book);
  };

  render() {
    let { book } = this.props;
    let { shelf } = book;
    return (
      <li>
        <div className="book" key={book.id}>
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${book.imageLinks != null &&
                  book.imageLinks.thumbnail})`
              }}
              onClick={this.openDetailPanel}
            />
            <div className="book-shelf-changer">
              {/* Only present options that are needed, leave out current shelf */}
              <select onChange={this.onChangeShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option
                  value="currentlyReading"
                  selected={shelf === "currentlyReading"}
                >
                  Currently Reading
                </option>
                <option value="wantToRead" selected={shelf === "wantToRead"}>
                  Want to Read
                </option>
                <option value="read" selected={shelf === "read"}>
                  Read
                </option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title" onClick={this.openDetailPanel}>
            {book.title}
          </div>
          <div className="book-authors">
            {book.authors != null && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
