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

import React, {Key, useEffect} from "react";
import dataSourceStore, {IDataSource} from "./DataSourceStore.ts";
import {Button, Input, Table} from "antd";
import {observer} from "mobx-react";
import {ColumnsType} from "antd/es/table";
import './DataSourceList.less';
import {Add, Delete} from "@icon-park/react";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";
import DataSourcePanel from "./DataSourcePanel.tsx";

const {Search} = Input;


const columns: ColumnsType<object> = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '链接地址',
        dataIndex: 'url',
        key: 'url',
        width: '40%'
    },
    {
        title: '操作',
        key: 'operation',
        render: (record: IDataSource) => {
            const {id} = record;
            return <div>
                <a onClick={() => dataSourceStore.openDataSourceEditor(id!)}>编辑</a>&nbsp;&nbsp;
                <a onClick={() => dataSourceStore.copyDataSource(id!)}>复制</a>&nbsp;&nbsp;
                <a onClick={() => {
                    globalModal.modalApi?.confirm({
                        title: '删除确认',
                        content: '确定删除该数据源吗？',
                        onOk: () => dataSourceStore.doBatchDeleteDataSource([id!])
                    });
                }}>删除</a>&nbsp;&nbsp;
                <a onClick={() => dataSourceStore.testConnect(id!)}>测试</a>&nbsp;&nbsp;
            </div>
        },
    }
];


const DataSourceList = observer(() => {
    const {
        doBatchDeleteDataSource,
        setPanelVisible,
        doCreateOrUpdateDataSource,
        init,
        destroy,
        panelVisible,
        dataSourcePageData,
        dataSource
    } = dataSourceStore;
    const {current, records, size, total} = dataSourcePageData;
    let selectedIds: string[] = []

    const rowSelection = {
        onChange: (selectedRowKeys: Key[]) => {
            selectedIds = [...selectedRowKeys as string[]];
        }
    };

    const doSearch = (value: string) => {
        dataSourceStore.searchValue = value;
        dataSourceStore.getDataSourceList();
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        doSearch((event.target as any).value);
    }

    useEffect(() => {
        init();
        return () => {
            destroy();
        }
    }, []);

    return (
        <div className={'datasource-list'}>
            <div className={'datasource-list-header'}>
                <div className={'datasource-list-header-left'}>
                    <Search placeholder="搜索数据源" size={"middle"}
                            className={'project-list-search'}
                            onKeyDown={onKeyDown}
                            onSearch={doSearch}
                            style={{width: 350}}/>
                    <Button className="operate-btn" size={'middle'} type={"primary"}
                            onClick={() => setPanelVisible(true)}>
                        <Add style={{position: 'relative', top: 2, marginRight: 3}}/>新建数据源</Button>
                    <Button className="operate-btn" size={'middle'} danger={true} type={"primary"}
                            onClick={() => {
                                if (selectedIds.length === 0)
                                    return;
                                globalModal.modalApi?.confirm({
                                    title: '删除确认',
                                    content: '确定删除选中的数据源吗？',
                                    onOk: () => doBatchDeleteDataSource(selectedIds)
                                });
                            }}><Delete
                        style={{position: 'relative', top: 2, marginRight: 3}}/>删除</Button>
                </div>
                <div className={'datasource-list-header-right'}>
                </div>
            </div>
            <div className={'datasource-list-body'}>
                <Table dataSource={records} columns={columns}
                       rowSelection={{
                           type: 'checkbox',
                           ...rowSelection,
                       }}
                       onChange={(pagination) => dataSourceStore.changeCurrentPage(pagination.current!)}
                       pagination={{
                           showTotal: () => `共${total}条`,
                           pageSize: size,
                           current: current,
                           total: total,
                       }}/>
            </div>
            <DataSourcePanel visible={panelVisible}
                             title={dataSource.id ? '编辑数据源' : '新建数据源'}
                             data={dataSource}
                             onClose={() => setPanelVisible(false)}
                             onSubmitted={doCreateOrUpdateDataSource}/>
        </div>
    );
})

export default DataSourceList