import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookDialog from "../../components/Book/BookDialog/BookDialog";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Anthology.module.scss";

class Anthology extends Component {
  state = {
    books: [],
    selectedBookId: null,
    modalContent: null
  };

  componentDidMount() {
    fetch("http://localhost:5000/books")
      .then(response => response.json())
      .then(books => this.setState({ books }))
      .catch(err => console.log(err));
  }

  handleCloseModal = () => {
    this.setState({
      modalContent: null
    });
  };

  handleShowBookDialog = id => {
    this.setState({
      modalContent: "delete",
      selectedBookId: id
    });
  };

  handleDeleteBook = id => {};

  handleToggleLoan = selectedId => {
    const newBooks = [...this.state.books];
    const index = newBooks.findIndex(({ id }) => id === selectedId);
    newBooks[index].loaned = !newBooks[index].loaned;

    this.setState({
      books: newBooks
    });
  };

  handleSelectBook = id => {
    this.setState({
      modalContent: "update",
      selectedBookId: id
    });
  };

  getBookInformation = () => {
    return this.state.books.filter(
      ({ id }) => this.state.selectedBookId === id
    )[0];
  };

  render() {
    // if no books loaded yet, show spinner
    let books = <Spinner />;
    if (this.state.books.length > 0) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          clickBook={() => this.handleSelectBook(book.id)}
          deleteBook={() => this.handleShowBookDialog(book.id)}
          toggleLoan={() => this.handleToggleLoan(book.id)}
          loaned={book.loaned}
          title={book.title}
          image={book.image}
        />
      ));
    }

    let modalContent = null;
    switch (this.state.modalContent) {
      case "delete":
        modalContent = (
          <BookDialog
            book={this.getBookInformation()}
            clicked={this.handleDeleteBook}
          />
        );
        break;
      case "update":
        modalContent = <BookSummary book={this.getBookInformation()} />;
        break;
      default:
        break;
    }

    return (
      <div className={classes.Anthology}>
        <Header />
        <Modal
          show={this.state.modalContent !== null}
          modalClose={this.handleCloseModal}
        >
          {modalContent}
        </Modal>
        {books}
      </div>
    );
  }
}

export default Anthology;
