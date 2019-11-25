import React from "react";

import classes from "./Controls.module.scss";

const Controls = () => (
  <div className={classes.Controls}>
    <input type="text" />
    <select>
      <option>ISBN</option>
      <option>Title</option>
      <option>Author</option>
      <option>Description</option>
    </select>
  </div>
);

export default Controls;
