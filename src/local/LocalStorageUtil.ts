/********************************************
 *******************数据本地存储操作Utils*******
 ********************************************/

import {LCDesignerProps} from "../types/LcDesignerType";
import {LcDesignerContentStore} from "../component/designer/store/LcDesignerContentStore";
import localforage from 'localforage';
import {toJS} from "mobx";

const buildConfig = (designerStore: LCDesignerProps) => {
    let {id = -1, canvasConfig, chartConfigs, layoutConfigs, projectConfig} = designerStore;
    return {
        id,
        canvasConfig: toJS(canvasConfig),
        chartConfigs: toJS(chartConfigs),
        layoutConfigs: toJS(layoutConfigs),
        projectConfig: toJS(projectConfig),
    };
}

/**
 * 本地数据保存
 */
export const localCreate = (designerStore: LcDesignerContentStore) => {
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                config.id = dataArr.length + 1;
                dataArr.push(config);
                localforage.setItem('light-chaser', dataArr).then((data) => {
                    console.log('push after dataArr', dataArr)
                    console.log('push after', data)
                    resolve(config.id as number);
                });
            } else {
                //没有没有保存过数据则初始化
                let dataArr = [];
                config.id = 0;
                dataArr.push(config);
                localforage.setItem('light-chaser', dataArr).then((data) => {
                    console.log('push after init', data);
                    resolve(config.id as number);
                });
            }
        });
    })
}

/**
 * 本地数据更新
 */
export const localUpdate = (designerStore: LcDesignerContentStore) => {
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === config.id) {
                        dataArr[i] = config;
                        break;
                    }
                }
                localforage.setItem('light-chaser', dataArr).then(() => {
                    resolve(config.id as number);
                });
            }
        });
    });
}

/**
 * 本地数据查询
 */
export const localQuery = (id: number | string) => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === id) {
                        resolve(dataArr[i]);
                        break;
                    }
                }
            } else {
                resolve(null);
            }
        })
    });
}