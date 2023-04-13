import React from 'react';
import Select from 'react-select';
const CustomSelect =  (props) => {
    return <Select value={props.options.filter((option) => 
        option.value === props.defaultValue
    )} options={props.options} components={props.components} onChange={(option) => props.onChange(props.name, option.value)} name={props.name} />
}
export default CustomSelect;