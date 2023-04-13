import React from 'react';
import  CKEditor  from 'react-ckeditor-component';

function App(props) {
    const change = (e) => {
        props.onChange(e.editor.getData());
    }
    return (
        <div className="App">
            <CKEditor
                content={props.defaultValue}
                name={props.name}
                className={props.className}
                events={{
                    "change": change
                  }}
            />
        </div>
    );
}

export default App;