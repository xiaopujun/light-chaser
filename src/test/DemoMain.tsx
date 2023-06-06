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

    let a = 12;
    console.log('HookComp', a);
    const [state, setState] = React.useState(0);

    return (
        //这里的ref的作用是什么？
        <button onClick={() => setState(Date.now)} onChange={() => console.log('ddddd')}>click me </button>
    );
}