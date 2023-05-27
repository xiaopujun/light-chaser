import React, {Component} from 'react';
import {Spin} from "antd";

interface LoadingProps {
    width?: string | number;
    height?: string | number;
}

class Loading extends Component<LoadingProps> {
    render() {
        const {width = window.innerWidth, height = window.innerHeight} = this.props;
        const style = {
            width,
            height,
            backgroundColor: '#4b6cb7',
            background: 'linear-gradient(to right, #182848, #1a2848)',
            color: '#1db3ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '300'
        }
        return (
            <div style={style}>
                <Spin tip={'loading...'}/>
            </div>
        );
    }
}

export default Loading;