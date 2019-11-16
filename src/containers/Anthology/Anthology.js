import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Anthology.module.scss";

class Anthology extends Component {
  state = {
    books: [],
    selectedBook: null,
    showSummary: false
  };

  componentDidMount() {
    fetch("http://localhost:5000/books")
      .then(response => response.json())
      .then(books => this.setState({ books }))
      .catch(err => console.log(err));
  }

  handleCloseSummary = () => {
    this.setState({
      showSummary: false
    });
  };

  handleDeleteBook = id => {};

  handleToggleLoan = id => {};

  handleSelectBook = id => {
    console.log("Clicked book");
  };

  render() {
    let books = <Spinner />;
    if (this.state.books) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          clickBook={() => this.handleSelectBook(book.id)}
          deleteBook={() => this.handleDeleteBook(book.id)}
          toggleLoan={() => this.handleToggleLoan(book.id)}
          loaned={book.loaned}
          title={book.title}
          image={book.image}
        />
      ));
    }

    return (
      <div className={classes.Anthology}>
        <Header />
        <Modal
          show={this.state.showSummary}
          modalClose={this.handleCloseSummary}
        >
          <BookSummary />
        </Modal>
        {books}
      </div>
    );
  }
}

export default Anthology;
