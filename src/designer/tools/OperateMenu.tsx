import React, {Component} from 'react';
import {observer} from "mobx-react";
import lcRightMenuStore from "../store/LcRightMenuStore";
import lcDesignerContentStore from "../store/DesignerStore";
import '../style/LcRightMenu.less';

class OperateMenu extends Component {

    menuList = [
        {
            name: '删除',
            onClick: (e: any) => {
                const {targetId} = lcRightMenuStore;
                targetId > -1 && lcDesignerContentStore.delItem(targetId)
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