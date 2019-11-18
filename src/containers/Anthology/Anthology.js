import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookDialog from "../../components/Book/BookDialog/BookDialog";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Anthology.module.scss";

const jsonURL = process.env.REACT_APP_API_URL;

class Anthology extends Component {
  state = {
    books: [],
    selectedBookId: null,
    modalContent: null,
    errorMessage: null
  };

  componentDidMount() {
    let url = jsonURL;

    // if using firebase, it requires a .json appended to URL
    if (process.env.NODE_ENV === "production") {
      url += "/books.json";
    } else {
      url += "/books";
    }

    fetch(url)
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

  // Called by tapping outside of modal box and also
  // cancelling actions.  This is also the only way
  // to clear error messages from fetch() api
  handleCloseModal = () => {
    this.setState({
      modalContent: null,
      selectedBookId: null,
      errorMessage: null
    });
  };

  // Shows the modal if updating or deleting a book
  handleShowModal = (id, modalType) => {
    this.setState({
      modalContent: modalType,
      selectedBookId: id
    });
  };

  // handles updating backend API functions
  // and updating the local state
  handleUpdateBooks = (data, method) => {
    let newBooks = [...this.state.books];
    let url = jsonURL + "/books/";
    let payload;
    let index;

    switch (method) {
      // update loaned status
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
      // update existing book
      case "PUT":
        url += data.id;
        index = newBooks.findIndex(({ id }) => id === data.id);
        newBooks[index] = { ...data };
        payload = { ...data };
        break;
      // delete book
      case "DELETE":
        url += data;
        newBooks = newBooks.filter(({ id }) => data !== id);
        break;
      default: {
        this.setState({ errorMessage: "Invalid HTTP Method" });
      }
    }

    // if using firebase, it requires a .json appended to URL
    if (process.env.NODE_ENV === "production") {
      url += ".json";
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
      // else set error state that will show in modals
      .catch(err => this.setState({ errorMessage: err }));
  };

  // get book information that is passed down into modals
  getBookInformation = () => {
    const selectedBook = this.state.books.filter(
      ({ id }) => this.state.selectedBookId === id
    );

    return selectedBook.length > 0 ? selectedBook[0] : null;
  };

  // display different type of modal if deleting
  // or updating/adding book.
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
    } else {
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
    // if no books loaded yet show spinner and/or error message
    let books = (
      <div>
        <p className={"error"}>
          {this.state.errorMessage
            ? "Error: " + this.state.errorMessage
            : "Loading books..."}
        </p>
        <Spinner />
      </div>
    );

    // create books to display by mapping over retrieved books
    // from backend.
    if (this.state.books && this.state.books.length > 0) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          clickImage={() => this.handleShowModal(book.id, "Update")}
          deleteBook={() => this.handleShowModal(book.id, "Delete")}
          toggleLoan={() => this.handleUpdateBooks(book, "PATCH")}
          {...book}
        />
      ));
    }

    // Display modal content if needed
    let modalContent = this.state.modalContent && this.displayModalContent();

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
