import {  Button } from "react-bootstrap";
import FormLabel from "./formLabel";
import React, { Component } from "react";

class App extends Component {
    state = {
        selectedFile: null
    };

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "profile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        this.props.handleFileUploadSubmit(formData);
    };

    render() {
        
        return (
            <div>
                <FormLabel className="form-label" label="Attachments" />
                <div>
                    <input type="file"
                        onChange={this.onFileChange}
                    />
                    <Button onClick={this.onFileUpload} > Upload! </Button>
                </div>
            </div>
        );
    }
}

export default App;