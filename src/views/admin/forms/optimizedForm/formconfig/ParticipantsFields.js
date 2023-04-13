import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import regexValidators from './regex-validators';

const contactFormFields = [
    {
        name: "firstname",
        type: "string",
        label: { text: "First Name *" },
        validators: [{
            validate: data => data.firstname.length > 0,
            message: "Required field"
        }]
    }, {
        name: "lastname",
        type: "string",
        label: { text: "Last Name *" },
        validators: [{
            validate: data => data.lastname.length > 0,
            message: "Required field"
        }]
    }, {
        name: "username",
        type: "string",
        label: { text: "Email *" },
        control: {
            attributes: {
                placeholder: "someone@mail.com"
            }
        },
        validators: [{
            validate: data => (data.username.length > 0),
            message: "Field required"
        },{
            //don't show this msg if the field is empty since required field message will already show
            validate: data => ((data.username.length === 0) || (regexValidators.email.test(data.username))),
            message: "Invalid email"
        }]
    },
    {
        name: "empid",
        type: "string",
        label: { text: "Emp Id *" },
        validators: [{
            validate: data => data.empid.length > 0,
            message: "Required field"
        }]
    },
];

export default contactFormFields;