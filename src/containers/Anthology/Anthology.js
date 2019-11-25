import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookDialog from "../../components/Book/BookDialog/BookDialog";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Controls from "../../components/Controls/Controls";
import ErrorDialog from "../../components/UI/ErrorDialog/ErrorDialog";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Anthology.module.scss";

const jsonURL = process.env.REACT_APP_API_URL;

class Anthology extends Component {
  state = {
    books: [],
    filteredBooks: [],
    selectedBookId: null,
    modalContent: null,
    errorMessage: null,
    filterType: "title",
    filterText: ""
  };

  // Show an error modal if unable to fetch books
  componentDidMount() {
    fetch(jsonURL + "/books")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject("Error retrieving books:  Code " + res.status);
        }
      })
      .then(data => {
        this.setState({ books: data, filteredBooks: data });
      })
      .catch(err => this.setFetchErrorState(err));
  }

  // Helper method to set error state from different
  // fetch calls
  setFetchErrorState = errorMessage => {
    let modalContent = this.state.modalContent;
    if (!modalContent) {
      modalContent = "Error";
    }

    // if receives an Error object, just pull off the message
    if (typeof errorMessage === "object") {
      errorMessage = errorMessage.toString();
    }

    this.setState({
      modalContent,
      errorMessage
    });
  };

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

  // Shows the modal if updating or deleting a book.
  // Adding a book sets the modalContent flag without
  // this helper method
  handleShowModal = (id, modalType) => {
    this.setState({
      modalContent: modalType,
      selectedBookId: id
    });
  };

  // handles updating backend API functions
  // and updating the local state
  // method is a HTTP uppercase string, ex. POST
  // data is the payload for the method
  handleUpdateBooks = (data, method) => {
    let newBooks = JSON.parse(JSON.stringify(this.state.books));
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
      default:
        this.setFetchErrorState("Invalid HTTP Method");
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
            filteredBooks: newBooks,
            modalContent: null,
            selectedBookId: null,
            filterText: "",
            filterType: "title"
          });
        } else {
          return Promise.reject("Error processing update: Code " + res.status);
        }
      })
      .catch(err => this.setFetchErrorState(err));
  };

  handleFilterText = filterText => {
    this.filterBooks(filterText.target.value, this.state.filterType);
  };

  handleFilterType = filterType => {
    this.filterBooks(this.state.filterText, filterType.target.value);
  };

  // filter books based on filter type
  filterBooks = (filterText, filterType) => {
    // turn search case-insensitive and remove
    // hyphens if searching for isbn
    let modifiedFilterText = filterText.toLowerCase();
    if (filterType === "isbn") {
      modifiedFilterText = modifiedFilterText.trim().replace(/-/g, "");
    }

    const newBooks = [...this.state.books].filter(book =>
      book[filterType].toLowerCase().includes(modifiedFilterText)
    );
    this.setState({ filterText, filterType, filteredBooks: newBooks });
  };

  // get book information that is passed down into modal
  getBookInformation = () => {
    const selectedBook = this.state.books.filter(
      ({ id }) => this.state.selectedBookId === id
    );

    return selectedBook.length > 0 ? selectedBook[0] : null;
  };

  // display different type of modals
  displayModalContent = () => {
    let modalContent = null;
    switch (this.state.modalContent) {
      case "Error":
        modalContent = (
          <ErrorDialog
            errorMessage={this.state.errorMessage}
            cancel={this.handleCloseModal}
          />
        );
        break;
      case "Delete":
        modalContent = (
          <BookDialog
            errorMessage={this.state.errorMessage}
            book={this.getBookInformation()}
            delete={this.handleUpdateBooks}
            cancel={this.handleCloseModal}
          />
        );
        break;
      case "Update":
      case "Add":
        modalContent = (
          <BookSummary
            errorMessage={this.state.errorMessage}
            status={this.state.modalContent}
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
    // if no books available show spinner
    let books = (
      <div className={classes.spinnerContainer}>
        <p className={classes.spinnerNotification}>
          No books found. Check filter options.
        </p>
        <Spinner />
      </div>
    );

    // create books to display by mapping over retrieved books
    // from backend.
    if (this.state.filteredBooks && this.state.filteredBooks.length > 0) {
      books = this.state.filteredBooks.map(book => (
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
        <Controls
          onFilterTypeChange={this.handleFilterType}
          onFilterTextChange={this.handleFilterText}
          filterText={this.state.filterText}
          filterType={this.state.filterType}
        />
        <main className={classes.books}>{books}</main>
      </div>
    );
  }
}

export default Anthology;
