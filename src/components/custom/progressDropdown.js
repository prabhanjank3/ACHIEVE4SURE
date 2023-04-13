import React from 'react';
import Select from 'react-select';
export default () => {
    let options = [{value:'1', label:'Defined'},
    {value:'2', label:'In Progress'},
    {value:'3', label:'Completed'},
    {value:'4', label:'Accepted'},
    {value:'5', label:'Blocked'}
    ];
    return <Select options={options} />
        
    
}