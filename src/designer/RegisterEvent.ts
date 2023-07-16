import contextMenuStore from "./operate-provider/right-click-menu/ContextMenuStore";
import eventOperateStore from "./operate-provider/EventOperateStore";
import eventManager from "./operate-provider/core/EventManager";
import {KMMap} from "./operate-provider/keyboard-mouse/KeyboardMouse";

export function registerEventOnDesignerLoaded() {
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
    eventManager.register('pointerdown', (e: PointerEvent) => {
        if (e.button === 0) {
            KMMap.leftClick = true;
        } else if (e.button === 2)
            KMMap.rightClick = true;
        const {setMouseDownTime} = contextMenuStore;
        setMouseDownTime(Date.now());
    });
    eventManager.register('pointerup', (e: PointerEvent) => {
        if (e.button === 0)
            KMMap.leftClick = false;
        else if (e.button === 2)
            KMMap.rightClick = false;
        const {setMouseUpTime} = contextMenuStore;
        setMouseUpTime(Date.now());
        const {setPointerTarget} = eventOperateStore;
        setPointerTarget(e.target);
    });
}