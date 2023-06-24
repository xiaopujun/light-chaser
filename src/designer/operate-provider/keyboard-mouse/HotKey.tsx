import {Component} from 'react';
import eventOperateStore from "../EventOperateStore";

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

const shieldKeyList = ['control + s', 'alt']

class HotKey extends Component<HotKeyProps> {

    handlerMapping: HandlerMapping = {}
    currHotKey: string[] = [];
    existHandlerKey: string = "";

    constructor(props: HotKeyProps) {
        super(props);
        this.handlerMapping = props.handlerMapping;
    }

    doHandler = (e: any, hotKey: string) => {
        const {handler, target, triggerType = TriggerType.SINGLE} = this.handlerMapping[hotKey] || {};
        if (handler) {
            if ((triggerType === TriggerType.SINGLE && this.existHandlerKey !== hotKey) || triggerType === TriggerType.COILED) {
                const {pointerTarget} = eventOperateStore;
                if (target && !target.contains(pointerTarget))
                    return;
                handler(e);
                this.existHandlerKey = hotKey;
            }
        }
    }

    keyDown = (e: any) => {
        const key = e.key.toLowerCase();
        if (!this.currHotKey.some(item => item === key))
            this.currHotKey.push(key);
        let hotKey = this.currHotKey.join(' + ');
        if (shieldKeyList.some(item => item === hotKey))
            e.preventDefault();
        this.doHandler(e, hotKey);
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
            if (target && !target.contains(e.target))
                return;
            handler(e);
        }
    }

    /**
     * 失去焦点时清空当前热键（一般是切换屏幕）
     */
    onBlur = () => {
        this.currHotKey = [];
        this.existHandlerKey = '';
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        document.addEventListener('wheel', this.wheel);
        window.onblur = this.onBlur;
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        document.removeEventListener('wheel', this.wheel);
        window.onblur = null;
    }

    render() {
        return null;
    }
}

export default HotKey;