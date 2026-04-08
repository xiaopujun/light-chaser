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
import designerLeftStore from "./DesignerLeftStore";
import './DesignerLeft.less';
import {useEffect, useRef} from "react";
import LeftMenus from "./designer-left-menus/LeftMenus.tsx";
import {ComponentList} from "./compoent-lib/ComponentList.tsx";
import LayerList from "./layer-list/LayerList.tsx";
import SourceList from "./source-list/SourceList.tsx";
import {FilterList} from "./filter-lilst/FilterList.tsx";

export const DesignerLeft = observer(() => {

    const {menu, setDesignerLeftRef} = designerLeftStore;
    const leftDomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setDesignerLeftRef(leftDomRef.current);
    }, []);

    return (
        <div className={'designer-left'} ref={leftDomRef}>
            <LeftMenus/>
            {menu === 'components' && <ComponentList/>}
            {menu === 'layer-list' && <LayerList/>}
            {menu === 'source-list' && <SourceList/>}
            {menu === 'filter-list' && <FilterList/>}
        </div>
    );
})

export default DesignerLeft;