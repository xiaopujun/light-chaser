import {action, makeObservable, observable} from "mobx";
import {IPage} from "../../../designer/DesignerType.ts";
import AuthFetchUtil from "../../../utils/AuthFetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";


export interface IRole {
    no?: number;
    key?: string;
    id?: string;
    name?: string;
    des?: string;
    code?: string;
}

class RoleManagementStore {
    constructor() {
        makeObservable(this, {
            searchValue: observable,
            rolePageData: observable,
            role: observable,
            rolePanelVisible: observable,
            permissionTreeData: observable,
            setSearchValue: action,
            setRolePageData: action,
            setRole: action,
            setRolePanelVisible: action,
            changeCurrentPage: action,
            setPermissionTreeData: action
        })
    }

    searchValue: string | null = null;

    rolePanelVisible: boolean = false;

    rolePageData: IPage<IRole> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    role: IRole = {
        id: undefined,
        name: undefined,
        des: undefined,
        code: undefined,
    }

    permissionTreeData: any = [];

    setPermissionTreeData = (treeData: any) => this.permissionTreeData = treeData;

    setRolePanelVisible = (visible: boolean) => this.rolePanelVisible = visible;

    changeCurrentPage = (current: number) => {
        this.rolePageData.current = current;
        this.doGetRoleList();
    }


    setSearchValue = (value: string) => this.searchValue = value;

    setRolePageData = (rolePageData: IPage<IRole>) => this.rolePageData = rolePageData;

    setRole = (role: IRole) => this.role = role;

    openRolePanelWhenCreate = () => {
        this.setRolePanelVisible(true);
        this.setRole({
            id: undefined,
            name: undefined,
            des: undefined,
            code: undefined,
        });
    }

    doGetRoleList = () => {
        AuthFetchUtil.post('/api/role/pageList', {
            current: this.rolePageData.current,
            size: this.rolePageData.size,
            searchValue: this.searchValue
        }).then((res) => {
            const {data, code, msg} = res;
            if (code === 200) {
                data.records = data.records.map((item: IRole, index: number) => {
                    item.no = index + 1;
                    item.key = item.id!;
                    return item;
                });
                this.setRolePageData(data);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    docCreateRole = (role: IRole) => {
        AuthFetchUtil.post('/api/role/create', role).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('创建成功');
                this.doGetRoleList();
                this.setRolePanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doUpdateRole = (role: IRole) => {
        AuthFetchUtil.post('/api/role/update', role).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('更新成功');
                this.doGetRoleList();
                this.setRolePanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doEditRoleInfo = (id: string) => {
        AuthFetchUtil.get(`/api/role/getRole/${id}`).then((res) => {
            const {code, msg, data} = res;
            if (code === 200) {
                this.setRole(data);
                this.setRolePanelVisible(true);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doBatchDeleteRole = (ids: string[]) => {
        AuthFetchUtil.post('/api/role/batchDel', ids).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('删除成功');
                this.doGetRoleList();
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doGetPermissionTreeData = () => {
        AuthFetchUtil.get('/api/permission/getAllPermission').then((res) => {
            const {data, code} = res;
            if (code == 200) {
                //将data转换为指定格式
                const formatDataArr: any = [];
                const formatDataMap = data.reduce((acc: any, current: any) => {
                    const targetData = {
                        title: current.name,
                        key: current.id,
                        value: current.id,
                        pid: current.pid,
                    }
                    acc[current.id] = targetData;
                    formatDataArr.push(targetData);
                    return acc;
                }, {});
                const result: any = [];
                // 构建树结构
                formatDataArr.forEach((item: any) => {
                    if (item.pid && item.pid === '-1') {
                        // 根节点
                        result.push(item);
                    } else {
                        // 非根节点，将其加入父节点的 children 中
                        const parent = formatDataMap[item.pid];
                        if (parent) {
                            parent.children = parent.children || [];
                            parent.children.push(item);
                        }
                    }
                });
                this.setPermissionTreeData(result);
            }
        })
    }


    destroy = () => {
        this.searchValue = null;
        this.rolePageData = {
            records: [],
            total: 0,
            size: 8,
            current: 1
        };
        this.role = {
            id: undefined,
            name: undefined,
            des: undefined,
            code: undefined,
        };
        this.rolePanelVisible = false;
    }

}

const roleManagementStore = new RoleManagementStore();
export default roleManagementStore;