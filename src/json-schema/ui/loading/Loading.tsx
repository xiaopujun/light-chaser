import {Component} from 'react';

interface LoadingProps {
    width?: string | number;
    height?: string | number;
}

class Loading extends Component<LoadingProps> {
    render() {
        const {width = '100%', height = '100%'} = this.props;
        const style = {
            width,
            height,
            backgroundColor: '#374f85',
            background: 'linear-gradient(to right, #182848, #1a2848)',
            color: '#1db3ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '300'
        }
        return (
            <div style={style}>加 载 中 . . . . . .</div>
        );
    }
}

export default Loading;