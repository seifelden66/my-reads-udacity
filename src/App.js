import React from 'react'
import  {useState } from 'react'
import  { useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link 
} from 'react-router-dom'
import TheHeader from './UiHeader'
import * as BooksAPI from './BooksAPI'
import './App.css'
import TheShelves from './TheShelves'
import TheBook from './BookFeatures'




const BooksApp = () => {


  const [theBooks, setTheBooks] = useState([])
  const [idBooksMap, setIdBooksMap] = useState(new Map());
  const [bookSearch, setBookSearch]= useState([])
  const [booksDB, setbooksDB] = useState("");
  const [addBooks, setAddBooks] = useState([])




 

  useEffect(() => {
    let working = true
    if (booksDB) {
      BooksAPI.search(booksDB).then(data => {
        if(data.error){
          setBookSearch([])
        }
        else{
          if(working){
            setBookSearch(data)
          }
        }
      })
    }
    return()=>{
      working = false
      setBookSearch([])
    }
  
  }, [booksDB])

  
  useEffect(() => {
    
    BooksAPI.getAll()
      .then(data => {
        setTheBooks(data)
        setIdBooksMap(createBooksMap(data))
      }
      );
  }, [])
  
 useEffect(()=>{
  const srchbok = bookSearch.map((bookItem)=>{
    if(idBooksMap.has(bookItem.id)){
      return idBooksMap.get(bookItem.id)
    }else{
      return bookItem
    }
  })
  setAddBooks(srchbok)

 }, [bookSearch])


  

  const createBooksMap = (theBooks) => {
    const bookMap = new Map();
    theBooks.map(item => bookMap.set(item.id, item));
    return bookMap;
  }
 

  const updateShelf = (book, newPlace) => {
    const updatedBooks = theBooks.map(bok => {
      if (bok.id === book.id) {
        book.shelf = newPlace;
        return book;
      }
      return bok;
    })

    if (!idBooksMap.has(book.id)) {
      book.shelf = newPlace;
      updatedBooks.push(book)
    }

    setTheBooks(updatedBooks);
    BooksAPI.update(book, newPlace)
  }
 

  return (
    <div className="app">
      <Router>

        <Routes>
        <Route path="/" element={
            <div className="list-books">
              <TheHeader />
              <div className="list-books-content">
                <TheShelves books={theBooks} updateShelf={updateShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button style={{ backgroundColor: "green" }}>insert a book</button>
                </Link>
              </div>
            </div>
          }>

          </Route>

          <Route path="/search" element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">

                  <input type="text" placeholder="Search by title or author" value={booksDB} onChange={(e) => setbooksDB(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {addBooks.map(bok => (
                    <li key={bok.id}>
                      <TheBook book={bok} changeShelf={updateShelf} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          }>
          </Route>
          
        </Routes>
      </Router>
    </div>
  )

}

export default BooksApp
