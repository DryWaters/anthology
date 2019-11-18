import React, { Component } from "react";

import uuidv4 from "uuid/v4";
import { validateInput, validateForm } from "../../shared/utility";

import BookImage from "../../components/Book/BookImage/BookImage";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import classes from "./BookSummary.module.scss";

class BookSummary extends Component {
  state = {
    bookForm: {
      title: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Book Title"
        },
        validation: {
          required: true
        },
        value: this.props.book ? this.props.book.title : "",
        touched: false
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        validation: {
          required: true
        },
        value: this.props.book ? this.props.book.author : "",
        touched: false
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: "Description",
          rows: 5
        },
        value: this.props.book ? this.props.book.description : "",
        touched: false
      },
      image: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Image URL"
        },
        validation: {
          required: true,
          validURL: true
        },
        value: this.props.book ? this.props.book.image : "",
        touched: false
      },
      loaned: {
        elementType: "input",
        elementConfig: {
          type: "checkbox"
        },
        checked: this.props.book ? this.props.book.loaned : false,
        touched: false
      }
    }
  };

  componentDidMount() {
    // if adding a book, nothing to validate
    if (!this.props.book) {
      return;
    }
    // check if passed in book props are valid
    let isFormValid = true;
    const newForm = { ...this.state.bookForm };
    for (let input in newForm) {
      newForm[input].valid = validateInput(newForm[input]);
      isFormValid = newForm[input].valid && isFormValid;
    }

    this.setState({
      bookForm: newForm,
      isFormValid
    });
  }

  inputChangedHandler = (event, input) => {
    const newForm = { ...this.state.bookForm };
    if (newForm[input].elementConfig.type === "checkbox") {
      newForm[input].checked = event.target.checked;
    } else {
      newForm[input].value = event.target.value;
    }
    newForm[input].valid = validateInput(newForm[input]);
    newForm[input].touched = true;

    const isFormValid = validateForm(newForm);

    this.setState({ bookForm: newForm, isFormValid });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    if (!this.state.isFormValid) {
      return;
    }

    const { bookForm } = this.state;

    const newBook = {
      title: bookForm.title.value,
      author: bookForm.author.value,
      description: bookForm.description.value,
      image: bookForm.image.value,
      loaned: bookForm.loaned.checked
    };

    // updating a book
    if (this.props.book && this.props.book.id) {
      newBook.id = this.props.book.id;
      this.props.update(newBook, false);
    } else {
      // creating a new book
      newBook.id = uuidv4();
      this.props.update(newBook, true);
    }
  };

  render() {
    // convert obj of input fields to
    // array so that can be mapped over
    const formElementsArray = [];
    for (const key in this.state.bookForm) {
      formElementsArray.push({
        id: key,
        config: this.state.bookForm[key]
      });
    }
    let form = (
      <form onSubmit={this.formSubmitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            checked={formElement.config.checked}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="cancel" clicked={this.props.cancel}>
          Cancel
        </Button>
        <Button btnType="submit" disabled={!this.state.isFormValid}>
          {this.props.status}
        </Button>
      </form>
    );

    return (
      <div className={classes.BookSummary}>
        <h2>{this.props.status} Book</h2>
        {this.props.errorMessage}
        <div>
          <BookImage
            loaned={this.state.bookForm.loaned.checked}
            image={this.state.bookForm.image.value}
            title={this.state.bookForm.title.value}
          />
        </div>
        {form}
      </div>
    );
  }
}

export default BookSummary;
