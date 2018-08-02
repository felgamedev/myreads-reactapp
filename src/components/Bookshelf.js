import React from "react";
import Book from "./Book";

const Bookshelf = ({shelfName, books, onUpdateBook, openDetailPanel}) => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                onUpdateBook={onUpdateBook}
                openDetailPanel={openDetailPanel}
              />
            ))}
          </ol>
        </div>
      </div>
    );
}

export default Bookshelf;
