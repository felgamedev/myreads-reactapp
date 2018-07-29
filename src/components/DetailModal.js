import React, { Component } from "react";

class DetailModal extends Component {
  closeDetailPanel = e => {
    this.props.closeDetailPanel();
  };

  onChangeShelf = e => {
    this.props.onChangeShelf(this.props.book, e.target.value);
  };

  render() {
    let { book } = this.props;
    let { shelf } = book;
    return (
      <div>
        <div className="modal-overlay" onClick={this.closeDetailPanel} />
        <div className="modal">
          <span className="modal-close" onClick={this.closeDetailPanel}>
            x
          </span>
          <div className="modal-book-title">
            {book.title && <h2>{book.title}</h2>}
          </div>
          <div className="book-authors">
            Author{book.authors.length > 1 && "s"}:{" "}
            {book.authors && book.authors.join(", ")}
          </div>
          <div className="book-authors">
            Publisher: {book.publisher && book.publisher}{" "}
            {book.publishedDate && `(${book.publishedDate})`}
          </div>

          {book.description && (
            <div>
              <h2>Description</h2>
              <p className="modal-book-description">{book.description}</p>
            </div>
          )}

          <div className="book-shelf-changer">
            {/* Only present options that are needed, leave out current shelf */}
            <select onChange={this.onChangeShelf}>
              <option value="move" disabled selected>
                Move to...
              </option>
              <option
                value="currentlyReading"
                disabled={shelf === "currentlyReading"}
              >
                Currently Reading
              </option>
              <option value="wantToRead" disabled={shelf === "wantToRead"}>
                Want to Read
              </option>
              <option value="read" disabled={shelf === "read"}>
                Read
              </option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailModal;
