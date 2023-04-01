import React from 'react';



const TheBook = ({ book, changeShelf }) => {
    const notFound = console.log("not found")

    const imageCover = book.imageLinks && book.imageLinks.thumbnail? book.imageLinks.thumbnail: notFound
    const title = book.title ? book.title : 'No title available';
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageCover})` }}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) => changeShelf(book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title" key={title}>{title}</div>
            <div className="book-authors" key={book.authors}>{book.authors}</div>
        </div>
    )

}

export default TheBook;