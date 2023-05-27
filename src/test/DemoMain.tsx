import React, {Component} from 'react';
import DemoSelect from "./Select";

class DemoMain extends Component {


    render() {
        let options = [
            {label: '选项一', value: '1'},
            {label: '选项二', value: '2'},
            {label: '选项三', value: '3'},
        ];


        return (
            <div>
                <DemoSelect options={options} dropdownStyle={{width: 200}} placeholder={'请选择'}/>
            </div>
        );
    }
}

export default DemoMain;