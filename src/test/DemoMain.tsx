import React, {Component} from 'react';
import Radio from "../lib/lc-radio/Radio";
import {merge} from "lodash";

class DemoMain extends Component {

    render() {
        return (
            <HookComp/>
        );
    }
}

export default DemoMain;

const HookComp: React.FC = () => {

    let a = 12;
    console.log('HookComp', a);
    const [state, setState] = React.useState(0);

    return (
        //这里的ref的作用是什么？
        <button ref={'test'}>click me </button>
    );
}