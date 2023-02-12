import React, {Component} from 'react';
import Localforage from 'localforage';

class FilePreview extends Component {
    state = {
        preview: null,
    };

    handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        Localforage.setItem("testFile", file).then((data) => {

        })

        const reader = new FileReader();

        // reader.onload = (event) => {
        //     this.setState({preview: event.target.result});
        // };

        reader.readAsDataURL(file);
    };

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleFileChange}/>
                {this.state.preview && <img src={this.state.preview}/>}
            </div>
        );
    }
}

export default FilePreview;
