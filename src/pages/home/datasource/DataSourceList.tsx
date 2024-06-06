import React, {Key, useEffect} from "react";
import dataSourceStore from "./DataSourceStore.ts";
import {Button, Input, Table} from "antd";
import EditDataSourceDialog, {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";
import {observer} from "mobx-react";
import {ColumnsType} from "antd/es/table";
import './DataSourceList.less';
import {Add, Delete} from "@icon-park/react";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";

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
        render: (record: DataSourceConfigType) => {
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
                <a onClick={() => dataSourceStore.testDataSource(id!)}>测试</a>&nbsp;&nbsp;
            </div>
        },
    }
];


const DataSourceList = observer(() => {
    const {createVisible, setCreateVisible, doBatchDeleteDataSource} = dataSourceStore;
    const onCreateClose = () => setCreateVisible(false);
    const onCreateSave = (data: DataSourceConfigType) => dataSourceStore.createDataSource(data);
    const {dataSourcePageData, editVisible, setEditVisible, dataSource} = dataSourceStore;
    const onEditClose = () => setEditVisible(false);
    const onEditSave = (data: DataSourceConfigType) => dataSourceStore.updateDataSource(data);

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
        dataSourceStore.getDataSourceList();
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
                            onClick={() => setCreateVisible(true)}>
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
            {editVisible &&
                <EditDataSourceDialog title={'编辑数据源'} data={dataSource} onSave={onEditSave}
                                      onClose={onEditClose}/>}
            {createVisible &&
                <EditDataSourceDialog title={'新建数据源'} onSave={onCreateSave} onClose={onCreateClose}/>}
        </div>
    );
})

export default DataSourceList