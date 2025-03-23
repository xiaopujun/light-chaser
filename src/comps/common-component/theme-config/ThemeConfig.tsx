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

import {Component} from 'react';
import ThemeEditor from "./theme-editor/ThemeEditor";
import ThemeList from "./theme-list/ThemeList";
import {ThemeItemType} from "../../../designer/DesignerType";
import rightStore from "../../../designer/right/RightStore";
import layerManager from "../../../designer/manager/LayerManager.ts";
import Button from "../../../json-schema/ui/button/Button";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController.ts";
import {Modal} from "antd";

class ThemeConfig extends Component<{ controller: AbstractDesignerController }> {
    state = {
        editTheme: false,
    }

    openThemeEditor = () => this.setState({editTheme: true});

    closeEditor = () => this.setState({editTheme: false});

    themeChange = (theme: ThemeItemType) => {
        if (!theme) return;
        const {activeElem: {id}} = rightStore;
        const {compController} = layerManager;
        const instance = compController[id + ''];
        instance && instance.updateTheme(theme);
    }

    render() {
        return (
            <>
                <div className={'lc-theme-config'} style={{padding: 10}}>
                    <div className={'lc-theme-custom'}>
                        <Button onClick={this.openThemeEditor}>+ 自定义主题</Button>
                    </div>
                    <br/>
                    <ThemeList onSelected={this.themeChange}/>
                </div>
                <Modal title={'编辑主题'} open={this.state.editTheme} onCancel={this.closeEditor} width={860}
                       footer={null}>
                    <ThemeEditor/>
                </Modal>
            </>
        );
    }
}

export default ThemeConfig;