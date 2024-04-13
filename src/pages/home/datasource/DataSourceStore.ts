import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import {DataSourceConfigType} from "./edit/EditDataSourceDialog.tsx";

export class DataSourceStore {
    constructor() {
        makeObservable(this, {
            createVisible: observable,
            editVisible: observable,
            dataSourceList: observable,
            setCreateVisible: action,
            setEditVisible: action,
            setDataSourceList: action,
            setDataSource: action,
        })
    }

    createVisible = false;
    editVisible = false;

    dataSourceList: DataSourceConfigType[] = [];

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

    setDataSourceList = (dataSourceList: any) => this.dataSourceList = dataSourceList;

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
        fetch(`/api/datasource/list`, {method: 'get'})
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    (res.data as Array<DataSourceConfigType>).forEach((item) => item.key = item.id)
                    this.setDataSourceList(res.data);
                } else
                    globalMessage.messageApi?.error(res.msg);
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

