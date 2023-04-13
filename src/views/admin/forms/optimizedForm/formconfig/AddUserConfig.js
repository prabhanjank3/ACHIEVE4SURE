import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import regexValidators from './regex-validators';

const contactFormFields = [
    {
        name: "uname",
        type: "string",
        label: { text: "Email *" },
        control: {
            attributes: {
                placeholder: "someone@mail.com"
            }
        },
        validators: [{
            validate: data => (data.uname.length > 0),
            message: "Field required"
        },{
            //don't show this msg if the field is empty since required field message will already show
            validate: data => ((data.uname.length === 0) || (regexValidators.email.test(data.email))),
            message: "Invalid email"
        }]
    },
    {
        name: "role",
        type: "string",
        label: {
            text: "Role"
        },
        control:{
            tag:"select",
            options:[
                {
                    id:'Select Role',
                    text:"Select Role"
                },
                {
                    id:'Admin',
                    text:"Admin"
                },
                {
                    id:'Instructor',
                    text:"Instructor"
                },
                {
                    id:'Coordinator',
                    text:"Coordinator"
                }
            ]
        },
        // validators: [{
        //     //don't show this msg if the field is empty since required field message will already show
        //     // validate: data => ((data.role.value === 0)),
        //     // message: "Select "
        // }]
    },
    {
        name: "ufirstname",
        type: "string",
        label: { text: "First Name *" },
        validators: [{
            validate: data => data.ufirstname.length > 0,
            message: "Required field"
        }]
    }, {
        name: "ulastname",
        type: "string",
        label: { text: "Last Name *" },
        validators: [{
            validate: data => data.ulastname.length > 0,
            message: "Required field"
        }]
    },{
        name: "empid",
        type: "string",
        label: { text: "Emp ID" }
    }, {
        name: "empphone",   
        type: "string",
        label: {
            text: "Phone No."
        },
        control: {
            attributes: {
                placeholder: "111-222-3333"
            }
        }
    }, 
];

export default contactFormFields;