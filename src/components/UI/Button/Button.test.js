import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";

describe("<Button />", () => {
  it("should render submit button", () => {
    const wrapper = shallow(<Button btnType="submit" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".submit")).toHaveLength(1);
  });

  it("should render children if passed in", () => {
    const child = <div className="someText">Some Text</div>;
    const wrapper = shallow(<Button>{child}</Button>);
    expect(wrapper.contains(child)).toEqual(true);
  });
});
