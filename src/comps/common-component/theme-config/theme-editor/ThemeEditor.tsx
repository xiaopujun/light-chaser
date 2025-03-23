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

import {MouseEvent, useState} from 'react';
import './ThemeEditor.less';
import {ThemeItemType} from "../../../../designer/DesignerType";
import ThemeList from "../theme-list/ThemeList";
import cloneDeep from "lodash/cloneDeep";
import {CardPanel} from "../../../../json-schema/ui/card-panel/CardPanel";
import Button from "../../../../json-schema/ui/button/Button";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import themeManager from "../../../../designer/header/items/theme/ThemeManager.ts";

const defaultThemeConfig: ThemeItemType = {
    id: '',
    name: '',
    colors: {
        main: '#000000',
        mainText: '#000000',
        background: '#000000',
        subText: '#000000',
        supplementFirst: '#000000',
        supplementSecond: '#000000'
    }
};

const ThemeEditor = () => {
    const [themeList, setThemeList] = useState<ThemeItemType[]>(cloneDeep(themeManager.themeConfig) || []);
    const [themeConfig, setThemeConfig] = useState<ThemeItemType>(cloneDeep(defaultThemeConfig));

    const doSaveOrUpd = (e: MouseEvent<HTMLButtonElement> | undefined) => {
        e?.preventDefault();
        if (themeConfig.name === '') {
            globalMessage.messageApi?.warning('请输入主题名称');
            return;
        }
        if (themeConfig.id === '') {
            if (themeList.length > 20)
                globalMessage.messageApi?.warning('主题数量不能超过20');
            for (let i = 0; i < themeList.length; i++) {
                if (themeList[i].name === themeConfig.name) {
                    globalMessage.messageApi?.warning('主题名称不能重复');
                    return;
                }
            }
            themeConfig.id = themeList.length + 1 + '';
            themeList.push({...themeConfig});
        } else {
            for (let i = 0; i < themeList.length; i++) {
                if (themeList[i].id === themeConfig.id) {
                    themeList[i] = {...themeConfig};
                    break;
                }
            }
            themeConfig.id = '';
        }
        setThemeList(themeList)
        setThemeConfig(cloneDeep(defaultThemeConfig));
        //保存到数据库
        const {updateThemeConfig} = themeManager;
        updateThemeConfig(themeList);
    }

    const onDel = (id: string) => {
        const newData = themeList.filter((item: ThemeItemType) => item.id !== id);
        setThemeList(newData);
    }

    const onSelected = (data: ThemeItemType) => {
        if (themeConfig.id === data.id)
            setThemeConfig(cloneDeep(defaultThemeConfig));
        else
            setThemeConfig(data);
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        const newData = {...ObjectUtil.merge(themeConfig, dataFragment)};
        setThemeConfig(newData);
    }

    const schema: Control[] = [
        {
            type: 'card-panel',
            label: '主题信息',
            children: [
                {
                    type: 'grid',
                    children: [
                        {
                            key: 'name',
                            type: "input",
                            label: '主题名称',
                            value: themeConfig.name,
                            reRender: true
                        }
                    ]
                }
            ]
        },
        {
            type: 'card-panel',
            label: '颜色定义',
            key: 'colors',
            children: [
                {
                    type: 'grid',
                    config: {columns: 2, gridGap: '20px'},
                    children: [
                        {
                            key: 'main',
                            type: "color-picker",
                            label: '主体色',
                            value: themeConfig.colors.main,
                            config: {showText: true},
                            reRender: true
                        },
                        {
                            key: 'mainText',
                            type: "color-picker",
                            label: '主文字',
                            value: themeConfig.colors.mainText,
                            config: {showText: true},
                            reRender: true
                        },
                        {
                            key: 'subText',
                            type: "color-picker",
                            label: '副文字',
                            value: themeConfig.colors.subText,
                            config: {showText: true},
                            reRender: true
                        },
                        {
                            key: 'background',
                            type: "color-picker",
                            label: '背景色',
                            value: themeConfig.colors.background,
                            config: {showText: true},
                            reRender: true
                        },
                        {
                            key: 'supplementFirst',
                            type: "color-picker",
                            label: '辅助色1',
                            value: themeConfig.colors.supplementFirst,
                            config: {showText: true},
                            reRender: true
                        },
                        {
                            key: 'supplementSecond',
                            type: "color-picker",
                            label: '辅助色2',
                            value: themeConfig.colors.supplementSecond,
                            config: {showText: true},
                            reRender: true
                        }
                    ]
                }
            ]
        }
    ];

    return (
        <div className={'lc-theme-editor'}>
            <div className={'editor-left'}>
                <LCGUI schema={schema} onFieldChange={onFieldChange}/>
                <p style={{
                    color: '#6e6e6e',
                    fontSize: 12
                }}>说明：自定义主题色的色值应该保持在同一色系。以确保整体统一的风格。主题色占据主要面积</p>
                <div className={'theme-operate-btn'}>
                    <Button onClick={doSaveOrUpd}>添加 / 更新</Button>
                </div>
            </div>
            <div className={'editor-right'}>
                <CardPanel label={'主题列表'}>
                    <ThemeList showOperator={true} onSelected={onSelected} onDel={onDel}/>
                </CardPanel>
            </div>
        </div>
    );

}


export default ThemeEditor;