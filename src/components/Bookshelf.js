import React, { Component } from 'react'
import Book from './Book'
// add propsTypes

class Bookshelf extends Component{

    render() {

        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .toLowerCase()}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* itration boks */}
                        {this.props.classifiedBooks.map((book,key) => (
                            <li key={key}>
                            <Book book={book} onChangeBookShelf = { this.props.onChangeBookShelf }/>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
        )
    }
}

export default Bookshelf