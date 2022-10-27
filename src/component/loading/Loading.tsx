import React, {Component} from 'react';
import {Spin} from "antd";

class Loading extends Component {
    render() {
        const style = {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#4b6cb7',
            background: 'linear-gradient(to right, #182848, #1a2848)',
            color: 'rgb(106 202 255)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '300'
        }
        return (
            <div style={style}>
                <Spin tip={'L O A D I N G . . .'}/>
            </div>
        );
    }
}

export default Loading;