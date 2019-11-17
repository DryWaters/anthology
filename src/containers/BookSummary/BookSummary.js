import React, { Component } from "react";

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
        value: this.props.book.title || "",
        required: true,
        valid: false,
        touched: false
      },
      author: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        value: this.props.book.author || "",
        required: true,
        valid: false,
        touched: false
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "textarea",
          placeholder: "Description"
        },
        value: this.props.book.description || "",
        required: false,
        valid: false,
        touched: false
      },
      image: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Image URL"
        },
        value: this.props.book.image || "",
        required: false,
        valid: false,
        touched: false
      },
      loaned: {
        elementType: "input",
        elementConfig: {
          type: "checkbox"
        },
        value: this.props.book.loaned || false,
        required: false,
        valid: false,
        touched: false
      }
    }
  };

  componentDidMount() {
    this.validateForm();
  }

  inputChangedHandler = (event, inputId) => {
    const updatedFormElement = this.updateObject(this.state.bookForm[inputId], {
      value: event.target.value,
      valid: this.validateInput(
        this.state.bookForm[inputId].required,
        event.target.value
      ),
      touched: true
    });

    const updatedBookForm = this.updateObject(this.state.bookForm, {
      [inputId]: updatedFormElement
    });

    this.setState({ bookForm: updatedBookForm }, this.validateForm());
  };

  formSubmitHandler = event => {
    console.log(event);
    event.preventDefault();
    console.log("form going up!");
    if (!this.state.formIsValid) {
      return;
    }
    this.props.update();
  };

  validateInput = (required, value) => {
    if (!required) {
      return true;
    }
    return value.trim().length > 0;
  };

  validateForm = () => {
    let formIsValid = true;
    for (let input in this.state.bookForm) {
      console.log(input);
      formIsValid = this.state.bookForm[input].valid && formIsValid;
    }
    this.setState({
      formIsValid
    });
  };

  updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
  };

  render() {
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
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </form>
    );

    return (
      <div className={classes.BookSummary}>
        <h3>{this.props.status} Book</h3>
        <div>
          <img
            className={classes.image}
            src={this.props.book.image || "./images/book-image-error.png"}
            alt="Book"
          />
        </div>
        {form}
        <Button btnType="danger" clicked={this.props.cancel}>
          Cancel
        </Button>
        <Button
          btnType="success"
          disabled={!this.state.formIsValid}
          clicked={this.formSubmitHandler}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default BookSummary;
