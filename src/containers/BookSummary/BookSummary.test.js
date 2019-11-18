import React from "react";
import { shallow } from "enzyme";

import BookSummary from "./BookSummary";

describe("<BookSummary />", () => {
  it("should render", () => {
    const wrapper = shallow(<BookSummary />);
    expect(wrapper).toMatchSnapshot();
  });
});
