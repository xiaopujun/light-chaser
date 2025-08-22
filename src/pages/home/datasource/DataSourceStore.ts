/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {action, makeObservable, observable} from "mobx";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import FetchUtil from "../../../utils/FetchUtil.ts";
import CryptoUtil from "../../../utils/CryptoUtil.ts";
import {IPage} from "../../../designer/DesignerType.ts";

export const DataSourceMapping = {
    "0": "SQLite",
    "1": "MySQL",
    "2": "PostgresSQL",
    "3": "Oracle",
    "4": "SQL Server",
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
    aesKey?: string; // 加密后的AES密钥
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
    dataSourcePageData: IPage<IDataSource> = {
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

    setDataSourceList = (dataSourcePageData: IPage<IDataSource>) => this.dataSourcePageData = dataSourcePageData;

    setDataSource = (dataSource: IDataSource) => this.dataSource = dataSource;

    changeCurrentPage = (page: number) => {
        this.dataSourcePageData.current = page;
        this.getDataSourceList();
    }

    testConnect = (id: string) => {
        FetchUtil.get(`/api/commonDatabase/test/${id}`).then(res => {
            if (res.code === 200)
                globalMessage.messageApi?.success(res.msg);
            else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    copyDataSource = (id: string) => {
        FetchUtil.get(`/api/commonDatabase/copy/${id}`).then(res => {
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    openDataSourceEditor = (id: string) => {
        FetchUtil.get(`/api/commonDatabase/get/${id}`).then(res => {
            if (res.code === 200) {
                this.setDataSource(res.data);
                this.setPanelVisible(true);
            } else
                globalMessage.messageApi?.error(res.msg);
        })
    }

    getDataSourceList = () => {
        FetchUtil.post(`/api/commonDatabase/pageList`, {
            current: this.dataSourcePageData.current,
            size: this.dataSourcePageData.size,
            searchValue: this.searchValue
        }).then(res => {
            const {code, data, msg} = res;
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
                globalMessage.messageApi?.error(msg || "服务器链接失败");
            }
        })
    }

    /**
     * 对数据源密码进行AES+RSA双重加密
     * @param data 数据源数据
     * @returns 加密后的数据源数据
     */
    private async encryptPassword(data: IDataSource): Promise<IDataSource> {
        if (data.password) {
            try {
                // 生成随机AES密钥
                const aesKey = CryptoUtil.generateAESKey();

                // 使用AES加密密码
                const encryptedPassword = CryptoUtil.encryptAES(data.password, aesKey);

                // 获取RSA公钥
                const publicKey = await FetchUtil.getRSAPublicKey();

                // 使用RSA公钥加密encryptedPassword
                const encryptedData = CryptoUtil.encryptRSA(encryptedPassword, publicKey);

                return {
                    ...data,
                    password: encryptedData,
                    aesKey: aesKey
                };
            } catch (error) {
                console.error('密码加密失败:', error);
                globalMessage.messageApi?.error('密码加密失败，请重试');
                throw error;
            }
        }
        return data;
    }

    updateDataSource = async (data: IDataSource) => {
        try {
            const encryptedData = await this.encryptPassword(data);
            const res = await FetchUtil.post(`/api/commonDatabase/update`, encryptedData);
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setPanelVisible(false);
            } else {
                globalMessage.messageApi?.error(res.msg);
            }
        } catch (error) {
            console.error('更新数据源失败:', error);
        }
    }

    createDataSource = async (data: IDataSource) => {
        try {
            const encryptedData = await this.encryptPassword(data);
            const res = await FetchUtil.post(`/api/commonDatabase/add`, encryptedData);
            if (res.code === 200) {
                globalMessage.messageApi?.success(res.msg);
                this.getDataSourceList();
                this.setPanelVisible(false);
            } else {
                globalMessage.messageApi?.error(res.msg);
            }
        } catch (error) {
            console.error('创建数据源失败:', error);
        }
    }

    doBatchDeleteDataSource = (ids: string[]) => {
        if (ids.length === 0)
            return;
        FetchUtil.post('/api/commonDatabase/batchDel', ids).then((res) => {
            const {code, msg} = res;
            if (code === 200) {
                globalMessage.messageApi?.success('删除成功');
                this.getDataSourceList();
            } else
                globalMessage.messageApi?.error(msg);
        })
    }

    doCreateOrUpdateDataSource = async (data: IDataSource) => {
        if (data.id) {
            await this.updateDataSource(data);
        } else {
            await this.createDataSource(data);
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

