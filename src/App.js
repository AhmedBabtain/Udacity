import React from 'react'
import './App.css'
import * as BooksAPI from './api/BooksAPI'
import Bookcase from './components/Bookcase';
import Search from './components/Search';
import { BrowserRouter as Router, Route } from "react-router-dom";


const shelivesTypes = ["currentlyReading", "wantToRead", "read"];

class BooksApp extends React.Component {
  
  state = {
    books: [],
    searchResults: [],
    searchTerm:''
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

  updateSearchTerm = (searchTerm) => {
    console.log('updateSearchTerm',searchTerm)
    this.setState((prevState) => ({searchTerm:searchTerm}))
  }

  searchForBook = (query) => {
      BooksAPI.search(query).then((result) => {
        this.setState((prevState) => {
          //
          let stateFullResult = result;
          if (this.state.books && stateFullResult && !stateFullResult.error) {
            stateFullResult = result
              .map((abook) => this.state.books
              .find((myBook) => myBook.id === abook.id) || abook)
          }
          return ({
            searchResults: stateFullResult,
            searchTerm: query
          })
        });
      }).catch((e) => console.log(e))
   
  }

  componentDidMount(){
    BooksAPI.getAll().then((data) => {
      this.setState((prevState) => ({
        books: data
      }));
    }).catch((error) => (console.log('[error]: ',error)));
  }

  render() {
    return (
      <Router>
        <div className="app"> 
        
        <Route exact path='/search' component={() => 
          <Search 
            onSearch= {this.searchForBook}
            searchKeyWord = {this.state.searchTerm}
            searchResults= {this.state.searchResults}
            searchTerm = { this.state.searchTerm }
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
