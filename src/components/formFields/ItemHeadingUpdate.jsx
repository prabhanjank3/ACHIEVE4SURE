import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import "./FormComponents.css";
export default props => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{props.id}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        name="title"
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={props.onChange}
        value={props.title}
      />
    </InputGroup>
  );
};
