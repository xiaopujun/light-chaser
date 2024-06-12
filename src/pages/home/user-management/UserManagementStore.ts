import {action, makeObservable, observable} from "mobx";
import {IPage} from "../../../designer/DesignerType.ts";
import AuthFetchUtil from "../../../utils/AuthFetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";

export interface Option {
    value: string;
    label: string;
}

export interface IUser {
    no?: number;
    key?: string;
    id?: string;
    name?: string;
    password?: string;
    username?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    avatarFile?: File;
}

class UserManagementStore {
    constructor() {
        makeObservable(this, {
            searchValue: observable,
            userPageData: observable,
            user: observable,
            userPanelVisible: observable,
            roleOptions: observable,
            setSearchValue: action,
            setUserPageData: action,
            setUser: action,
            setUserPanelVisible: action,
            changeCurrentPage: action,
            setRoleOptions: action,
        })
    }

    searchValue: string | null = null;

    userPanelVisible: boolean = false;

    userPageData: IPage<IUser> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    user: IUser = {
        id: undefined,
        name: undefined,
        password: undefined,
        username: undefined,
        phone: undefined,
        email: undefined,
    }

    roleOptions: Option[] = [];

    setRoleOptions = (roleOptions: Option[]) => this.roleOptions = roleOptions;

    setUserPanelVisible = (visible: boolean) => this.userPanelVisible = visible;

    changeCurrentPage = (current: number) => {
        this.userPageData.current = current;
        this.doGetUserList();
    }


    setSearchValue = (value: string) => this.searchValue = value;

    setUserPageData = (userPageData: IPage<IUser>) => this.userPageData = userPageData;

    setUser = (user: IUser) => this.user = user;

    openUserPanelWhenCreate = () => {
        this.setUserPanelVisible(true);
        this.setUser({
            id: undefined,
            name: undefined,
            password: undefined,
            username: undefined,
            phone: undefined,
        });
    }

    doGetRoleOptions = () => {
        AuthFetchUtil.get('/api/role/getRoleList').then((res) => {
            const {code, msg, data} = res;
            if (code === 200) {
                console.log(data);
                this.setRoleOptions(data.map((item: any) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                }));
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doGetUserList = () => {
        AuthFetchUtil.post('/api/user/pageList', {
            current: this.userPageData.current,
            size: this.userPageData.size,
            searchValue: this.searchValue
        }).then((res) => {
            const {data, code, msg} = res;
            if (code === 200) {
                data.records = data.records.map((item: IUser, index: number) => {
                    item.no = index + 1;
                    item.key = item.id!;
                    return item;
                });
                this.setUserPageData(data);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    docCreateUser = (user: IUser) => {
        AuthFetchUtil.post('/api/user/create', user).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('创建成功');
                this.doGetUserList();
                this.setUserPanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doUpdateUser = (user: IUser) => {
        AuthFetchUtil.post('/api/user/update', user).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('更新成功');
                this.doGetUserList();
                this.setUserPanelVisible(false);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doEditUserInfo = (id: string) => {
        AuthFetchUtil.get(`/api/user/getUser/${id}`).then((res) => {
            const {code, msg, data} = res;
            if (code === 200) {
                this.setUser(data);
                this.setUserPanelVisible(true);
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doBatchDeleteUser = (ids: string[]) => {
        AuthFetchUtil.post('/api/user/batchDel', ids).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('删除成功');
                this.doGetUserList();
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    destroy = () => {
        this.searchValue = null;
        this.userPageData = {
            records: [],
            total: 0,
            size: 8,
            current: 1
        };
        this.user = {
            id: undefined,
            name: undefined,
            password: undefined,
            username: undefined,
            phone: undefined,
            email: undefined,
        };
        this.userPanelVisible = false;
    }

}

const userManagementStore = new UserManagementStore();
export default userManagementStore;