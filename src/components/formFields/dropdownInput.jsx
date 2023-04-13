import React from "react";
import { Form } from "react-bootstrap";
import CustomSelect from "components/custom/custom-select/customSelect";
export default props => {
  return (
    <div className="small-info-div input-common">
      <Form.Label>{props.label}</Form.Label>
      <CustomSelect {...props}/>
    </div>
  );
};
