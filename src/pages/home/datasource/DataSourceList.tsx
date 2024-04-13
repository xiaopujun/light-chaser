import {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import EditDataSourceDialog, {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";
import {observer} from "mobx-react";
import dataSourceStore from "./DataSourceStore.ts";

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
    const {dataSourceList, editVisible, setEditVisible, dataSource} = dataSourceStore;
    const onClose = () => setEditVisible(false);
    const onSave = (data: DataSourceConfigType) => dataSourceStore.updateDataSource(data);

    return (
        <>
            <Table dataSource={dataSourceList} columns={columns}/>
            {editVisible &&
                <EditDataSourceDialog title={'编辑数据源'} data={dataSource} onSave={onSave} onClose={onClose}/>}
        </>
    )
})

export default DataSourceList



