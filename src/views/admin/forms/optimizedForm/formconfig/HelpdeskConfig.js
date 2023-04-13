import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import regexValidators from './regex-validators';

const contactFormFields = [
    {
        name: "category",
        type: "string",
        label: { text: "Catagory *" },
        control:{
            attributes:{
                type:"text",
                className:"form-control",
                // value={data.batchstartdate}
                // onChange={(e) => onValChange(e)}
                name:"catagory",
                placeholder:"Enter Catagory"
            }
        },
        validators: [{
            validate: data => data.batchName.length > 0,
            message: "Required field"
        }]
    }, {
        name: "subject",
        type: "string",
        label: { text: "Subject *" },
        control:{
            attributes:{
            placeholder: 'Enter Subject..',
            className:"form-control",
            }
        }
    }, 
    {
        name: "description",
        type: "string",
        label: {
            text: "Description *"
        },
        control:{
            tag:"textarea",
            attributes: {
                placeholder: 'Enter description..'
            }
        }
    },
    {
        name: "priority",
        type: "string",
        label: {
            text: "Priority *"
        },
        control:{
            tag:"select",
            options:[
                {
                    id:'Low',
                    text:"Low"
                },
                {
                    id:'Medium',
                    text:"Medium"
                },
                {
                    id:'High',
                    text:"High"
                }
            ]
        }
    }
];

export default contactFormFields;