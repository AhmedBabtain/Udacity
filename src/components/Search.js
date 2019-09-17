import React, { Component } from 'react'
import Book from './Book'
import { Redirect } from "react-router-dom";
// add propsTypes

class Search extends Component {
    state = {
        toMainPage: false
    }
    componentDidMount() {
    }

    search = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
            this.props.onSearch(event.target.value);
        }
    }

    goToMainPage = () => this.setState((prevState) => ({ toMainPage: true }));

    render() {
        if (this.state.toMainPage === true){
            return (<Redirect to='/' />)
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.goToMainPage()}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" onKeyUp={(event) => this.search(event)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchResults && this.props.searchResults.length !== 0 && this.props.searchResults.map((book, key) => (
                            <li key={key}>
                                <Book book={book} onChangeBookShelf={this.props.onChangeBookShelf} onChangeBookShelf = { this.props.onChangeBookShelf }/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search