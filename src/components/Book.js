import React from "react";

const Book = ({book, openDetailPanel, onUpdateBook}) => {
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
              onClick={(e) => openDetailPanel(book)}
            />
            <div className="book-shelf-changer">
              {/* Only present options that are needed, leave out current shelf */}
              <select onChange={(e) => onUpdateBook(book, e.target.value)}>
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
          <div className="book-title" onClick={(e) => openDetailPanel(book)}>
            {book.title}
          </div>
          <div className="book-authors">
            {book.authors != null && book.authors.join(", ")}
          </div>
        </div>
      </li>
    )
}

export default Book;
