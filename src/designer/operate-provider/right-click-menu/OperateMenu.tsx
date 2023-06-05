import React, {Component} from 'react';
import {observer} from "mobx-react";
import lcRightMenuStore from "./LcRightMenuStore";
import designerStore from "../../store/DesignerStore";
import './OperateMenu.less';
import rightStore from "../../right/RightStore";

class OperateMenu extends Component {

    menuList = [
        {
            name: '删除',
            onClick: (e: any) => {
                const {updateActive} = designerStore;
                const {targetId} = lcRightMenuStore;
                const {setContentVisible} = rightStore;
                setContentVisible(false);
                updateActive && updateActive({
                    id: -1,
                    type: 'LcBg'
                });
                targetId > -1 && designerStore.delItem(targetId)

            }
        },
        {
            name: '上移一层',
            onClick: (e: any) => alert('上移一层')
        },
        {
            name: '下移一层',
            onClick: (e: any) => alert('下移一层')
        },
        {
            name: '移至最前',
            onClick: (e: any) => alert('移至最前')
        },
        {
            name: '移至最后',
            onClick: (e: any) => alert('移至最后')
        },
    ]

    render() {
        const {visible, position = [0, 0]} = lcRightMenuStore;
        let menuListDom = [];
        for (let i = 0; i < this.menuList.length; i++) {
            let menuItem = this.menuList[i];
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>{menuItem.name}</div>
            )
        }
        return (
            <>
                {visible &&
                <div className={'lc-right-menu'} style={{
                    position: 'fixed',
                    top: position[1],
                    left: position[0]
                }}>
                    {menuListDom}
                </div>}
            </>
        );
    }
}

export default observer(OperateMenu);