import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    searchList: []
  }

  handleQuery = (query)=> {
    this.setState({query: query.trim()})
    if(query) {
    BooksAPI.search(query.trim()).then((titles)=>{
      if(!titles || titles.error) {
        this.setState({searchList:[]})
      } else {
      this.bookShelf(titles)
      this.setState({searchList:titles})
    }
    })} else {
        this.setState({searchList:[]})
    }
  }

  bookShelf = (results) => {
    var {books} = this.props
    books.map((book)=>{
      for (let result of results){
          if (result.id === book.id) {
              result.shelf = book.shelf
          } else {
            if(result.shelf !== "currentlyReading" && result.shelf !== "wantToRead" && result.shelf !== "read")
              result.shelf = "none"
          }
      }
      return results
    })
}

  updateShelf = (element) => {
    this.props.addBooksFromSearchToShelf(element)
  }

  render() {
    var {query,searchList} = this.state
    return (    <div className="search-books">
                <div className="search-books-bar">
                  <Link
                  to="/"
                  className="close-search"
                  />
                  <div className="search-books-input-wrapper">
                    {
                      <input
                      type="text"
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event)=>this.handleQuery(event.target.value)}
                      />
                    }
                  </div>
                </div>

                <div className="search-books-results">
                  <ol className="books-grid">
                  {(searchList!== undefined) && searchList.map((book)=> (
                    <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                        <select name={book.name} id={book.id} value={book.shelf} onChange={(event)=>this.updateShelf(event.target)}>
                            <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                      </div>
                  </li>))
                    }
                  </ol>
                  </div>

                </div>)
  }
}

export default SearchBooks
