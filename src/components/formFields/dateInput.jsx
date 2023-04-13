import React from "react";
import { Form } from "react-bootstrap";
import FormLabel from "./formLabel";
export default props => {
  const getStringToDate = (str) => {
    return new Date(str).getFullYear() +
    "-" +
    ("0" + (new Date(str).getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date(str).getDate()).slice(-2)
  } 
  return (
    <div className="small-info-div input-common">
      <FormLabel className="form-label" label={props.label} />
      <br />
      <Form.Control
        type="date"
        name={props.name}
        value={getStringToDate(props.defaultValue)}
        onChange={(e) => props.onChange(e.target.name, e.target.value)}
      />
    </div>
  );
};
