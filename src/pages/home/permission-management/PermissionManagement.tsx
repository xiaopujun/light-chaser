import {ColumnsType} from "antd/es/table";
import {DataSourceConfigType} from "../datasource/edit/EditDataSourceDialog.tsx";
import {Button, Input, Table} from "antd";
import './PermissionManagement.less';
import {Add, Delete} from "@icon-park/react";
import {observer} from "mobx-react";
import permissionManagementStore, {IPermission} from "./PermissionManagementStore.ts";
import {Key, useEffect} from "react";
import PermissionPanel from "./PermissionPanel.tsx";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";

const {Search} = Input;

const columns: ColumnsType<object> = [
    {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: '权限名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '权限编码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '资源路径',
        dataIndex: 'resourcePath',
        key: 'resourcePath',
    },
    {
        title: '操作',
        key: 'operation',
        render: (record: DataSourceConfigType) => {
            const {id} = record;
            return <div>
                <a onClick={() => permissionManagementStore.doEditPermissionInfo(id!)}>编辑</a>&nbsp;&nbsp;
                <a onClick={() => {
                    globalModal.modalApi?.confirm({
                        okText: '确定',
                        cancelText: '取消',
                        title: '提示信息',
                        content: '删除权限会将与该权限绑定的角色关系一起删除，且无法撤销，确定删除该权限吗？',
                        onOk: () => permissionManagementStore.doBatchDeletePermission([id!]),
                    });
                }}>删除</a>&nbsp;&nbsp;
            </div>
        },
    }
];

const PermissionManagement = () => {
    const {
        permissionPageData,
        permission,
        permissionPanelVisible,
        setPermissionPanelVisible,
        openPermissionPanelWhenCreate,
        doBatchDeletePermission
    } = permissionManagementStore;
    const {current, records, size, total} = permissionPageData;
    let selectedIds: string[] = [];

    const rowSelection = {
        onChange: (selectedRowKeys: Key[]) => {
            selectedIds = [...selectedRowKeys as string[]];
        }
    };

    const doSubmit = (data: IPermission) => {
        if (data.id)
            permissionManagementStore.doUpdatePermission(data);
        else
            permissionManagementStore.docCreatePermission(data);
    }

    const onKeydown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        doSearch((event.target as any).value);
    }

    const doSearch = (value: string) => {
        permissionManagementStore.setSearchValue(value);
        permissionManagementStore.doGetPermissionList();
    }

    useEffect(() => {
        permissionManagementStore.doGetPermissionList();
        return () => {
            permissionManagementStore.destroy();
        }
    }, []);

    return (
        <div className="permission-management">
            <div className="permission-management-header">
                <Search placeholder="请输入权限名" size={"middle"} style={{width: 350}} onKeyDown={onKeydown}
                        onSearch={doSearch}/>
                <Button size={'middle'} type={"primary"}
                        onClick={() => openPermissionPanelWhenCreate()}><Add/>新增</Button>
                <Button size={'middle'} danger={true} type={"primary"}
                        onClick={() => {
                            if (selectedIds.length === 0)
                                return;
                            globalModal.modalApi?.confirm({
                                title: '删除确认',
                                content: '确定删除选中的用户吗？',
                                onOk: () => doBatchDeletePermission(selectedIds)
                            });
                        }}><Delete/>删除</Button>
            </div>
            <div className="permission-management-body">
                <Table dataSource={records} columns={columns}
                       rowSelection={{
                           type: 'checkbox',
                           ...rowSelection,
                       }}
                       onChange={(pagination) => permissionManagementStore.changeCurrentPage(pagination.current!)}
                       pagination={{
                           showTotal: () => `共${total}条`,
                           pageSize: size,
                           current: current,
                           total: total,
                       }}/>

            </div>
            <PermissionPanel visible={permissionPanelVisible} data={permission}
                             permissionTreeData={permissionManagementStore.permissionTreeData}
                             onClose={() => setPermissionPanelVisible(false)}
                             onSubmitted={doSubmit}/>
        </div>
    );
}

export default observer(PermissionManagement);