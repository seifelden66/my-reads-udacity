import TheShelf from './TheShelf';
import React from 'react';



const TheShelves = ({books, updateShelf}) => {

    const currentlyReading = books.filter((bookItem) => bookItem.shelf === "currentlyReading");
    const wantToRead = books.filter((bookItem) => bookItem.shelf === "wantToRead");
    const read = books.filter((bookItem) => bookItem.shelf === "read");

    return (
        <div>
            <TheShelf title="Currently Reading" books={currentlyReading} updateShelf={updateShelf}/>
            <TheShelf title="Want To Read" books={wantToRead} updateShelf={updateShelf}/>
            <TheShelf title="Read" books={read} updateShelf={updateShelf}/>
        </div>
    )

}

export default TheShelves;