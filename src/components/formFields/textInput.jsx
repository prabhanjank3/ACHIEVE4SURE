import React from "react";
import { InputGroup, Form } from "react-bootstrap";
import FormLabel from "./formLabel";
import "./FormComponents.css";
export default props => {
  return (
    <Form.Group className="mb-3" >
      <FormLabel className="form-label" label={props.label} />
      <Form.Control
        name={props.name}
        type="text"
        style={{width:'100%'}}
        value={props.defaultValue}
        onChange={(e) => props.onChange(e.target.name, e.target.value)}
      />
    </Form.Group>
  );
};
