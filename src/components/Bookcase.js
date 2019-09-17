import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Redirect } from "react-router-dom";

// add propsTypes

class Bookcase extends Component{
    state = {
        toSearch: false
    }

    componentDidMount(){
    }

    buildShelves = () => 
        this.props.shelivesTypes.map((selfType,key) => (
        <Bookshelf 
            shelfTitle = {selfType}
            key = {key}
            classifiedBooks = {this.props.books.filter((b) => (b.shelf === selfType))}
            onChangeBookShelf= { this.props.onChangeBookShelf }
        /> 
    ));
    
    goToSearh = () => this.setState((prevState) => ({ toSearch: true }))

    render() {

        if (this.state.toSearch === true){
            return (<Redirect to='/search' />)
        }
        
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {this.buildShelves()}
              </div>
            </div>
            {/* link */}
            <div className="open-search">
             
              <button onClick={() => this.goToSearh()}>Add a book</button>
            </div>
          </div>
        );
    }
}

export default Bookcase