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

/**
 * 保存项目到本地数据库
 */
const saveProjectToLocal = (config: any) => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                config.id = dataArr.length + 1;
                dataArr.push(config);
                localforage.setItem('light-chaser', dataArr).then(() => {
                    resolve(config.id as number);
                }).catch((error) => {
                    console.log("saveProjectToLocal error", error)
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
                    console.log("saveProjectToLocal error", error)
                    resolve(-1);
                });
            }
        });
    });
};

/**
 * 保存图片到本地数据库
 * @param url 图片地址
 */
const saveImgToLocal = (url: string) => {
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
const getImgFromLocal = (blobKey: string) => {
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
const delImgFromLocal = (blobKey: string) => {
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
 * 创建项目
 */
export const createProject = (designerStore: LcDesignerContentStore) => {
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        if (config.bgConfig?.bgImgUrl !== '') {
            saveImgToLocal(config.bgConfig?.bgImgUrl).then((blobKey) => {
                if (config.bgConfig)
                    config.bgConfig.bgImgUrl = blobKey;
                saveProjectToLocal(config).then(id => resolve(id));
            }).catch((error) => {
                console.log("save bgImg error", error);
            });
        } else {
            saveProjectToLocal(config).then(id => resolve(id));
        }
    });
}


/**
 * 更新项目
 */
export const updateProject = (designerStore: LcDesignerContentStore) => {
    let config = buildConfig(designerStore);
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === config.id) {
                        if (config.extendParams.oldBgImgUrl !== '') {
                            delImgFromLocal(config.extendParams.oldBgImgUrl).then(r => {
                                console.log("delete old bgImg", r);
                            });
                        }
                        if (config.bgConfig?.bgImgUrl !== '') {
                            saveImgToLocal(config.bgConfig?.bgImgUrl).then((blobKey) => {
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
 * 根据项目id获取项目
 */
export const getProjectById = (id: number | string) => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === id) {
                        let target = dataArr[i];
                        if (target.bgConfig?.bgImgUrl !== '') {
                            getImgFromLocal(target.bgConfig?.bgImgUrl).then((url) => {
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


/**
 * 查询所有项目
 */
export const getAllProject = () => {
    return new Promise((resolve) => {
        localforage.getItem('light-chaser').then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                resolve(dataArr);
            } else {
                resolve([]);
            }
        }).catch((error) => {
            console.log("getAllProject error", error);
            resolve([]);
        });
    });
}