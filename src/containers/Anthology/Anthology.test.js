import React from "react";
import { shallow } from "enzyme";

import Anthology from "./Anthology";
import BookSummary from "../BookSummary/BookSummary";
import BookDialog from "../../components/Book/BookDialog/BookDialog";
import ErrorDialog from "../../components/UI/ErrorDialog/ErrorDialog";
import Spinner from "../../components/UI/Spinner/Spinner";

describe("<Anthology />", () => {
  it("should render", () => {
    const wrapper = shallow(<Anthology />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should return null if have no selected book", () => {
    const wrapper = shallow(<Anthology />);
    expect(wrapper.instance().getBookInformation()).toEqual(null);
  });

  it("should return book if have selected book", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [
        {
          id: 1,
          title: "Something"
        },
        { id: 2, title: "Other book" }
      ],
      selectedBookId: 2
    });
    expect(wrapper.instance().getBookInformation()).toEqual({
      id: 2,
      title: "Other book"
    });
  });

  it("should return null if unable to match book", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [
        {
          id: 1,
          title: "Something"
        },
        { id: 2, title: "Other book" }
      ],
      selectedBookId: 3
    });
    expect(wrapper.instance().getBookInformation()).toEqual(null);
  });

  it("should close modal and reset error state if call handleCloseModal", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [],
      errorMessage: "Some error",
      modalContent: "Add",
      selectedBookId: 1
    });

    wrapper.instance().handleCloseModal();
    expect(wrapper.state()).toEqual({
      books: [],
      modalContent: null,
      errorMessage: null,
      selectedBookId: null
    });
  });

  it("should return a BookSummary if modalContent is Add/Update", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [],
      errorMessage: "Some error",
      modalContent: "Add",
      selectedBookId: 1
    });
    wrapper.instance().displayModalContent();
    expect(wrapper.containsMatchingElement(<BookSummary />)).toEqual(true);
    wrapper.setState({
      modalContent: "Update"
    });
    wrapper.instance().displayModalContent();
    expect(wrapper.containsMatchingElement(<BookSummary />)).toEqual(true);
  });

  it("should return null if modalContent is set incorrectly", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [],
      errorMessage: "Some error",
      modalContent: "Something Else",
      selectedBookId: 1
    });
    let modalContent = wrapper.instance().displayModalContent();
    expect(modalContent).toEqual(null);
  });

  it("should return a BookDialog if modalContent is Delete", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [],
      errorMessage: "Some error",
      modalContent: "Delete",
      selectedBookId: 1
    });
    wrapper.instance().displayModalContent();
    expect(wrapper.containsMatchingElement(<BookDialog />)).toEqual(true);
  });

  it("should display an error dialog if one is set", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      modalContent: "Error",
      errorMessage: "Some error"
    });
    wrapper.instance().displayModalContent();
    expect(wrapper.containsMatchingElement(<ErrorDialog />)).toEqual(true);
  });

  it("should display a spinner if no books are found", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: []
    });
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  });
});
