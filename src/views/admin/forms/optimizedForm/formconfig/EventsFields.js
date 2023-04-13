import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import regexValidators from './regex-validators';

const contactFormFields = [
    {
        name: "eventname",
        type: "string",
        label: { text: "Event Title *" },
        validators: [{
            validate: data => data.eventname.length > 0,
            message: "Required field"
        }]
    }, {
        name: "eventtype",
        type: "string",
        label: { text: "Event Type *" },
        control:{
            tag: "select",
            options: [
                { id: -1, text: "Select Evaluation Type"},
                { id: 'Assignment', text: "Assignment" },
                { id: 'Assessment', text: "Assessment" },
                { id: 'Rapid Fire', text: "Rapid Fire" },
                { id: 'Mini Project', text: "Mini Project" }
            ]
        },
    }, {
        name: "eventdate",
        type: "string",
        label: { text: "Event Date *" },
        control:{
            attributes: {
                type:"date",
            }
        },
    },
    {
        name: "maximummarks",
        type: "string",
        label: { text: "Maximum Marks *" },
        control:{
            attributes: {
                type:"Number",
            }
        },
    },
    {
        name: "batchname",
        type: "string",
        label: {
            text: "To Batch"
        },
        control:{
            tag:"select",
            options:[
                {
                    id:'in1',
                    text:"Mudita"
                },
                {
                    id:'in2',
                    text:"Raghu"
                }
            ]
        }
    }
];

export default contactFormFields;