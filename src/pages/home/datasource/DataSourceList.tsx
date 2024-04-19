import {useEffect} from "react";
import dataSourceStore from "./DataSourceStore.ts";
import {Table} from "antd";
import EditDataSourceDialog, {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";
import {observer} from "mobx-react";
import {ColumnsType} from "antd/es/table";
import './DataSourceList.less';
import Button from "../../../json-schema/ui/button/Button.tsx";
import Input from "../../../json-schema/ui/input/Input.tsx";

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
                <a onClick={() => dataSourceStore.deleteDataSource(id!)}>删除</a>&nbsp;&nbsp;
                <a onClick={() => dataSourceStore.testDataSource(id!)}>测试</a>&nbsp;&nbsp;
            </div>
        },
    }
];


const DataSourceList = observer(() => {
    const {createVisible, setCreateVisible} = dataSourceStore;
    const onCreateClose = () => setCreateVisible(false);
    const onCreateSave = (data: DataSourceConfigType) => dataSourceStore.createDataSource(data);
    const {dataSourcePageData, editVisible, setEditVisible, dataSource} = dataSourceStore;
    const onEditClose = () => setEditVisible(false);
    const onEditSave = (data: DataSourceConfigType) => dataSourceStore.updateDataSource(data);


    const {current, records, size, total} = dataSourcePageData;

    useEffect(() => {
        dataSourceStore.getDataSourceList();
    }, []);

    return (
        <div className={'datasource-list'}>
            <div className={'datasource-list-header'}>
                <div className={'datasource-list-header-left'}>
                    <Input className={'list-search'} placeholder={'搜索数据源'} onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            dataSourceStore.searchValue = (e.currentTarget as HTMLInputElement).value;
                            dataSourceStore.getDataSourceList();
                        }
                    }}/>
                </div>
                <div className={'datasource-list-header-right'}>
                    <Button onClick={() => setCreateVisible(true)}>+ 新建数据源</Button>
                </div>
            </div>
            <div className={'datasource-list-body'}>
                <Table dataSource={records} columns={columns}
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