import React, { Component } from 'react'
import PropTypes from 'prop-types';
// add propsTypes

class Book extends Component {
state = {
    currentShelf:''
}
    componentDidMount(){
        this.setState((prevState) => ({
            currentShelf: this.props.book.shelf
        }))
    }

    selectBookShelf = (event) =>{
        console.log('selectBookShelf: '+event.target.value)
        let value = event.target.value;
        if(value) this.props.onChangeBookShelf(this.props.book,value)
    }

    render() {
        return (
            <div className="book">           
                <div className="book-top">
                    <div className="book-cover" 
                    style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange = {(event) => this.selectBookShelf(event)} value={this.props.book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                {this.props.book.authors && this.props.book.authors.map((author,key) => (
                    <div className="book-authors" key={key}>{author}</div>
                ))}
                
            </div>
        )
    }
}

export default Book