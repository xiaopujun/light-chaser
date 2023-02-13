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
        screenHeight: projectConfig.screenHeight,
        screenWidth: projectConfig.screenWidth,
        screenName: projectConfig.screenName
    };
}

/**
 * 本地数据保存
 */
export const localSave = (designerStore: LcDesignerContentStore) => {
    let {id = -1} = designerStore;
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((data: any) => {
            if (data && data instanceof Object) {
                let oldData = data[id + ''];
                if (oldData)
                    data[id + ''] = config;
                localforage.setItem('light-chaser', config).then(() => {
                    resolve(id as number);
                });
            } else {
                //新增
                let lightChaser = {};
                config.id = ++id;
                localforage.setItem('lc' + id, config).then(() => {
                    resolve(id as number);
                });
            }
        });
    })
}

/**
 * 本地数据更新
 */
export const localUpdate = (LCDesignerStore: LcDesignerContentStore) => {
    let lightChaser = window.localStorage.lightChaser;
    let config = buildConfig(LCDesignerStore);
    let oldLightChaser = JSON.parse(lightChaser);
    for (let i = 0; i < oldLightChaser.length; i++) {
        if (oldLightChaser[i].id === config.id) {
            oldLightChaser[i] = config;
            break;
        }
    }
    localStorage.setItem("lightChaser", JSON.stringify(oldLightChaser));
}

/**
 * 本地数据查询
 */
export const localQuery = () => {

}