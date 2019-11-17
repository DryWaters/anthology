import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookDialog from "../../components/Book/BookDialog/BookDialog";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Anthology.module.scss";

const jsonURL = "http://localhost:5000";

class Anthology extends Component {
  state = {
    books: [],
    selectedBookId: null,
    modalContent: null
  };

  componentDidMount() {
    fetch(jsonURL + "/books")
      .then(response => response.json())
      .then(books => this.setState({ books }))
      .catch(err => console.log(err));
  }

  handleCloseModal = () => {
    this.setState({
      modalContent: null,
      selectedBookId: null
    });
  };

  handleShowBookDeleteDialog = selectedId => {
    this.setState({
      modalContent: "delete",
      selectedBookId: selectedId
    });
  };

  handleDeleteBook = selectedId => {
    const newBooks = [...this.state.books].filter(
      ({ id }) => id !== selectedId
    );

    // update backend with new state
    fetch(jsonURL + "/books/" + selectedId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(res => {
        // if able to update backend, update app state
        if (res.status === 200) {
          this.setState({
            books: newBooks,
            modalContent: null
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleToggleLoan = selectedId => {
    const newBooks = [...this.state.books];
    const index = newBooks.findIndex(({ id }) => id === selectedId);
    newBooks[index].loaned = !newBooks[index].loaned;

    // update backend with new state
    fetch(jsonURL + "/books/" + selectedId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({ loaned: newBooks[index].loaned })
    })
      .then(res => {
        // if able to update backend, update app state
        if (res.status === 200) {
          this.setState({
            books: newBooks
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleSelectBook = id => {
    this.setState({
      modalContent: "update",
      selectedBookId: id
    });
  };

  handleUpdateBooks = (book, isNewBook) => {
    const newBooks = [...this.state.books];
    let method;
    let url = "";
    if (isNewBook) {
      newBooks.push(book);
      method = "POST";
    } else {
      const index = newBooks.findIndex(({ id }) => id === book.id);
      newBooks[index] = book;
      method = "PUT";
      url = book.id;
    }

    // update backend with new state
    fetch(jsonURL + "/books/" + url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method,
      body: JSON.stringify({ ...book })
    })
      .then(res => {
        // if able to update backend, update app state
        if (res.status === 200 || res.status === 201) {
          this.setState({
            books: newBooks,
            modalContent: null,
            selectedBookId: null
          });
        }
      })
      .catch(err => console.log(err));
  };

  getBookInformation = () => {
    return this.state.books.filter(
      ({ id }) => this.state.selectedBookId === id
    )[0];
  };

  displayModalContent = () => {
    let modalContent = null;
    switch (this.state.modalContent) {
      case "delete":
        modalContent = (
          <BookDialog
            book={this.getBookInformation()}
            delete={() => this.handleDeleteBook(this.state.selectedBookId)}
            cancel={this.handleCloseModal}
          />
        );
        break;
      case "update":
        modalContent = (
          <BookSummary
            status="Update"
            cancel={this.handleCloseModal}
            update={this.handleUpdateBooks}
            book={this.getBookInformation()}
          />
        );
        break;
      case "add":
        modalContent = (
          <BookSummary
            status="Add"
            cancel={this.handleCloseModal}
            update={this.handleUpdateBooks}
            book={this.getBookInformation()}
          />
        );
        break;
      default:
        break;
    }
    return modalContent;
  };

  render() {
    // if no books loaded yet, show spinner
    let books = <Spinner />;
    if (this.state.books && this.state.books.length > 0) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          clickBook={() => this.handleSelectBook(book.id)}
          deleteBook={() => this.handleShowBookDeleteDialog(book.id)}
          toggleLoan={() => this.handleToggleLoan(book.id)}
          loaned={book.loaned}
          title={book.title}
          image={book.image}
        />
      ));
    }

    let modalContent = this.displayModalContent();

    return (
      <div className={classes.Anthology}>
        <Header clicked={() => this.setState({ modalContent: "add" })} />
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
