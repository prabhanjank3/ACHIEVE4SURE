import React, { PropTypes as t } from 'react';
import { Input } from '@chakra-ui/react';
import batchFields from './formconfig/BatchFields';
import {Form} from 'react-bootstrap';
function val(obj, path) {
    return path.split('.').reduce((o, i) => {return o && o[i]}, obj);
}

function parseBoolean(value = false) {
    if (typeof value === 'boolean') {
        return value;
    }

    const searchValue = value.toString().toLowerCase().trim();
    return (['true', 'y', 'yes', '1', 'on'].find(item => item === searchValue));
}

class SeroForm extends React.Component {

    constructor(props) {
        super(props);
        const fieldStates = {};
        this.props.fields.forEach(field =>
            fieldStates[field.name] = {
                isValid: true,
                firstValueEntered: false,
                messages: []
            }
        );

        this.state = { ...fieldStates }
    }

    validate(newData, fieldName) {
        const field = this.props.fields.find(f => f.name === fieldName);
        let messages = [];

        if (field.validators) {
            messages = field.validators
                .map(v => v.validate(newData, fieldName) ? '' : v.message)
                .filter(m => m.length > 0)
        }

        const isValid = messages.length === 0;


        this.setState({ [field.name] :
            {
                ...this.state[field.name],
                isValid: isValid,
                firstValueEntered: true,
                messages: messages
            }
        });

        return isValid;
    }

    validateAll() {
        const { data, fields } = this.props;

        let areAllValid = true;

        fields.forEach(field => {
            const isValid = this.validate(data, field.name);
            if (isValid === false) {
                areAllValid = false;
            }
        });
        
        return areAllValid;
    }

    renderValidationMessages(messages) {
        return messages ? messages.map((msg, index) => <div key={index}>{msg}</div>) : null;
    }

    handleOnBlur(fieldName, fieldValue) {
        const field = this.props.fields.find(f => f.name === fieldName);

        if (fieldValue.length > 0) {
            this.setState({ [field.name] :
                {
                    ...this.state[field.name],
                    firstValueEntered: true
                }
            });
        }

        this.handleOnChange(fieldName, fieldValue, true);
    }

    handleOnChange(fieldName, fieldValue, forceValidate = false) {
        const field = this.props.fields.find(f => f.name === fieldName);

        switch ((field.type || 'string').toLowerCase()) {
            case 'number':
            
                fieldValue = fieldValue * 1;
                break;
            case 'boolean':
                fieldValue = parseBoolean(fieldValue);
                break;
        }

        const newData = { [fieldName]: fieldValue };

        if (forceValidate || this.state[field.name].firstValueEntered) {
            this.validate(newData, fieldName);
            if (field.dependentFields) {
                field.dependentFields.forEach(depFieldName => this.validate(newData, depFieldName))
            }
        }

        this.props.onFormChange(newData);
    }

    renderLabel(field) {

        let text = `[${field.name}]`;
        let attributes = {
            htmlFor: `${field.name}_control`,
            className: "form-label"
        };

        if (field.label) {
            if (field.label.text) {
                text = field.label.text;
            }
            if (field.label.attributes) {
                attributes = {...attributes, ...field.label.attributes};
            }
        }

        return <Form.Label {...attributes}>{text}</Form.Label>;
    }

    renderControl(field) {
        const fieldValue = this.props.data[field.name];
       
        let attributes = {
            id: `${field.name}_control`,
            className: 'form-control',
            value: fieldValue
        };

        if (val(field, 'control.attributes')) {
          
            attributes = {...attributes, ...field.control.attributes};
        }

        if (!attributes.hasOwnProperty('type')) {
            attributes.type = 'text';
        }
  
        let tag = val(field, 'control.tag') || 'input';

        if (!val(field, 'control.attributes.type')) {
            attributes.type = 'text';
        }

        if (val(field, 'control.render')) {
            return field.control.render(field, attributes);
        }
        switch (tag) {

            case 'select':
                const { options } = field.control;

                return (
                    <select
                        {...attributes}
                        value={options.find(o => o.text === fieldValue)?options.find(o => o.text === fieldValue).text:""}
                        onBlur={(e) => this.handleOnBlur(field.name, options.find(o => o.text === e.target.value).id)}
                        onChange={(e) => 
                        {
                            this.handleOnChange(field.name, options.find(o => o.text === e.target.value).text)
                        }
                    }>

                        { options && options.map( o => <option key={o.id} value={o.text} id={o.id}>{o.text}</option>)}

                    </select>
                );

            case 'textarea':
                return <textarea {...attributes}
                    onBlur={(e) => this.handleOnBlur(field.name, e.target.value)}
                    onChange={(e) => this.handleOnChange(field.name, e.target.value)}/>;

            default:
                return <Form.Control {...attributes}
                    onBlur={(e) => this.handleOnBlur(field.name, e.target.value)}
                    onChange={(e) => this.handleOnChange(field.name, e.target.value)}/>;
        }
    }

    renderCheckboxControl(field) {
        const fieldValue = this.props.data[field.name];

        let attributes = {
            value: fieldValue
        };

    
        if (val(field, 'control.render')) {
            return field.control.render(field, attributes);
        }

        return <input type="checkbox" {...attributes}
               onBlur={(e) => this.handleOnBlur(field.name, e.target.checked)}
               onChange={(e) => this.handleOnChange(field.name, e.target.checked)}/>;
    }
    renderCheckboxField(field) {
        const fieldState = this.state[field.name];

        let attributes = {className: "col-sm-6 col-md-3"};

        if (val(field, 'div.attributes')) {
            attributes = { ...attributes, ...field.div.attributes };
        }

        return <div key={field.name} {...attributes}>
            <div className={`checkbox${fieldState.isValid ? '' : ' has-error'}`}>
                <label>
                    {this.renderCheckboxControl(field)}
                    { field.label.text }
                </label>
                { val(field, 'tooltip.render') && field.tooltip.render(this.props.data, field) }
                <div className="help-block" style={{display: fieldState.isValid ? 'none' : null}}>
                    { this.renderValidationMessages(fieldState.messages) }
                </div>
            </div>
        </div>;
    }

    renderInputField(field) {
        const fieldState = this.state[field.name];

        let attributes = {className: ""};

        if (val(field, 'div.attributes')) {
            attributes = { ...attributes, ...field.div.attributes };
        }

        const formInline = (val(field, 'label.placement') === 'inline') ? 'form-inline ' : '';
        if (formInline) {
            attributes.className += ' form-inline';
        }

        return <div key={field.name} {...attributes} className="my-4">
            <div className={`form-group${fieldState.isValid ? '' : ' has-error'}`}>
                { this.renderLabel(field) }
                { val(field, 'tooltip.render') && field.tooltip.render(this.props.data, field) }
                { this.renderControl(field) }
                <div className="help-block" style={{display: fieldState.isValid ? 'none' : null}}>
                    { this.renderValidationMessages(fieldState.messages) }
                </div>
            </div>
        </div>;
    }

    renderField(field) {
        switch (field.type.toLowerCase()) {
            case 'boolean':
                return this.renderCheckboxField(field);
            default:
                return this.renderInputField(field);
        }
    }

    render() {
        return <form className="variable-height-rows">
            { this.props.fields.map(field => this.renderField(field)) }
            {(this.props.onFormSubmit)?<div>
                <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn text-primary border-primary mb-5 px-3 shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={this.props.onFormSubmit}
            >
              {this.props.title}
            </button>
            <button
              type="button"
              className="btn text-primary border-primary mb-5 px-3 mx-3 shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span>Cancel</span>
            </button>
          </div>
            </div>:<></>}
        </form>
    }
}

// SeroForm.propTypes = {
   
//     // data: t.object.isRequired,
  
//     onFormChange: t.func.isRequired,
//     /** A list of fields and their settings to determine how they should render and validate. */
//     fields: t.arrayOf(t.shape({
//         /** The field's name must match the name of a property on the 'data' object passed to the SeroForm component. */
//         name: t.string.isRequired,
//         type: t.oneOf(['string', 'number', 'boolean', 'object','date']).isRequired,
//         label: t.shape({
//             /** The inner text of the label to be displayed on the form.
//              *  If not specified, the field name will be displayed in brackets */
//             text: t.string,
//             /** 'inline' applies the Bootstrap 'form-inline' class to the div surrounding the 'form-group', so the label
//              *  appears on the left if there is enough space. */
//             placement: t.oneOf([/*default*/ 'top', 'inline']),
//             /** A hash of any valid React element attributes. These will get applied to the label element, merging with,
//              *  and overriding any attributes created by SeroForm during rendering. */
//             attributes: t.object,
//             /** A custom function for rending the label (ignored for checkbox controls), accepting parameters:
//              *  1.) an object containing the current form data
//              *  2.) the name of the field getting validated */
//             render: t.func
//         }),
//         div: t.shape({
//             /** A hash of any valid React element attributes. These will get applied to the div element that contains
//              *  the Bootstrap form-group which wraps the label and input control. These will merge with and override
//              *  any attributes created by SeroForm during rendering. */
//            attributes: t.object
//         }),
//         tooltip: t.shape({
//             /** A custom function for rending the tooltip. */
//             render: t.func
//         }),
//         control: t.shape({
//             /** The tag name of the HTML element.
//              *  Buttons are not supported, since they should be implemented by the parent component that hosts the form.
//              *  A button should call the validateAll method of the form, and only continue if it returns true.
//              *  A button could do this for multiple forms, or multiple instances of the same form, treating them like
//              *  a single logical form. */
//             tag: t.oneOf(['input', 'select']),
//             /** The data to populate a 'select' control's options. If the tag is 'select', these are required,
//              *  but there is no way to express that with PropTypes. */
//             options: t.arrayOf(t.shape({
//                 id: t.oneOfType([t.number, t.string]),
//                 text: t.string })
//             ),
//             /** A hash of any valid React element attributes. These will get applied to the control element, merging
//              *  with, and overriding any attributes created by SeroForm during rendering. */
//             attributes: t.object,
//             /** A custom function for rending the control (ignored for checkbox controls), accepting parameters:
//              *  1.) an object containing the current form data
//              *  2.) the name of the field getting validated */
//             render: t.func
//         }),
//         validators: t.arrayOf(t.shape({
//             /** A function accepting parameters:
//              *  1.) an object containing the new form data
//              *  2.) the name of the field getting validated
//              *  The form data is provided for cross-validation checks. If other fields should be validated together
//              *  add them to the dependentFields array below. */
//             validate: t.func,
//             message: t.string })
//         ),
//         /** An array of other field names that should have their validators called with this field. */
//         dependentFields: t.array
//     })).isRequired
// };

SeroForm.defaultProps = {
    data: {},
    onFormChange: function() {  }
};

export default SeroForm;