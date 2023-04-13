import React, { createRef} from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import {submitReport} from '../../container/duration/CommonFunctions';
export default (props) => {
  const inputRef = createRef(null);
  const formik = useFormik({
    initialValues: {
      comment: ""
    },
    onSubmit: (values) => {
      
      values = {
        ...values,
        actionItemId: props.actionItemId
      };
      // props.handleSubmit(values);
      submitReport(values).then(resp=>{
          if(resp.status === 200)
          {
              alert("Report Submitted!");
              inputRef.current.value = "";
          }
          else
          {
              new Error(resp.data);
          }
      }).catch(err=> alert(err))
    }
  });
  return (
    <Form.Group
      controlId="exampleForm.ControlTextarea1"
      className="description-section"
    >
      <Form.Label>Send Report</Form.Label>
      <div>
        <textarea
          id="report-comment"
          ref={inputRef}
          name="comment"
          rows="1"
          cols="50"
          onChange={formik.handleChange}
        ></textarea>
      </div>
      <Button id="report-btn" onClick={formik.handleSubmit}>Report</Button>
    </Form.Group>
  );
};
