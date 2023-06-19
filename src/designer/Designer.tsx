import React, {Component} from 'react';
import DesignerCanvas from "./canvas/DesignerCanvas";
import DesignerHeader from "./header/DesignerHeader";
import LcHeader from "./structure/LcHeader";
import LcBody from "./structure/LcBody";
import LcLeft from "./structure/LcLeft";
import LcContent from "./structure/LcContent";
import LcRight from "./structure/LcRight";
import LcStructure from "./structure/LcStructure";
import LcFoot from "./structure/LcFoot";
import DesignerLeft from "./left";
import Right from "./right";
import DesignerFooter from "./footer/DesignerFooter";
import contextMenuStore from "./operate-provider/right-click-menu/ContextMenuStore";
import eventManager from "./operate-provider/core/EventManager";
import eventOperateStore from "./operate-provider/EventOperateStore";
import {loadDesigner} from "./LoadDesigner";
import {KMMap} from "./operate-provider/keyboard-mouse/KeyboardMouse";

class Designer extends Component<any> {

    constructor(props: any) {
        super(props);
        loadDesigner();
    }

    componentDidMount() {
        const {setPosition, updateVisible} = contextMenuStore;
        const {setUnLockedId} = eventOperateStore;
        eventManager.register('click', (e: any) => {
            const {visible, updateVisible} = contextMenuStore;
            if (visible && e.button === 0) {
                //这里添加异步处理的原因：必须要在操作菜单执行点击事件执行之后才能卸载dom元素，不然操作菜单的点击事件会失效。
                setTimeout(() => {
                    updateVisible(false);
                });
            }
        });
        eventManager.register('contextmenu', (event: any) => {
            event.preventDefault();
            const {mouseDownTime, mouseUpTime} = contextMenuStore;
            let targetArr = ['lc-comp-item', 'moveable-area'];
            if (targetArr.some((item: string) => event.target.classList.contains(item)) && mouseUpTime - mouseDownTime < 200) {
                updateVisible && updateVisible(true);
                setPosition([event.clientX, event.clientY]);
                setUnLockedId(event.target.id);
            } else {
                updateVisible && updateVisible(false);
            }
        });
        eventManager.register('mousedown', () => {
            const {setMouseDownTime} = contextMenuStore;
            setMouseDownTime(Date.now());
        });
        eventManager.register('mouseup', () => {
            const {setMouseUpTime} = contextMenuStore;
            setMouseUpTime(Date.now());
        });
        eventManager.register('pointerdown', (e: PointerEvent) => {
            if (e.button === 0)
                KMMap.leftClick = true;
            else if (e.button === 2)
                KMMap.rightClick = true;
        });
        eventManager.register('pointerup', (e: PointerEvent) => {
            if (e.button === 0)
                KMMap.leftClick = false;
            else if (e.button === 2)
                KMMap.rightClick = false;
        });
    }

    render() {
        return (
            <LcStructure>
                <LcHeader>
                    <DesignerHeader/>
                </LcHeader>
                <LcBody>
                    <LcLeft><DesignerLeft/></LcLeft>
                    <LcContent><DesignerCanvas/></LcContent>
                    <LcRight><Right/></LcRight>
                </LcBody>
                <LcFoot>
                    <DesignerFooter/>
                </LcFoot>
            </LcStructure>
        );
    }
}

export default Designer;