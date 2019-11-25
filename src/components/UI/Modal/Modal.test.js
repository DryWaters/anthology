import React from "react";
import { shallow } from "enzyme";

import Modal from "./Modal";

describe("<Modal />", () => {
  it("should be visible if props.show is passed in", () => {
    const wrapper = shallow(<Modal show onModalClose={() => {}} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".show")).toHaveLength(1);
  });

  it("should not be visible if props.show is false", () => {
    const wrapper = shallow(<Modal show={false} onModalClose={() => {}} />);
    expect(wrapper.find(".hide")).toHaveLength(1);
  });

  it("should render children if passed in", () => {
    const child = <div className="someText">Some Text</div>;
    const wrapper = shallow(
      <Modal show onModalClose={() => {}}>
        {child}
      </Modal>
    );
    expect(wrapper.contains(child)).toEqual(true);
  });
});
