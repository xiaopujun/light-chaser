import React, {Component} from 'react';
import LcSwitch from "../lib/lc-switch/LcSwitch";

class Demo extends Component {

    state = {
        visible: true
    }

    onChange = (data: boolean) => {
        this.setState({
            visible: data
        })
    }

    render() {
        return (
            <div>
                <LcSwitch value={this.state.visible} onChange={this.onChange}/>
            </div>
        );
    }
}

export default Demo;