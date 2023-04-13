import React from "react";
import { Form } from "react-bootstrap";
import TextEditor from "../SharedComponents/TextEditor/reactquill";
import FormLabel from "./formLabel";
export default props => {
  return (
    <Form.Group
      controlId="exampleForm.ControlTextarea1"
    >
      <FormLabel className="form-label" label={props.label} />
      <div>
        <TextEditor
          name={props.name}
          className ="input-common"
          rows="10"
          cols="125"
          onChange={e => {props.onChange(props.name,e)}}
          defaultValue = {props.defaultValue}
        >
          
        </TextEditor>
      </div>
    </Form.Group>
  );
};
