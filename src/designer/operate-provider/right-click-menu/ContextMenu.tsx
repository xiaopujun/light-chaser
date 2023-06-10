import React, {Component} from 'react';
import {observer} from "mobx-react";
import contextMenuStore from "./ContextMenuStore";
import designerStore from "../../store/DesignerStore";
import './OperateMenu.less';
import rightStore from "../../right/RightStore";
import {CopyOutlined, DeleteOutlined, LockOutlined, VerticalAlignTopOutlined} from "@ant-design/icons";

class ContextMenu extends Component {

    menuList = [
        {
            name: '锁定',
            icon: LockOutlined,
            onClick: () => {
                const {targetId} = contextMenuStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let item = layoutConfigs[targetId];
                updateLayout([{...item, locked: true}])
            }
        },
        {
            name: '解锁',
            icon: LockOutlined,
            onClick: () => {
                const {targetId} = contextMenuStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let item = layoutConfigs[targetId];
                updateLayout([{...item, locked: false}])
            }
        },
        // {
        //     name: '隐藏',
        //     icon: EyeInvisibleOutlined,
        //     onClick: (e: any) => alert('隐藏')
        // },
        {
            name: '复制',
            icon: CopyOutlined,
            onClick: (e: any) => {
                const {targetId} = contextMenuStore;
                const {copyItem} = designerStore;
                copyItem(targetId + '');
            }
        },
        {
            name: '置顶',
            icon: VerticalAlignTopOutlined,
            onClick: (e: any) => {
                let {targetId, maxLevel, setMaxLevel} = contextMenuStore;
                const {updateLayout, layoutConfigs} = designerStore;
                let item = layoutConfigs[targetId];
                updateLayout([{...item, zIndex: ++maxLevel}]);
                setMaxLevel(maxLevel);
            }
        },
        {
            name: '删除',
            icon: DeleteOutlined,
            onClick: (e: any) => {
                const {updateActive} = designerStore;
                const {targetId} = contextMenuStore;
                const {setContentVisible} = rightStore;
                setContentVisible(false);
                updateActive && updateActive({
                    id: -1,
                    type: 'LcBg'
                });
                targetId > -1 && designerStore.delItem(targetId)

            }
        },
    ]

    render() {
        const {visible, position = [0, 0], targetId} = contextMenuStore;
        let menuListDom = [];
        for (let i = 0; i < this.menuList.length; i++) {
            let menuItem = this.menuList[i];
            let Icon = menuItem.icon;
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>
                    <label><Icon/></label>
                    <span>{menuItem.name}</span>
                </div>
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

export default observer(ContextMenu);