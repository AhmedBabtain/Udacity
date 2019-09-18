import React, { Component } from 'react'
import Book from './Book'
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

class Search extends Component {
    state = {
        toMainPage: false,
        searchTerm: ''
    }

    getSearchTerm = () => {
        return this.getSearchTerm()
    }
    onChangeInputHandler = (event) => {
        let value = event.target.value;
        this.props.onSearch(value);
        // let value = event.target.value;
        // this.setState((prevState) => ({ searchTerm: value }));

        // if (event.key === "Enter")
        //     this.props.onSearch(value);
    }



    goToMainPage = () => this.setState((prevState) => ({ toMainPage: true }));

    render() {
        if (this.state.toMainPage === true) {
            return (<Redirect to='/' />)
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.goToMainPage()}>Close</button>
                    <div className="search-books-input-wrapper">
                        <DebounceInput  debounceTimeout={1000} onChange={(event) => this.onChangeInputHandler(event)} value={this.props.searchKeyWord} placeholder="Search by title or author" ></DebounceInput>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.searchKeyWord && <p>Your search keyword is {this.props.searchKeyWord}</p>}
                    <ol className="books-grid">
                        {this.props.searchResults && this.props.searchResults.length > 0 && this.props.searchResults.map((book, key) => (
                            <li key={key}>
                                <Book book={book} onChangeBookShelf={this.props.onChangeBookShelf} />
                            </li>
                        ))}
                        {(this.props.searchResults && this.props.searchResults.length === 0) &&
                            <li>No result found</li>
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search

Search.propTypes = {
    onSearch: PropTypes.func,
    searchKeyWord: PropTypes.string,
    searchResults: PropTypes.any,
    onChangeBookShelf: PropTypes.func
};
