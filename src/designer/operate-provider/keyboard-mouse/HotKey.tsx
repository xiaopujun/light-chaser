import {Component} from 'react';

export enum TriggerType {
    SINGLE,
    COILED
}

export interface HandlerMapping {
    [key: string]: {
        handler: Function,
        target?: any,
        triggerType?: TriggerType
    }
}

interface HotKeyProps {
    handlerMapping: HandlerMapping;
}

class HotKey extends Component<HotKeyProps> {

    handlerMapping: HandlerMapping = {}
    currHotKey: string[] = [];
    existHandlerKey: string = "";

    constructor(props: HotKeyProps) {
        super(props);
        this.handlerMapping = props.handlerMapping;
    }

    keyDown = (e: any) => {
        e.preventDefault();
        const key = e.key.toLowerCase();
        if (!this.currHotKey.some(item => item === key))
            this.currHotKey.push(key);
        let hotKey = this.currHotKey.join(' + ');
        const {handler, target, triggerType = TriggerType.SINGLE} = this.handlerMapping[hotKey] || {};
        if (handler) {
            if ((triggerType === TriggerType.SINGLE && this.existHandlerKey !== hotKey) || triggerType === TriggerType.COILED) {
                if (target && target.contains(e.target))
                    handler(e);
                else
                    handler(e);
                this.existHandlerKey = hotKey;
            }
        }
    };

    keyUp = (e: any) => {
        const key = e.key.toLowerCase();
        if (this.currHotKey.some(item => item === key)) {
            this.currHotKey = this.currHotKey.filter(item => item !== key);
            this.existHandlerKey = '';
        }
    }

    wheel = (e: any) => {
        let hotKey = this.currHotKey.join(' + ') + ' + wheel';
        const {handler, target} = this.handlerMapping[hotKey] || {};
        if (handler) {
            if (target && target.contains(e.target))
                handler(e);
            else
                handler(e);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener('wheel', this.wheel);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('wheel', this.wheel);
    }

    render() {
        return null;
    }
}

export default HotKey;