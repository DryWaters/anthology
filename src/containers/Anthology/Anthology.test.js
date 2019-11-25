import React from "react";
import { shallow } from "enzyme";

import Anthology from "./Anthology";
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
          title: "Something",
          loaned: false
        },
        { id: 2, title: "Other book", loaned: false }
      ],
      selectedBookId: 2
    });
    expect(wrapper.instance().getBookInformation()).toEqual({
      id: 2,
      title: "Other book",
      loaned: false
    });
  });

  it("should return null if unable to match book", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: [
        {
          id: 1,
          title: "Something",
          loaned: false
        },
        { id: 2, title: "Other book", loaned: false }
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
      selectedBookId: 1,
      filteredBooks: [],
      filterText: "",
      filterType: "title"
    });

    wrapper.instance().handleCloseModal();
    expect(wrapper.state()).toEqual({
      books: [],
      modalContent: null,
      errorMessage: null,
      selectedBookId: null,
      filteredBooks: [],
      filterText: "",
      filterType: "title"
    });
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

  it("should display a spinner if no books are found", () => {
    const wrapper = shallow(<Anthology />);
    wrapper.setState({
      books: []
    });
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  });
});
