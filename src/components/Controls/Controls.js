import React from "react";

import classes from "./Controls.module.scss";

const Controls = props => (
  <div className={classes.Controls}>
    <label htmlFor="filterText">
      <span className={classes.screenReader}>Filter Text</span>
    </label>
    <input
      className={classes.filterText}
      onChange={props.onFilterTextChange}
      type="text"
      value={props.filterText}
      placeholder="Type to filter..."
      id="filterText"
    />
    <label htmlFor="filterType">
      <span className={classes.screenReader}>Filter Type</span>
    </label>
    <select
      className={classes.filterType}
      onChange={props.onFilterTypeChange}
      value={props.filterType}
      id="filterType"
    >
      <option value="isbn">ISBN</option>
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="description">Description</option>
    </select>
  </div>
);

export default Controls;
