import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";

export interface Page<T> {
    records: T[];
    total: number;
    size: number;
    current: number;
}

export const DataSourceMapping = {
    "0": "MySQL",
    "1": "PostgresSQL",
    "2": "Oracle",
    "3": "SQL Server",
}

export class DataSourceStore {
    constructor() {
        makeObservable(this, {
            createVisible: observable,
            editVisible: observable,
            dataSourcePageData: observable,
            setCreateVisible: action,
            setEditVisible: action,
            setDataSourceList: action,
            setDataSource: action,
            changeCurrentPage: action,
        })
    }

    createVisible = false;

    editVisible = false;

    searchValue: string | null = null;

    dataSourcePageData: Page<DataSourceConfigType[]> = {
        records: [],
        total: 0,
        size: 8,
        current: 1
    };

    dataSource: DataSourceConfigType = {
        id: "",
        name: '',
        type: '',
        username: '',
        password: '',
        url: '',
        des: ''
    }

    setCreateVisible = (visible: boolean) => this.createVisible = visible;

    setEditVisible = (visible: boolean) => this.editVisible = visible;

    setDataSourceList = (dataSourcePageData: Page<DataSourceConfigType[]>) => this.dataSourcePageData = dataSourcePageData;

    setDataSource = (dataSource: DataSourceConfigType) => this.dataSource = dataSource;

    testDataSource = (id: string) => {
        fetch(`/api/datasource/connect/${id}`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200)
                    globalMessage.messageApi?.success(res.msg);
                else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

    changeCurrentPage = (page: number) => {
        this.dataSourcePageData.current = page;
        this.getDataSourceList();
    }

    deleteDataSource = (id: string) => {
        fetch(`/api/datasource/del/${id}`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    globalMessage.messageApi?.success(res.msg);
                    this.getDataSourceList();
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

    copyDataSource = (id: string) => {
        fetch(`/api/datasource/copy/${id}`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    globalMessage.messageApi?.success(res.msg);
                    this.getDataSourceList();
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

    openDataSourceEditor = (id: string) => {
        fetch(`/api/datasource/get/${id}`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    this.setDataSource(res.data);
                    this.setEditVisible(true);
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

    getDataSourceList = () => {
        fetch(`/api/datasource/pageList`,
            {
                method: 'post',
                body: JSON.stringify({
                    current: this.dataSourcePageData.current,
                    size: this.dataSourcePageData.size,
                    searchValue: this.searchValue
                }),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(res => {
                const {code, data, msg} = res;
                if (code === 200) {
                    (data.records as Array<DataSourceConfigType>).forEach((item) => {
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
                } else
                    globalMessage.messageApi?.error(msg);
            })
    }

    updateDataSource = (data: DataSourceConfigType) => {
        fetch(`/api/datasource/update`,
            {
                method: 'post',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    globalMessage.messageApi?.success(res.msg);
                    this.getDataSourceList();
                    this.setEditVisible(false);
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

    createDataSource = (data: DataSourceConfigType) => {
        fetch(`/api/datasource/add`,
            {
                method: 'post',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    globalMessage.messageApi?.success(res.msg);
                    this.getDataSourceList();
                    this.setCreateVisible(false);
                } else
                    globalMessage.messageApi?.error(res.msg);
            })
    }

}

const dataSourceStore = new DataSourceStore();
export default dataSourceStore;

