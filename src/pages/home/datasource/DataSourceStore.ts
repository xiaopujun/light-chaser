import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import FetchUtil from "../../../utils/FetchUtil.ts";
import {IPage} from "../../../designer/DesignerType.ts";

export const DataSourceMapping = {
    "0": "MySQL",
    "1": "PostgresSQL",
    "2": "Oracle",
    "3": "SQL Server",
}

export interface IDataSource {
    id?: string;
    key?: string;
    name?: string;
    type?: string;
    username?: string;
    password?: string;
    url?: string;
    des?: string;
}

export class DataSourceStore {
    constructor() {
        makeObservable(this, {
            panelVisible: observable,
            dataSourcePageData: observable,
            setDataSourceList: action,
            setDataSource: action,
            changeCurrentPage: action,
            setPanelVisible: action,
        })
    }

    panelVisible = false;
    searchValue: string | null = null;
    dataSourcePageData: IPage<IDataSource[]> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };
    dataSource: IDataSource = {
        id: undefined,
        name: undefined,
        type: undefined,
        username: undefined,
        password: undefined,
        url: undefined,
        des: undefined
    }

    setPanelVisible = (visible: boolean) => {
        this.panelVisible = visible
        if (!visible) {
            this.dataSource = {
                id: undefined,
                name: undefined,
                type: undefined,
                username: undefined,
                password: undefined,
                url: undefined,
                des: undefined
            }
        }
    }

    setDataSourceList = (dataSourcePageData: IPage<IDataSource[]>) => this.dataSourcePageData = dataSourcePageData;

    setDataSource = (dataSource: IDataSource) => this.dataSource = dataSource;

    changeCurrentPage = (page: number) => {
        this.dataSourcePageData.current = page;
        this.getDataSourceList();
    }

    testConnect = (id: string) => {
        FetchUtil.get(`/api/datasource/test/${id}`).then(res => {
            if (res.code === 200)
                globalMessage.messageApi?.success(res.msg);
            else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    copyDataSource = (id: string) => {
        FetchUtil.get(`/api/datasource/copy/${id}`).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    openDataSourceEditor = (id: string) => {
        FetchUtil.get(`/api/datasource/get/${id}`).then(res => {
            if (res.code === 200) {
                this.setDataSource(res.data);
                this.setPanelVisible(true);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    getDataSourceList = () => {
        FetchUtil.post(`/api/datasource/pageList`, {
            current: this.dataSourcePageData.current,
            size: this.dataSourcePageData.size,
            searchValue: this.searchValue
        }).then(res => {
            let {code, data, msg} = res;
            if (code === 200) {
                (data.records as Array<IDataSource>).forEach((item) => {
                    item.key = item.id;
                    item.type = DataSourceMapping[item!.type as keyof typeof DataSourceMapping];
                })
                this.setDataSourceList({
                    records: data.records,
                    total: data.total,
                    size: data.size,
                    current: data.current
                });
                this.searchValue = null;
            } else {
                msg = "服务器链接失败";
                globalMessage.messageApi?.error(msg);
            }
        })
    }

    updateDataSource = (data: IDataSource) => {
        FetchUtil.post(`/api/datasource/update`, data).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setPanelVisible(false);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    createDataSource = (data: IDataSource) => {
        FetchUtil.post(`/api/datasource/add`, data).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setPanelVisible(false);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    doBatchDeleteDataSource = (ids: string[]) => {
        if (ids.length === 0)
            return;
        FetchUtil.post('/api/datasource/batchDel', ids).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('删除成功');
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doCreateOrUpdateDataSource = (data: IDataSource) => {
        if (data.id) {
            this.updateDataSource(data);
        } else {
            this.createDataSource(data);
        }
    }

    init = () => {
        this.getDataSourceList();
    }

    destroy = () => {
        this.searchValue = null;
        this.dataSourcePageData = {
            records: [],
            total: 0,
            size: 8,
            current: 1
        };
        this.dataSource = {
            id: undefined,
            name: undefined,
            type: undefined,
            username: undefined,
            password: undefined,
            url: undefined,
            des: undefined
        }
    }

}

const dataSourceStore = new DataSourceStore();
export default dataSourceStore;

