import React, {Component} from 'react';
import keyboardMouse from "./keyboard-mouse/KeyboardMouse";
import scaleCore from "../../framework/scale/ScaleCore";
import eventManager from "./core/EventManager";
import eventOperateStore from "./EventOperateStore";

class DesignerContainer extends Component {

    dom: any;

    componentDidMount() {
        this.dom.addEventListener("click", this.handleClick);
        this.dom.addEventListener("contextmenu", this.handleContextMenu);
        this.dom.addEventListener("keyup", this.handleKeyUp);
        this.dom.addEventListener("keydown", this.handleKeyDown);
        this.dom.addEventListener("wheel", this.handleWheel);
        this.dom.addEventListener("mousemove", this.handleMouseMove);
        this.dom.addEventListener("mousedown", this.handleMouseDown);
        this.dom.addEventListener("mouseup", this.handleMouseUp);
        this.dom.addEventListener("pointerdown", this.handlePointerDown);
        this.dom.addEventListener("pointermove", this.handlePointerMove);
        this.dom.addEventListener("pointerup", this.handlePointerUp);
        this.dom.addEventListener("pointercancel", this.handlePointerCancel);
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
    handleKeyDown = (event: any) => eventManager.emit('keydown', event);
    /**
     * 监听鼠标滚轮事件
     */
    handleWheel = (event: any) => {
        if (keyboardMouse.Space) {
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
     * 监听鼠标移动事件
     */
    handleMouseMove = (event: any) => eventManager.emit('mousemove', event);
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
    /**
     * 监听指针取消事件
     */
    handlePointerCancel = (event: any) => eventManager.emit('pointercancel', event);

    render() {
        return (
            <div ref={dom => this.dom = dom} tabIndex={0} style={{outline: 'none'}} className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;