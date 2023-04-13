import React from "react";
import {Form} from "react-bootstrap";

export default (props) => {
    return (<div>
        <Form.Label for="cars">Reporting Type</Form.Label>
            <Form.Control as="select" name="cars" id="cars">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Custom">Custom</option>
            </Form.Control>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter No. of Days</Form.Label>
            <Form.Control type="number" placeholder="" />
        </Form.Group>
        </div>
    );
}