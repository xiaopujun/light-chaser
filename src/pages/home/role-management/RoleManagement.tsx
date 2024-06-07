import {ColumnsType} from "antd/es/table";
import {DataSourceConfigType} from "../datasource/edit/EditDataSourceDialog.tsx";
import {Button, Input, Table} from "antd";
import './RoleManagement.less';
import {Add, Delete} from "@icon-park/react";
import {observer} from "mobx-react";
import roleManagementStore, {IRole} from "./RoleManagementStore.ts";
import {Key, useEffect} from "react";
import RolePanel from "./RolePanel.tsx";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";

const {Search} = Input;

const columns: ColumnsType<object> = [
    {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '角色编码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '角色描述',
        dataIndex: 'des',
        key: 'des',
    },
    {
        title: '操作',
        key: 'operation',
        render: (record: DataSourceConfigType) => {
            const {id} = record;
            return <div>
                <a onClick={() => roleManagementStore.doEditRoleInfo(id!)}>编辑</a>&nbsp;&nbsp;
                <a onClick={() => {
                    globalModal.modalApi?.confirm({
                        title: '删除确认',
                        content: '确定删除该角色吗？',
                        onOk: () => roleManagementStore.doBatchDeleteRole([id!]),
                    });
                }}>删除</a>&nbsp;&nbsp;
            </div>
        },
    }
];

const RoleManagement = () => {
    const {
        rolePageData,
        role,
        rolePanelVisible,
        setRolePanelVisible,
        openRolePanelWhenCreate,
        doBatchDeleteRole
    } = roleManagementStore;
    const {current, records, size, total} = rolePageData;
    let selectedIds: string[] = [];

    const rowSelection = {
        onChange: (selectedRowKeys: Key[]) => {
            selectedIds = [...selectedRowKeys as string[]];
        }
    };

    const doSubmit = (data: IRole) => {
        if (data.id)
            roleManagementStore.doUpdateRole(data);
        else
            roleManagementStore.docCreateRole(data);
    }

    const onKeydown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        doSearch((event.target as any).value);
    }

    const doSearch = (value: string) => {
        roleManagementStore.setSearchValue(value);
        roleManagementStore.doGetRoleList();
    }

    useEffect(() => {
        roleManagementStore.doGetRoleList();
        return () => {
            roleManagementStore.destroy();
        }
    }, []);

    return (
        <div className="role-management">
            <div className="role-management-header">
                <Search placeholder="请输入角色名" size={"middle"} style={{width: 350}} onKeyDown={onKeydown}
                        onSearch={doSearch}/>
                <Button size={'middle'} type={"primary"} onClick={() => openRolePanelWhenCreate()}><Add/>新增</Button>
                <Button size={'middle'} danger={true} type={"primary"}
                        onClick={() => {
                            if (selectedIds.length === 0)
                                return;
                            globalModal.modalApi?.confirm({
                                title: '删除确认',
                                content: '确定删除选中的用户吗？',
                                onOk: () => doBatchDeleteRole(selectedIds)
                            });
                        }}><Delete/>删除</Button>
            </div>
            <div className="role-management-body">
                <Table dataSource={records} columns={columns}
                       rowSelection={{
                           type: 'checkbox',
                           ...rowSelection,
                       }}
                       onChange={(pagination) => roleManagementStore.changeCurrentPage(pagination.current!)}
                       pagination={{
                           showTotal: () => `共${total}条`,
                           pageSize: size,
                           current: current,
                           total: total,
                       }}/>

            </div>
            <RolePanel visible={rolePanelVisible} data={role} onClose={() => setRolePanelVisible(false)}
                       onSubmitted={doSubmit}/>
        </div>
    );
}

export default observer(RoleManagement);