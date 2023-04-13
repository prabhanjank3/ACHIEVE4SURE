import React from "react";
import FormLabel from "./formLabel";
export default props => {
  return (
    <div className="small-info-div">
      <FormLabel className="form-label" label="Pts" />
      <div>
        <input
          name="Pts"
          className="pts-input"
          onChange={props.onChange}
          type="number"
          value={props.Pts}
        />
      </div>
    </div>
  );
};
