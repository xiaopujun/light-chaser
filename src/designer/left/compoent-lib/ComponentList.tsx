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

import './ComponentList.less';
import {Tooltip} from "antd";
import designerLeftStore from "../DesignerLeftStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {componentCategorize, componentSubCategorize} from "./ComponentCategorize";
import componentListStore from "./ComponentListStore";
import {observer} from "mobx-react";
import {ComponentType, lazy, Suspense} from "react";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";
import {IIconProps} from "@icon-park/react/lib/runtime";
import {Close} from "@icon-park/react";

const CompList = lazy(() => import('./list/CompList'));


export const CategoryList = observer(() => {
    const {categories, setCategories, setSubCategories} = componentListStore;
    return (
        <>
            {
                componentCategorize.map((item, index) => {
                    const {icon, name, key} = item;
                    const Icon = icon as ComponentType<IIconProps>;
                    return <Tooltip key={index}
                                    className={`clo-item ${categories === key ? "clo-item-active" : ""}`}
                                    placement={'right'}
                                    title={name}>
                        <Icon theme="outline" strokeWidth={4}
                              onClick={() => {
                                  setCategories(key);
                                  setSubCategories('all');
                              }}/>
                    </Tooltip>
                })
            }
        </>
    )
});

export const SubCategoryList: React.FC = observer(() => {
    const {categories, subCategories, setSubCategories} = componentListStore;
    return (
        <>
            {
                componentSubCategorize.map((item, index) => {
                    const {name, key, parentKey} = item;
                    if (categories === 'all' || key === 'all' || parentKey === categories) {
                        return <div key={index}
                                    onClick={() => setSubCategories(key)}
                                    className={`clt-item ${subCategories === key ? " clt-item-active" : ""}`}>{name}</div>
                    }
                })
            }
        </>
    )
});


export const ComponentList = () => {
    return <div className={'dl-component-list'}>
        <div className={'dl-cl-header'}>
            <div className={'dl-cl-header-title'}>组件列表</div>
            <div className={'dl-cl-header-operate'}><Close style={{cursor: 'pointer'}} onClick={() => {
                const {setMenu} = designerLeftStore;
                setMenu("");
                const {rulerRef} = eventOperateStore;
                rulerRef?.ruleWheel();
            }}/></div>
        </div>
        <div className={'dl-cl-body'}>
            <Suspense fallback={<Loading/>}>
                <div className={'main-categories'}><CategoryList/></div>
                <div className={'sub-categories'}><SubCategoryList/></div>
                <div className={'component-list'}><CompList/></div>
            </Suspense>
        </div>
    </div>;
}
