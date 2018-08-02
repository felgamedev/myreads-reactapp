import React from "react";

const DetailModal = ({book, closeDetailPanel, onChangeShelf}) => {
    return (
      <div>
        <div className="modal-overlay" onClick={(e) => closeDetailPanel()} />
        <div className="modal">
          <span className="modal-close" onClick={(e) => closeDetailPanel()}>
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
            <select onChange={(e) => onChangeShelf(book, e.target.value)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option
                value="currentlyReading"
                selected={book.shelf === "currentlyReading"}
              >
                Currently Reading
              </option>
              <option value="wantToRead" selected={book.shelf === "wantToRead"}>
                Want to Read
              </option>
              <option value="read" selected={book.shelf === "read"}>
                Read
              </option>
              <option value="none" selected={book.shelf === undefined || book.shelf === "none" || book.shelf === ""}>None</option>
            </select>
          </div>
        </div>
      </div>
    )
}

export default DetailModal;
