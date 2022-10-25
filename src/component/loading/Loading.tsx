import React, {Component} from 'react';

class Loading extends Component {
    render() {
        const style = {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: '#4b6cb7',
            background: 'linear-gradient(to right, #182848, #283a62)',
            color: 'rgb(106 202 255)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '300'
        }
        return (
            <div style={style}>
                light chaser loading ...
            </div>
        );
    }
}

export default Loading;