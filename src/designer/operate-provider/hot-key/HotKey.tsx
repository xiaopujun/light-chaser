import {Component} from 'react';
import eventOperateStore from "../EventOperateStore";
import {HotKeyConfigType, HotKeyTriggerType} from "./HotKeyType.ts";

//需要屏蔽浏览器默认快捷键效果的快捷键列表
const shieldKeyList = ['control + s', 'alt', 'control + l', 'control + shift + l', 'control + h', 'control + f',
    'control + k', 'control + 1', 'control + 2', 'control + 3', 'control + 4', 'control + 5', 'control + g', 'control + shift + g',]

interface HotKeyProps {
    handlerMapping: HotKeyConfigType;
}

class HotKey extends Component<HotKeyProps> {

    handlerMapping: HotKeyConfigType = {}
    currHotKey: string[] = [];
    existHandlerKey: string = "";
    specialDomCache: Record<string, HTMLElement> = {};

    constructor(props: HotKeyProps) {
        super(props);
        this.handlerMapping = props.handlerMapping;
    }

    getSpecialDomCache = (classSelector: string) => {
        //先从缓存中获取dom元素，如果没有则从document中获取并缓存
        const specialDom = this.specialDomCache[classSelector];
        if (specialDom)
            return specialDom;
        else {
            const specialDom = document.querySelector(classSelector);
            if (!specialDom)
                return null;
            this.specialDomCache[classSelector] = specialDom as HTMLElement;
            return specialDom;
        }
    }

    /**
     * 从快捷键配置管理映射表中匹配对应的快捷键处理函数并执行。
     * @param e 鼠标事件对象
     * @param hotKey 当前按下的快捷键
     */
    doHandler = (e: KeyboardEvent, hotKey: string) => {
        const {handler, triggerType = HotKeyTriggerType.SINGLE, range} = this.handlerMapping[hotKey] || {};
        if (handler) {
            if ((triggerType === HotKeyTriggerType.SINGLE && this.existHandlerKey !== hotKey) || triggerType === HotKeyTriggerType.COILED) {
                const {pointerTarget} = eventOperateStore;
                //如果设定了指定范围并且不在范围内则不执行
                if (range) {
                    //先从缓存中获取dom元素，如果没有则从document中获取并缓存
                    const targetDom = this.getSpecialDomCache(range);
                    if (!targetDom || !targetDom.contains(pointerTarget as Node))
                        return;
                }
                //其余情况均执行快捷键，如果是数组则遍历执行，反之直接执行
                if (Array.isArray(handler))
                    handler.forEach(func => func(e));
                else
                    handler(e);
                this.existHandlerKey = hotKey;
            }
        }
    }

    keyDown = (e: KeyboardEvent) => {
        const key = e.key?.toLowerCase();
        if (!key)
            return;
        if (!this.currHotKey.some(item => item === key))
            this.currHotKey.push(key);
        const hotKey = this.currHotKey.join(' + ');
        if (shieldKeyList.some(item => item === hotKey))
            e.preventDefault();
        this.doHandler(e, hotKey);
    };

    keyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (this.currHotKey.some(item => item === key)) {
            this.currHotKey = this.currHotKey.filter(item => item !== key);
            this.existHandlerKey = '';
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
        window.onblur = this.onBlur;
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        window.onblur = null;
    }

    render() {
        return null;
    }
}

export default HotKey;