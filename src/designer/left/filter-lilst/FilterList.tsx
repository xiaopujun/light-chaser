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

import './FilterList.less';
import designerLeftStore from "../DesignerLeftStore.ts";
import eventOperateStore from "../../operate-provider/EventOperateStore.ts";
import {observer} from "mobx-react";
import AddFilterDialog from "./AddFilterDialog.tsx";
import {Popconfirm} from "antd";
import {Close, Help, Plus} from "@icon-park/react";
import filterManager from "../../manager/FilterManager.ts";

export const FilterList = observer(() => {
    const {filters, setEditFilter, delFilter, setVisibility} = filterManager;

    return <>
        <div className={'dl-filter-list'}>
            <div className={'dl-fl-header'}>
                <div>全局过滤器</div>
                <div className="oerate-btn">
                    <Plus className='add' size={16} onClick={() => setVisibility(true)}/>
                    &nbsp;&nbsp;
                    <Close className="close" onClick={() => {
                        const {setMenu} = designerLeftStore;
                        setMenu("");
                        const {rulerRef} = eventOperateStore;
                        rulerRef?.ruleWheel();
                    }}/>
                </div>
            </div>
            <div className={'dl-fl-body'}>
                {
                    Object.values(filters).map((filter) => {
                        return <div className={'filter-item'} key={filter.id}>
                            <div className={'filter-name'}>{filter.name}</div>
                            <div className={'filter-operate'}>
                                <span onClick={() => {
                                    setEditFilter(filter);
                                    setVisibility(true);
                                }}>编辑</span>
                                &nbsp;&nbsp;
                                <Popconfirm title="提示信息"
                                            icon={<Help style={{color: 'red'}}/>}
                                            description="删除后无法撤销，确认删除嘛？"
                                            onConfirm={() => delFilter(filter.id)}
                                            okText="是"
                                            cancelText="否">
                                    <span>删除</span>
                                </Popconfirm>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        {filterManager.visible && <AddFilterDialog/>}
    </>
})
