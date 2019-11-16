import React, { Component } from "react";

import Book from "../../components/Book/Book";
import BookSummary from "../../containers/BookSummary/BookSummary";
import Header from "../../components/UI/Header/Header";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

class Anthology extends Component {
  state = {
    books: [],
    selectedBook: null,
    showSummary: true
  };

  componentDidMount() {
    fetch("http://localhost:5000/books")
      .then(response => response.json())
      .then(books => this.setState({ books }))
      .catch(err => console.log(err));
  }

  render() {
    let showSummary = null;
    if (this.state.showSummary) {
      showSummary = (
        <Modal show={this.state.showSummary}>
          <BookSummary />
        </Modal>
      );
    }

    let books = <Spinner />;
    if (this.state.books) {
      books = this.state.books.map(book => (
        <Book
          key={book.id}
          onClick={() => this.selectBookHandler(book.id)}
          title={book.title}
          image={book.image}
        />
      ));
    }

    return (
      <div>
        <Header />
        {showSummary}
        {books}
      </div>
    );
  }
}

export default Anthology;
