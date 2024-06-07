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
            setSearchValue: action,
            setRolePageData: action,
            setRole: action,
            setRolePanelVisible: action,
            changeCurrentPage: action,
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
        //将role转换为FormData
        const formData = new FormData();
        for (let key in role) {
            formData.append(key, role[key as keyof IRole] as string);
        }

        AuthFetchUtil.post('/api/role/update', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
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