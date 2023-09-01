import {Component} from 'react';
import eventOperateStore from "../EventOperateStore";

export enum TriggerType {
    SINGLE,
    COILED
}

export interface HotKeyConfigType {
    [key: string]: {
        handler: Function,
        target?: any,
        triggerType?: TriggerType
    }
}

interface HotKeyProps {
    handlerMapping: HotKeyConfigType;
}

//需要屏蔽浏览器默认快捷键效果的快捷键列表
const shieldKeyList = ['control + s', 'alt', 'control + l', 'control + shift + l']

class HotKey extends Component<HotKeyProps> {

    handlerMapping: HotKeyConfigType = {}
    currHotKey: string[] = [];
    existHandlerKey: string = "";

    constructor(props: HotKeyProps) {
        super(props);
        this.handlerMapping = props.handlerMapping;
    }

    /**
     * 从快捷键配置管理映射表中匹配对应的快捷键处理函数并执行。
     * @param e 鼠标事件对象
     * @param hotKey 当前按下的快捷键
     */
    doHandler = (e: any, hotKey: string) => {
        const {handler, triggerType = TriggerType.SINGLE} = this.handlerMapping[hotKey] || {};
        if (handler) {
            if ((triggerType === TriggerType.SINGLE && this.existHandlerKey !== hotKey) || triggerType === TriggerType.COILED) {
                const {pointerTarget} = eventOperateStore;
                //todo 需要优化快捷键的执行范围
                const enforcementCap = document.querySelector('.lc-ruler-content');
                if (enforcementCap && (enforcementCap.contains(pointerTarget) || (pointerTarget && pointerTarget.classList.contains('layer-item')))) {
                    handler(e);
                    this.existHandlerKey = hotKey;
                }
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