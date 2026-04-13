/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {observer} from "mobx-react";
import './LeftMenus.less';
import designerLeftStore, {ILeftMenu} from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {Brain, Connect, Layers, System} from "@icon-park/react";
import AiFusionPromptBar from "../ai-fusion/AiFusionPromptBar.tsx";


const menus: Array<ILeftMenu> = [
    {
        icon: <System theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "组件库",
        key: 'components',
    },
    {
        icon: <Connect theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "资源库",
        key: 'source-list',
    },
    // {
    //     icon: <Filter theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
    //     name: "过滤器",
    //     key: 'filter-list',
    // },
    {
        icon: <Layers theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>,
        name: "图层",
        key: 'layer-list',
    },
];

const LeftMenus = () => {
    const changeMenu = (menu: string) => {
        if (!menu || menu === '')
            return;
        const {setMenu} = designerLeftStore;
        designerLeftStore.setAiFusionVisible(false);
        setMenu(menu);
        //更新标尺位置
        const {rulerRef} = eventOperateStore;
        if (rulerRef)
            rulerRef.ruleWheel();
    }

    const handleAiFusion = () => {
        designerLeftStore.toggleAiFusionVisible();
    };

    const buildClassifyList = () => {
        const {menu} = designerLeftStore;
        const classifyArr = [];
        for (let i = 0; i < menus.length; i++) {
            const {icon: Icon, name, key} = menus[i];
            classifyArr.push(
                <div key={i + ''} className={`menu-item ${key === menu ? "menu-item-active" : ""}`}
                     onClick={() => changeMenu(key)}>
                    <div className={'menu-item-icon'}>{Icon}</div>
                    <span className={'menu-item-content'}>{name}</span>
                </div>
            )
        }
        return classifyArr;
    }

    return (
        <div className={'designer-left-menus'}>
            <div className={'designer-left-menus-top'}>
                {buildClassifyList()}
            </div>
            <div className={'designer-left-menus-bottom'}>
                <button
                    type="button"
                    className={`ai-fusion-button ${designerLeftStore.aiFusionVisible ? "ai-fusion-button-active" : ""}`}
                    onClick={handleAiFusion}
                    title="AI 优化"
                >
                    <Brain theme="filled" size={20} strokeWidth={2} strokeLinecap="square"/>
                    <span>AI 优化</span>
                </button>
            </div>
            <AiFusionPromptBar
                open={designerLeftStore.aiFusionVisible}
                onClose={() => designerLeftStore.setAiFusionVisible(false)}
            />
        </div>
    );
}

export default observer(LeftMenus);
