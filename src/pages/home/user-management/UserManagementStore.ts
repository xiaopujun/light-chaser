import {action, makeObservable, observable} from "mobx";
import {IPage} from "../../../designer/DesignerType.ts";
import AuthFetchUtil from "../../../utils/AuthFetchUtil.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";


export interface IUser {
    no?: number;
    key?: string;
    id?: string;
    name?: string;
    password?: string;
    username?: string;
    phone?: string;
    email?: string;
}

class UserManagementStore {
    constructor() {
        makeObservable(this, {
            searchValue: observable,
            userPageData: observable,
            user: observable,
            setSearchValue: action,
            setUserPageData: action,
            setUser: action
        })
    }

    searchValue: string | null = null;

    userPageData: IPage<IUser> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    user: IUser = {
        id: "",
        name: '',
        username: '',
        phone: '',
        email: ''
    }

    setSearchValue = (value: string) => this.searchValue = value;

    setUserPageData = (userPageData: IPage<IUser>) => this.userPageData = userPageData;

    setUser = (user: IUser) => this.user = user;

    getUserList = () => {
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


}

const userManagementStore = new UserManagementStore();
export default userManagementStore;