import React, {Component} from 'react';
import keyboardMouse from "./keyboard-mouse/KeyboardMouse";
import scaleCore from "./scale/ScaleCore";
import eventManager from "./core/EventManager";
import eventOperateStore from "./EventOperateStore";

class DesignerContainer extends Component {

    dom: any;

    componentDidMount() {
        this.dom.addEventListener("click", this.handleClick);
        this.dom.addEventListener("contextmenu", this.handleContextMenu);
        //键盘事件绑定到document元素。 避免键盘事件无法命中特定的dom导致键盘事件失效。
        document.addEventListener("keyup", this.handleKeyUp);
        document.addEventListener("keydown", this.handleKeyDown);
        this.dom.addEventListener("wheel", this.handleWheel);
        this.dom.addEventListener("mousedown", this.handleMouseDown);
        this.dom.addEventListener("mouseup", this.handleMouseUp);
        this.dom.addEventListener("pointerdown", this.handlePointerDown);
        this.dom.addEventListener("pointermove", this.handlePointerMove);
        this.dom.addEventListener("pointerup", this.handlePointerUp);
    }

    componentWillUnmount() {
        this.dom.removeEventListener("click", this.handleClick);
        this.dom.removeEventListener("contextmenu", this.handleContextMenu);
        //键盘事件绑定到document元素。 避免键盘事件无法命中特定的dom导致键盘事件失效。
        document.removeEventListener("keyup", this.handleKeyUp);
        document.removeEventListener("keydown", this.handleKeyDown);
        this.dom.removeEventListener("wheel", this.handleWheel);
        this.dom.removeEventListener("mousedown", this.handleMouseDown);
        this.dom.removeEventListener("mouseup", this.handleMouseUp);
        this.dom.removeEventListener("pointerdown", this.handlePointerDown);
        this.dom.removeEventListener("pointermove", this.handlePointerMove);
        this.dom.removeEventListener("pointerup", this.handlePointerUp);
    }

    /**
     * 监听点击事件
     */
    handleClick = (event: any) => eventManager.emit('click', event);
    /**
     * 监听右键菜单事件
     */
    handleContextMenu = (event: any) => eventManager.emit('contextmenu', event);
    /**
     * 监听键盘抬起事件
     */
    handleKeyUp = (event: any) => {
        eventManager.emit('keyup', event);
    }
    /**
     * 监听键盘按下事件
     */
    handleKeyDown = (event: any) => {
        eventManager.emit('keydown', event)
    };
    /**
     * 监听鼠标滚轮事件
     */
    handleWheel = (event: any) => {
        if (keyboardMouse.Space && !keyboardMouse.RightClick) {
            const {setScale} = eventOperateStore;
            let type = 1;
            if (event.deltaY > 0)
                type = 0;
            scaleCore.compute(type);
            eventManager.emit('wheel', event);
            setScale(scaleCore.scale);
        }
    };
    /**
     * 监听鼠标按下事件
     */
    handleMouseDown = (event: any) => eventManager.emit('mousedown', event);
    /**
     * 监听鼠标抬起事件
     */
    handleMouseUp = (event: any) => eventManager.emit('mouseup', event);
    /**
     * 监听触摸屏按下事件
     */
    handlePointerDown = (event: any) => eventManager.emit('pointerdown', event);
    /**
     * 监听指针移动事件
     */
    handlePointerMove = (event: any) => eventManager.emit('pointermove', event);
    /**
     * 监听指针抬起事件
     */
    handlePointerUp = (event: any) => eventManager.emit('pointerup', event);

    render() {
        return (
            <div ref={dom => this.dom = dom} tabIndex={0} style={{outline: 'none'}} className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;