import React from 'react';
import { Form } from "react-bootstrap";
import './FormComponents.css';
export default ({label}) => {
    return <Form.Label>{label}</Form.Label>
}