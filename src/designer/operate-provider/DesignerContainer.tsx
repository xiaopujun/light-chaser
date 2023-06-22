import React, {Component} from 'react';
import eventManager from "./core/EventManager";

class DesignerContainer extends Component {

    designerContainerRef: any;

    componentDidMount() {
        this.designerContainerRef.addEventListener("click", this.handleClick);
        this.designerContainerRef.addEventListener("contextmenu", this.handleContextMenu);
        this.designerContainerRef.addEventListener("pointerdown", this.handlePointerDown);
        document.addEventListener("pointermove", this.handlePointerMove);
        this.designerContainerRef.addEventListener("pointerup", this.handlePointerUp);
    }

    componentWillUnmount() {
        this.designerContainerRef.removeEventListener("click", this.handleClick);
        this.designerContainerRef.removeEventListener("contextmenu", this.handleContextMenu);
        this.designerContainerRef.removeEventListener("pointerdown", this.handlePointerDown);
        document.removeEventListener("pointermove", this.handlePointerMove);
        this.designerContainerRef.removeEventListener("pointerup", this.handlePointerUp);
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
            <div ref={dom => this.designerContainerRef = dom} style={{outline: 'none'}}
                 className={'lc-event-container'}>
                {this.props.children}
            </div>
        );
    }
}

export default DesignerContainer;