/********************************************
 *******************数据本地存储操作Utils*******
 ********************************************/

import {LCDesignerProps} from "../global/types";

const buildConfig = (LCDesignerStore: LCDesignerProps) => {
    let {id = -1, globalSet} = LCDesignerStore;
    return {
        id,
        globalSet,
        chartConfigs: JSON.stringify(LCDesignerStore.chartConfigs),
        layoutConfig: JSON.stringify(LCDesignerStore.layoutConfig),
        screenHeight: LCDesignerStore.globalSet.screenHeight,
        screenWidth: LCDesignerStore.globalSet.screenWidth,
        screenName: LCDesignerStore.globalSet.screenName
    };
}

/**
 * 本地数据保存
 */
export const localSave = (LCDesignerStore: LCDesignerProps) => {
    let {id = -1} = LCDesignerStore;
    let lightChaser = window.localStorage.lightChaser;
    let config = buildConfig(LCDesignerStore);
    //新增

    if (lightChaser === undefined) {
        id++;
        config = {...config, ...{id}};
        //无数据，需要初始化
        lightChaser = new Array(config);
    } else {
        //已有数据
        lightChaser = JSON.parse(lightChaser);
        id = lightChaser.length + 1;
        config = {...config, ...{id}};
        lightChaser.push(config);
    }
    //保存到本地存储
    localStorage.setItem("lightChaser", JSON.stringify(lightChaser));
    return id;
}

/**
 * 本地数据更新
 */
export const localUpdate = (LCDesignerStore: LCDesignerProps) => {
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