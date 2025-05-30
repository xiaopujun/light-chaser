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

import {useState} from 'react';
import {ThemeColors, ThemeItemType} from "../../../../designer/DesignerType";
import ThemeItem from "../theme-item/ThemeItem";
import {observer} from "mobx-react";
import themeManager from "../../../../designer/header/items/theme/ThemeManager.ts";

interface ThemeListProps {
    data?: ThemeItemType[];
    onSelected?: (data: ThemeItemType) => void;
    showOperator?: boolean;
    onDel?: (id: string) => void;
}

const ThemeList = observer((props: ThemeListProps) => {
    const {onSelected, showOperator, onDel} = props;
    const [activeId, setActiveId] = useState('');

    const _onDel = (id: string) => {
        const {themeConfig, updateThemeConfig} = themeManager;
        const newThemes = themeConfig!.filter((item: ThemeItemType) => item.id !== id);
        updateThemeConfig(newThemes);
        onDel && onDel(id);
    }


    const _onSelected = (data: ThemeItemType) => {
        onSelected && onSelected(data);
        if (data.id !== activeId)
            setActiveId(data.id);
        else
            setActiveId('');
    }

    const {themeConfig} = themeManager;
    const themeList = [];
    for (let i = 0; i < themeConfig!.length; i++) {
        themeList.push(<ThemeItem key={i} id={themeConfig![i].id} selected={themeConfig![i].id === activeId}
                                  name={themeConfig![i].name}
                                  showOperator={showOperator}
                                  onDel={_onDel}
                                  onSelected={_onSelected}
                                  colors={themeConfig![i].colors as ThemeColors}/>)
    }
    return (
        <div className={'lc-theme-list'} style={{width: '100%'}}>
            {themeList}
        </div>
    );
});

export default ThemeList;