import React from "react";
import "./FormComponents.css";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";
const ButtonPanal =  props => {
  return (
    <div className="small-info-btn-div">
      <Button onClick={props.onSubmit} id="save-btn">Save</Button>&nbsp;&nbsp;
      <Link to="/">
        <Button id="cancel-btn">Cancel</Button>
      </Link>
    </div>
  );
};
export default ButtonPanal;
