import {ColumnsType} from "antd/es/table";
import {Button, Input, Table} from "antd";
import './UserManagement.less';
import {Add, Delete, Warehousing} from "@icon-park/react";
import {observer} from "mobx-react";
import userManagementStore, {IUser} from "./UserManagementStore.ts";
import {Key, KeyboardEvent, useEffect} from "react";
import UserPanel from "./UserPanel.tsx";
import {globalModal} from "../../../framework/message/GlobalModal.tsx";

const {Search} = Input;

const columns: ColumnsType<object> = [
    {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: '账户',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '操作',
        key: 'operation',
        render: (record: IUser) => {
            const {id} = record;
            return <div>
                <a onClick={() => userManagementStore.doEditUserInfo(id!)}>编辑</a>&nbsp;&nbsp;
                <a onClick={() => {
                    globalModal.modalApi?.confirm({
                        title: '删除确认',
                        content: '确定删除该用户吗？',
                        onOk: () => userManagementStore.doBatchDeleteUser([id!]),
                    });
                }}>删除</a>&nbsp;&nbsp;
            </div>
        },
    }
];

const UserManagement = () => {
    const {
        userPageData,
        user,
        userPanelVisible,
        setUserPanelVisible,
        openUserPanelWhenCreate,
        doBatchDeleteUser,
        doUpdateUser,
        docCreateUser,
        setSearchValue,
        doGetUserList,
        changeCurrentPage,
        destroy
    } = userManagementStore;
    const {current, records, size, total} = userPageData;
    let selectedIds: string[] = [];

    const rowSelection = {
        onChange: (selectedRowKeys: Key[]) => {
            selectedIds = [...selectedRowKeys as string[]];
        }
    };

    const doSubmit = (data: IUser) => {
        if (data.id)
            doUpdateUser(data);
        else
            docCreateUser(data);
    }

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key !== 'Enter')
            return;
        doSearch((event.target as any).value);
    }

    const doSearch = (value: string) => {
        setSearchValue(value);
        doGetUserList();
    }

    useEffect(() => {
        doGetUserList();
        return () => {
            destroy();
        }
    }, []);

    return (
        <div className="user-management">
            <div className="user-management-header">
                <Search placeholder="请输入用户名" size={"middle"} style={{width: 350}} onKeyDown={onKeydown}
                        onSearch={doSearch}/>
                <Button size={'middle'} type={"primary"} onClick={() => openUserPanelWhenCreate()}><Add/>新增</Button>
                <Button size={'middle'} type={"primary"}><Warehousing/>导入</Button>
                <Button size={'middle'} danger={true} type={"primary"}
                        onClick={() => {
                            if (selectedIds.length === 0)
                                return;
                            globalModal.modalApi?.confirm({
                                title: '删除确认',
                                content: '确定删除选中的用户吗？',
                                onOk: () => doBatchDeleteUser(selectedIds)
                            });
                        }}><Delete/>删除</Button>
            </div>
            <div className="user-management-body">
                <Table dataSource={records} columns={columns}
                       rowSelection={{
                           type: 'checkbox',
                           ...rowSelection,
                       }}
                       onChange={(pagination) => changeCurrentPage(pagination.current!)}
                       pagination={{
                           showTotal: () => `共${total}条`,
                           pageSize: size,
                           current: current,
                           total: total,
                       }}/>

            </div>
            <UserPanel visible={userPanelVisible}
                       title={user.id ? '编辑用户' : '新增用户'}
                       data={user}
                       onClose={() => setUserPanelVisible(false)}
                       onSubmitted={doSubmit}/>
        </div>
    );
}

export default observer(UserManagement);