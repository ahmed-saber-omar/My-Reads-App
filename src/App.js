import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    var {books} = this.state
    if(books.length <= 0)
      BooksAPI.getAll().then(list=>{
        this.setState({books:list})
      })
  }

  updateShelfMovement = element=>{
    BooksAPI.get(element.id).then(book=>(BooksAPI.update(book,element.value)))
    var {books} = this.state
    books.map(book => {
      if(book.id === element.id)
      book.shelf = element.value
      return book
    })
    this.setState({books})
  }

 addBooksFromSearchToShelf = element =>{
   var {books} = this.state
   BooksAPI.get(element.id).then(book=>{
     book.shelf = element.value
     let index = books.findIndex(bookinshelf=>{
       return bookinshelf.id === book.id
     })
     
     if(index === -1 ) {
      books.push(book)
    }
     else {
      books[index].shelf = element.value
     }
     BooksAPI.update(book,element.value)
     this.setState({books})
   })
 }
  render() {
    var {books} = this.state

    return (
      <div className="app">
          <div className="list-books">
            <Route
              exact path="/"
              render={()=>(<ListBooks
                shelflist={this.state.books}
                updateShelfMovement={this.updateShelfMovement}/>)}/>

            <Route
               path="/search"
              render={({history})=>(<SearchBooks
                books={books}
                addBooksFromSearchToShelf={element => {
                  this.addBooksFromSearchToShelf(element)
                  history.push('/')
                }}/>)}
              />

          </div>

      </div>
    )
  }
}

export default BooksApp
