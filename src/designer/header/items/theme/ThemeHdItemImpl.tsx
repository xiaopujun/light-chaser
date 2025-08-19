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
import {useRef, useState} from 'react';
import './ThemeHdItem.less';
import ThemeList from "../../../../comps/common-component/theme-config/theme-list/ThemeList";
import {ThemeItemType} from "../../../DesignerType";
import layerManager from "../../../manager/LayerManager.ts";
import ThemeEditor from "../../../../comps/common-component/theme-config/theme-editor/ThemeEditor";
import themeManager from "./ThemeManager.ts";
import {Button, Modal} from 'antd';

const ThemeHdItemImpl = () => {
    const selectedThemeRef = useRef<ThemeItemType>();
    const [openEditor, setOpenEditor] = useState(false);
    const {themeVisible, setThemeVisible} = themeManager;

    const onClose = () => setThemeVisible(false);

    const updateGlobalTheme = () => {
        const {flashGlobalTheme} = layerManager;
        if (selectedThemeRef.current) {
            flashGlobalTheme(selectedThemeRef.current);
            onClose();
        }
    }

    return (
        <>
            <Modal title={<span style={{fontSize: '18px', fontWeight: 600}}>全局主题</span>}
                   width={500}
                   open={themeVisible}
                   onCancel={onClose}
                   footer={[
                       <Button key="global-theme" type="primary" onClick={updateGlobalTheme} style={{marginRight: 8}}>
                           更新全局主题
                       </Button>,
                       <Button key="custom-theme" onClick={() => setOpenEditor(true)} style={{marginRight: 8}}>
                           自定义主题
                       </Button>,
                       <Button key="cancel" onClick={onClose}>
                           取消
                       </Button>,
                   ]}
                   className="lc-theme-config-global"
                   style={{padding: '16px 0'}}>
                <div style={{
                    maxHeight: 360,
                    overflowY: "auto",
                    padding: '8px 0',
                    marginBottom: 16,
                    borderRadius: 8
                }}>
                    <ThemeList onSelected={(value) => selectedThemeRef.current = value}/>
                </div>
                <p style={{
                    color: '#FF6E6E',
                    fontSize: 12,
                    lineHeight: '16px',
                    margin: 0
                }}>
                    警告：全局主题设置在更新后，会影响到当前项目的所有组件。请谨慎操作！
                </p>
            </Modal>
            <Modal title={<span style={{fontSize: '18px', fontWeight: 600}}>编辑主题</span>}
                   open={openEditor}
                   onCancel={() => setOpenEditor(false)}
                   width={890}
                   className={'lc-edit-theme-config'}
                   footer={null}>
                <ThemeEditor/>
            </Modal>
        </>
    );
}

export default ThemeHdItemImpl;