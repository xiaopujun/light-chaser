import React, {Component} from 'react';
import Radio from "../lib/lc-radio/Radio";

class DemoMain extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.click1)
    }

    click1 = () => {
    }

    click2 = () => {
    }

    render() {

        return (
            <Radio options={[
                {value: 'start', label: '前'},
                {value: 'center', label: '中'},
                {value: 'end', label: '后'}]} defaultValue={'center'}/>
        );
    }
}

export default DemoMain;