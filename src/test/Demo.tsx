import './DemoMain.less';
import "@amap/amap-jsapi-types";
import ContextMenu, {IContextMenuItem} from "../framework/context-menu/ContextMenu.tsx";
import {Add, Close} from "@icon-park/react";


export default function Demo() {
    const menus: IContextMenuItem[] = [
        {
            name: '菜单1',
            icon: Close,
            onClick: () => {
                console.log('菜单1');
            }
        },
        {
            name: '菜单2',
            icon: Add,
            onClick: () => {
                console.log('菜单2');
            }
        }
    ];
    return (
        <ContextMenu menus={menus} visible={true} position={[20, 100]}/>
    );
}
