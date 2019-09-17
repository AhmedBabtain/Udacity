import React from 'react'
import './App.css'
import * as BooksAPI from './api/BooksAPI'
import Bookcase from './components/Bookcase';
import Search from './components/Search';
import { BrowserRouter as Router, Route } from "react-router-dom";


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
    books: [],
    searchResults: []

  }

  updateBookShelf = (book,shelf) => {
    //check for null
    console.log('book.title: '+book.title+'move shelf to: '+book.shelf)
    BooksAPI.update(book,shelf);
    
    this.setState((prevState) => {
      book.shelf = shelf;
      return ({
        books:prevState.books
        .filter((b) => b.id !== book.id)
        .concat([book])
      })    
    })
  }

  searchForBook = (searchTerm) => {
    BooksAPI.search(searchTerm).then((result) => {
      this.setState((prevState) => {
        return ({
          searchResults: result
        })
      },console.log(this.state.searchResults));
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((data) => {
      console.log('data',data);
      this.setState((prevState) => ({
        books: data
      }),console.log('books',this.state.books));
    }).catch((error) => (console.log('[error]: ',error)));
  }

  render() {
    return (
      <Router>
        <div className="app"> 

        <Route exact path='/search' component={() => 
          <Search 
            onSearch= {this.searchForBook} 
            searchResults= {this.state.searchResults} 
            onChangeBookShelf= { this.updateBookShelf }/>
        }></Route>

        <Route exact path='/' component={() => 
          <Bookcase 
          books = {this.state.books} 
          shelivesTypes = { shelivesTypes }
          onChangeBookShelf= { this.updateBookShelf } />
        }></Route>
         </div>
      </Router>
    
    )
  }
}

export default BooksApp
