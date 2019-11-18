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
    modalContent: null,
    errorMessage: null
  };

  componentDidMount() {
    fetch(jsonURL + "/books")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.setState({ errorMessage: res.statusText });
        }
      })
      .then(books => this.setState({ books }))
      .catch(err => this.setState({ errorMessage: err }));
  }

  handleCloseModal = () => {
    this.setState({
      modalContent: null,
      selectedBookId: null,
      errorMessage: null
    });
  };

  handleShowBookDeleteDialog = selectedId => {
    this.setState({
      modalContent: "Delete",
      selectedBookId: selectedId
    });
  };

  handleSelectBook = id => {
    this.setState({
      modalContent: "Update",
      selectedBookId: id
    });
  };

  handleUpdateBooks = (data, method) => {
    let newBooks = [...this.state.books];
    let url = jsonURL + "/books/";
    let payload;
    let index;

    switch (method) {
      // update loan status
      case "PATCH":
        url += data.id;
        index = newBooks.findIndex(({ id }) => id === data.id);
        newBooks[index].loaned = !newBooks[index].loaned;
        payload = { loaned: newBooks[index].loaned };
        break;
      // add new book
      case "POST":
        newBooks.push(data);
        payload = { ...data };
        break;
      // update book
      case "PUT":
        url += data.id;
        index = newBooks.findIndex(({ id }) => id === data.id);
        newBooks[index] = { ...data };
        payload = { ...data };
        break;
      case "DELETE":
        url += data;
        newBooks = newBooks.filter(({ id }) => data !== id);
        break;
      default: {
        this.setState({ errorMessage: "Invalid HTTP Method" });
      }
    }

    // update backend with new state
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method,
      body: JSON.stringify({ ...payload })
    })
      .then(res => {
        // if able to update backend, update app state
        if (res.status === 200 || res.status === 201) {
          this.setState({
            books: newBooks,
            modalContent: null,
            selectedBookId: null
          });
        } else {
          this.setState({ errorMessage: res.statusText });
        }
      })
      .catch(err => this.setState({ errorMessage: err }));
  };

  getBookInformation = () => {
    const selectedBook = this.state.books.filter(
      ({ id }) => this.state.selectedBookId === id
    );

    return selectedBook.length > 0 ? selectedBook[0] : null;
  };

  displayModalContent = () => {
    let modalContent = null;
    if (this.state.modalContent === "Delete") {
      modalContent = (
        <BookDialog
          errorMessage={this.state.errorMessage}
          book={this.getBookInformation()}
          delete={this.handleUpdateBooks}
          cancel={this.handleCloseModal}
        />
      );
    } else if (this.state.modalContent !== null) {
      modalContent = (
        <BookSummary
          errorMessage={this.state.errorMessage}
          status={this.state.modalContent}
          cancel={this.handleCloseModal}
          update={this.handleUpdateBooks}
          book={this.getBookInformation()}
        />
      );
    }
    return modalContent;
  };

  render() {
    // if no books loaded yet show spinner with error message
    let books = (
      <div>
        <p className={classes.error}>
          {this.state.errorMessage
            ? "Error: " + this.state.errorMessage
            : "Loading books..."}
        </p>
        <Spinner />
      </div>
    );
    if (this.state.books && this.state.books.length > 0) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          clickImage={() => this.handleSelectBook(book.id)}
          deleteBook={() => this.handleShowBookDeleteDialog(book.id)}
          toggleLoan={() => this.handleUpdateBooks(book, "PATCH")}
          {...book}
        />
      ));
    }

    let modalContent = this.displayModalContent();

    return (
      <div className={classes.Anthology}>
        <Header clicked={() => this.setState({ modalContent: "Add" })} />
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
