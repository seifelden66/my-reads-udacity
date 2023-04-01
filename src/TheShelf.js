import React from 'react';
import TheBook from './BookFeatures';


const TheShelf = ({ books, title, updateShelf }) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(bookItem => (
                        <li key={bookItem.id}>
                            <TheBook book={bookItem} changeShelf={updateShelf}/>
                        </li>
                    ))}

                </ol>
            </div>
        </div>
    )
}

export default TheShelf;