import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import regexValidators from './regex-validators';

const contactFormFields = [
    {
        name: "first_name",
        type: "string",
        label: { text: "First Name *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
    {
        name: "last_name",
        type: "string",
        label: { text: "Last Name *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
    {
        name: "emp_phone",
        type: "string",
        label: {
            text: "Phone *"
        },
        control: {
            attributes: {
                placeholder: "111-222-3333"
            }
        },
        // validators: [{
        //     validate: data => (data.phone.length > 0),
        //     message: "Required field"
        // }]
    },
    {
        name: "email",
        type: "string",
        label: { text: "Email *" },
        control: {
            attributes: {
                placeholder: "someone@mail.com"
            }
        },
        validators: [{
            validate: data => (data.email.length > 0),
            message: "Field required"
        },{
            //don't show this msg if the field is empty since required field message will already show
            validate: data => ((data.email.length === 0) || (regexValidators.email.test(data.email))),
            message: "Invalid email"
        }],
    },
    {
        name: "designation",
        type: "string",
        label: { text: "Designation *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
    {
        name: "doj",
        type: "string",
        label: { text: "Joining Date *" },
        control:{
            attributes: {
                type:"date",
            }
        },
    },
    {
        name: "experience",
        type: "string",
        label: { text: "Experience *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
    {
        name: "cgpa",
        type: "string",
        label: { text: "CGPA *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
    {
        name: "University",
        type: "string",
        label: { text: "University *" },
        // validators: [{
        //     validate: data => data.title.length > 0,
        //     message: "Required field"
        // }]
    },
];

export default contactFormFields;