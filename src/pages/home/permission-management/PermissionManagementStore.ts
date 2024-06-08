import {action, makeObservable, observable} from "mobx";
import {IPage} from "../../../designer/DesignerType.ts";
import AuthFetchUtil from "../../../utils/AuthFetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";


export interface IPermission {
    no?: number;
    key?: string;
    id?: string;
    name?: string;
    des?: string;
    code?: string;
}

class PermissionManagementStore {
    constructor() {
        makeObservable(this, {
            searchValue: observable,
            permissionPageData: observable,
            permission: observable,
            permissionPanelVisible: observable,
            permissionTreeData: observable,
            setSearchValue: action,
            setPermissionPageData: action,
            setPermission: action,
            setPermissionPanelVisible: action,
            changeCurrentPage: action,
            setPermissionTreeData: action
        })
    }

    searchValue: string | null = null;

    permissionPanelVisible: boolean = false;

    permissionPageData: IPage<IPermission> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    permission: IPermission = {
        id: undefined,
        name: undefined,
        des: undefined,
        code: undefined,
    }

    setPermissionPanelVisible = (visible: boolean) => this.permissionPanelVisible = visible;

    changeCurrentPage = (current: number) => {
        this.permissionPageData.current = current;
        this.doGetPermissionList();
    }


    setSearchValue = (value: string) => this.searchValue = value;

    setPermissionPageData = (permissionPageData: IPage<IPermission>) => this.permissionPageData = permissionPageData;

    setPermission = (permission: IPermission) => this.permission = permission;

    permissionTreeData: any = [];

    setPermissionTreeData = (treeData: any) => this.permissionTreeData = treeData;

    openPermissionPanelWhenCreate = () => {
        this.setPermissionPanelVisible(true);
        this.setPermission({
            id: undefined,
            name: undefined,
            des: undefined,
            code: undefined,
        });
    }

    doGetPermissionList = () => {
        AuthFetchUtil.post('/api/permission/pageList', {
            current: this.permissionPageData.current,
            size: this.permissionPageData.size,
            searchValue: this.searchValue
        }).then((res) => {
            const {data, code, msg} = res;
            if (code === 200) {
                data.records = data.records.map((item: IPermission, index: number) => {
                    item.no = index + 1;
                    item.key = item.id!;
                    return item;
                });
                this.setPermissionPageData(data);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    docCreatePermission = (permission: IPermission) => {
        AuthFetchUtil.post('/api/permission/create', permission).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('创建成功');
                this.doGetPermissionList();
                this.setPermissionPanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doUpdatePermission = (permission: IPermission) => {
        AuthFetchUtil.post('/api/permission/update', permission).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('更新成功');
                this.doGetPermissionList();
                this.setPermissionPanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doEditPermissionInfo = (id: string) => {
        AuthFetchUtil.get(`/api/permission/getPermission/${id}`).then((res) => {
            const {code, msg, data} = res;
            if (code === 200) {
                this.setPermission(data);
                this.setPermissionPanelVisible(true);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doBatchDeletePermission = (ids: string[]) => {
        AuthFetchUtil.post('/api/permission/batchDel', ids).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('删除成功');
                this.doGetPermissionList();
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
        this.permissionPageData = {
            records: [],
            total: 0,
            size: 8,
            current: 1
        };
        this.permission = {
            id: undefined,
            name: undefined,
            des: undefined,
            code: undefined,
        };
        this.permissionPanelVisible = false;
    }

}

const permissionManagementStore = new PermissionManagementStore();
export default permissionManagementStore;