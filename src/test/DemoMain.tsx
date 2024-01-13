import React from 'react';
import './DemoMain.less';
import Select from "../ui/select/Select";
import Switch from "../ui/switch/Switch";


export default function DemoMain() {
    return (
        <div style={{padding: 10}}>
            <Switch defaultValue={true}/>
            <Select options={[
                {label: '选项1', value: '1'},
                {label: '选项2', value: '2'}
            ]} value={'1'}/>
        </div>
    )
}
