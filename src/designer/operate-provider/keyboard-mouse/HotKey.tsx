import React, {Component} from 'react';

interface HotKeyProps {
    handlerMapping: { [key: string]: Function };
}

class HotKey extends Component<HotKeyProps> {

    handlerMapping: { [key: string]: Function } = {}
    currHotKey: string[] = [];

    constructor(props: HotKeyProps) {
        super(props);
        this.handlerMapping = props.handlerMapping;
    }

    keyDown = (e: any) => {
        e.preventDefault();
        const key = e.key.toLowerCase();
        if (this.currHotKey.some(item => item === key))
            return;
        else
            this.currHotKey.push(key);
        let hotKey = this.currHotKey.join(' + ');
        this.handlerMapping[hotKey] && this.handlerMapping[hotKey]();
        console.log(hotKey);
    };

    keyUp = (e: any) => {
        const key = e.key.toLowerCase();
        if (this.currHotKey.some(item => item === key))
            this.currHotKey = this.currHotKey.filter(item => item !== key);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
    }

    render() {
        return null;
    }
}

export default HotKey;