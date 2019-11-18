import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import BookImage from "../../components/Book/BookImage/BookImage";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { validateInput, validateForm } from "../../shared/utility";

import classes from "./BookSummary.module.scss";

class BookSummary extends Component {
  // bookForm contains dynamic input element configuration
  // that will be generated in the render() function
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
        touched: false,
        valid: false
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
        touched: false,
        valid: false
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: "Description",
          rows: 4
        },
        value: this.props.book ? this.props.book.description : "",
        touched: false,
        valid: true
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
        touched: false,
        valid: false
      },
      loaned: {
        elementType: "input",
        elementConfig: {
          type: "checkbox"
        },
        checked: this.props.book ? this.props.book.loaned : false,
        touched: false,
        valid: true
      }
    }
  };

  componentDidMount() {
    // if adding a book, nothing to validate
    if (!this.props.book) {
      return;
    }

    // check if passed in book props are already valid
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

    // check form app state valid in case
    // user modifies disabled state on button
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

    // if updating a book, reuse same book id
    // else generate a new UUID
    if (this.props.book && this.props.book.id) {
      newBook.id = this.props.book.id;
      this.props.update(newBook, "PUT");
    } else {
      newBook.id = uuidv4();
      this.props.update(newBook, "POST");
    }
  };

  render() {
    // display error message if fetch() pushes error downstream
    let errorMessage = null;
    if (this.props.errorMessage) {
      errorMessage = <p className="error">ERROR: {this.props.errorMessage}</p>;
    }

    // convert object of input fields to
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
        {errorMessage}
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
