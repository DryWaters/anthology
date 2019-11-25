import React from "react";

import classes from "./Controls.module.scss";

const Controls = props => (
  <div className={classes.Controls}>
    <input
      className={classes.filterText}
      onChange={props.onFilterTextChange}
      type="text"
      value={props.filterText}
      placeholder="Search"
    />
    <select
      className={classes.filterType}
      onChange={props.onFilterTypeChange}
      value={props.filterType}
    >
      <option value="isbn">ISBN</option>
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="description">Description</option>
    </select>
  </div>
);

export default Controls;
