import {LCDesignerProps} from "../types/LcDesignerType";
import {LcDesignerContentStore} from "../component/designer/store/LcDesignerContentStore";
import localforage from 'localforage';
import {toJS} from "mobx";

const buildConfig = (designerStore: LCDesignerProps) => {
    let {id = -1, canvasConfig, chartConfigs, layoutConfigs, projectConfig, bgConfig, extendParams} = designerStore;
    return {
        id,
        canvasConfig: toJS(canvasConfig),
        chartConfigs: toJS(chartConfigs),
        layoutConfigs: toJS(layoutConfigs),
        projectConfig: toJS(projectConfig),
        bgConfig: toJS(bgConfig),
        extendParams: toJS(extendParams)
    };
}


const saveDesignDataToIndexedDB = (config: any) => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                config.id = dataArr.length + 1;
                dataArr.push(config);
                localforage.setItem('light-chaser', dataArr).then(() => {
                    resolve(config.id as number);
                }).catch((error) => {
                    console.log("saveDesignDataToIndexedDB error", error)
                    resolve(-1);
                });
            } else {
                //没有没有保存过数据则初始化
                let dataArr = [];
                config.id = 0;
                dataArr.push(config);
                localforage.setItem('light-chaser', dataArr).then(() => {
                    resolve(config.id as number);
                }).catch((error) => {
                    console.log("saveDesignDataToIndexedDB error", error)
                    resolve(-1);
                });
            }
        });
    });
};

const saveBgImgToIndexedDB = (url: string) => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => {
                if (response.ok)
                    return response.blob();
                throw new Error("get bgImg error");
            })
            .then((blob) => {
                let blobKey = url.substring(url.lastIndexOf('/') + 1, url.length);
                localforage.setItem(blobKey, blob).then(() => {
                    resolve(blobKey)
                }).catch((error) => {
                    console.log("save bgImg error", error);
                    resolve("");
                });
            })
            .catch((error) => {
                console.log("get bgImg error", error);
                resolve("");
            });
    });
}

/**
 * 从本地数据库获取背景图片
 */
const getBgImgFromIndexedDB = (blobKey: string) => {
    return new Promise((resolve) => {
        localforage.getItem(blobKey).then((blob) => {
            if (blob) {
                let url = URL.createObjectURL(blob);
                resolve(url);
            } else {
                resolve("");
            }
        }).catch((error) => {
            console.log("get bgImg error", error);
            resolve("");
        });
    });
}

/**
 * 从本地数据库删除背景图片
 */
const deleteBgImgFromIndexedDB = (blobKey: string) => {
    return new Promise((resolve) => {
        localforage.removeItem(blobKey).then(() => {
            resolve(true);
        }).catch((error) => {
            console.log("delete bgImg error", error);
            resolve(false);
        });
    });
}


/**
 * 本地数据保存
 */
export const localCreate = (designerStore: LcDesignerContentStore) => {
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        if (config.bgConfig?.bgImgUrl !== '') {
            saveBgImgToIndexedDB(config.bgConfig?.bgImgUrl).then((blobKey) => {
                if (config.bgConfig)
                    config.bgConfig.bgImgUrl = blobKey;
                saveDesignDataToIndexedDB(config).then(id => resolve(id));
            }).catch((error) => {
                console.log("save bgImg error", error);
            });
        } else {
            saveDesignDataToIndexedDB(config).then(id => resolve(id));
        }
    });
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
                        if (config.extendParams.oldBgImgUrl !== '') {
                            deleteBgImgFromIndexedDB(config.extendParams.oldBgImgUrl).then(r => {
                                console.log("delete old bgImg", r);
                            });
                        }
                        if (config.bgConfig?.bgImgUrl !== '') {
                            saveBgImgToIndexedDB(config.bgConfig?.bgImgUrl).then((blobKey) => {
                                if (config.bgConfig)
                                    config.bgConfig.bgImgUrl = blobKey;
                                dataArr[i] = config;
                                localforage.setItem('light-chaser', dataArr).then(() => {
                                    resolve(config.id as number);
                                });
                            }).catch((error) => {
                                console.log("save bgImg error", error);
                                resolve(-1);
                            });
                        } else {
                            dataArr[i] = config;
                            localforage.setItem('light-chaser', dataArr).then(() => {
                                resolve(config.id as number);
                            });
                        }
                    }
                }
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
                        let target = dataArr[i];
                        if (target.bgConfig?.bgImgUrl !== '') {
                            getBgImgFromIndexedDB(target.bgConfig?.bgImgUrl).then((url) => {
                                if (target.bgConfig) {
                                    target.extendParams.oldBgImgUrl = target.bgConfig.bgImgUrl;
                                    target.bgConfig.bgImgUrl = url;
                                }
                                resolve(target);
                            });
                        }
                    }
                }
            } else {
                resolve(null);
            }
        })
    });
}


export const localGetAll = () => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                resolve(dataArr);
            } else {
                resolve([]);
            }
        })
    });
}