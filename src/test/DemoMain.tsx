import React, {Component} from 'react';

class DemoMain extends Component {

    render() {
        return (
            <HookComp/>
        );
    }
}

export default DemoMain;

const HookComp: React.FC = () => {


    return (
        //这里的ref的作用是什么？
        <button>click me </button>
    );
}