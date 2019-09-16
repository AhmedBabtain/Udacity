import React from 'react'
import './App.css'
import * as BooksAPI from './api/BooksAPI'
import Bookcase from './components/Bookcase';
import Search from './components/Search';


const shelivesTypes = ["wantToRead", "currentlyReading", "read"]; 
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []

  }

  updateBookShelf = (book,shelf) => {
    //check for null
    console.log('book.title: '+book.title+'move shelf to: '+book.shelf)
    BooksAPI.update(book,shelf);
    this.setState((prevState) => {
      book.shelf = shelf;
      return ({
        books:prevState.books.filter((b) => b.id !== book.id).concat([book])
      })
      
    })
    // BooksAPI.getAll().then((data) => {
    //   this.setState((prevState) => ({
    //     books: data
    //   }));
    // });
  }

  componentDidMount(){
    BooksAPI.getAll().then((data) => {
      this.setState((prevState) => ({
        books: data
      }));
    });
  }

  render() {
    return (
      <div className="app"> 
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <Bookcase 
            books = {this.state.books} 
            shelivesTypes = { shelivesTypes }
            onChangeBookShelf= { this.updateBookShelf }></Bookcase>
        )}
      </div>
    )
  }
}

export default BooksApp
