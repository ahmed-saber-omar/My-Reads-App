import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class ListBooks extends Component {
updateShelf = (element) => {
this.props.updateShelfMovement(element)
}

render(){
  var {shelflist} = this.props
  var currentlyReadingShelf = shelflist.filter((title)=>(title.shelf === "currentlyReading"))
  var wantToReadShelf = shelflist.filter((title)=>(title.shelf === "wantToRead"))
  var readShelf = shelflist.filter((title)=>(title.shelf === "read"))

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="open-search">
            <Link
              to="/search"
              >
            </Link>
          </div>

          <div className="list-books-content">
            <div>
              
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(currentlyReadingShelf!== undefined) && currentlyReadingShelf.map((book)=> (
                      <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 174, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select name={book.name} id={book.id} value={book.shelf} onChange={(event)=>this.updateShelf(event.target)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className=" book-authors">{book.authors}</div>
                      </div>
                    </li>))
                      }
                  </ol>
                </div>
              </div>
             
             
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(wantToReadShelf!== undefined) && wantToReadShelf.map((book)=> (
                      <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 174, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select name={book.name} id={book.id} value={book.shelf} onChange={(event)=>this.updateShelf(event.target)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className=" book-authors">{book.authors}</div>
                      </div>
                    </li>))
                      }
                  </ol>
                </div>
              </div>
              
              
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {(readShelf!== undefined) && readShelf.map((book)=> (
                      <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 174, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                            <select name={book.name} id={book.id} value={book.shelf} onChange={(event)=>this.updateShelf(event.target)}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className=" book-authors">{book.authors}</div>
                      </div>
                    </li>))
                      }
                  </ol>
                </div>
              </div>
          
          </div>
          </div>

        </div>

    </div>
  )
}
}
export default ListBooks
