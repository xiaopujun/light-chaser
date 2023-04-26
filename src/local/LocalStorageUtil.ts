import {DesignerStore} from "../designer/store/DesignerStore";
import localforage from 'localforage';
import {toJS} from "mobx";


/**
 * 构建保存项目时的基础数据
 */
const buildConfig = (designerStore: DesignerStore) => {
    let {id = -1, canvasConfig, elemConfigs, layoutConfigs, projectConfig, bgConfig, extendParams} = designerStore;
    return {
        id,
        canvasConfig: toJS(canvasConfig),
        elemConfigs: toJS(elemConfigs),
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
 * 根据url从内存中获取图片源数据，并保存到本地数据库
 * @param url 图片地址
 * @param key 图片存储后的key标识
 */
const saveImgToLocal = (url: string, key: string) => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => {
                if (response.ok)
                    return response.blob();
                throw new Error("get bgImg error");
            })
            .then((blob) => {
                localforage.setItem(key, blob).then(() => {
                    resolve(true)
                }).catch((error) => {
                    console.log("save bgImg error", error);
                    resolve(false);
                });
            })
            .catch((error) => {
                console.log("get bgImg error", error);
                resolve(false);
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

const delImgFormLocal = (blobKey: string) => {
    localforage.removeItem(blobKey).then(() => {
        console.log("del bgImg success: ", blobKey);
    });
}

/**
 * 创建项目
 */
export const createProject = (designerStore: DesignerStore) => {
    return new Promise((resolve) => {
        //1.构建保存项目时的基础数据
        let config = buildConfig(designerStore);
        //2.生成唯一id
        let id = Date.now();
        config.id = id;
        let bgImgKey = 'bgImg' + id;
        //2.如果有背景图片则先处理背景图片
        if (config?.bgConfig?.bgImgUrl !== '') {
            //2.1 保存背景图片到本地数据库
            saveImgToLocal(config.bgConfig?.bgImgUrl!, bgImgKey).then((blobKey) => {
                if (config.bgConfig && blobKey !== '')
                    config.bgConfig.bgImgUrl = bgImgKey;
                //2.2 保存项目到本地数据库
                saveProjectToLocal(config).then(id => resolve(id));
            });
        } else {
            //3.无背景图片则直接保存
            saveProjectToLocal(config).then(id => resolve(id));
        }
    });
}


/**
 * 更新项目
 */
export const updateProject = (designerStore: DesignerStore) => {
    return new Promise((resolve) => {
        //1.构建更新项目时的基础数据
        let config = buildConfig(designerStore);
        getAllProject().then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                //2.找到要更新的项目
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === config.id) {
                        if (config.bgConfig?.bgImgUrl !== '') {
                            let bgImgKey = 'bgImg' + config.id;
                            //2.1 如果有新背景图片数据，则保存新背景图片
                            saveImgToLocal(config.bgConfig.bgImgUrl!, bgImgKey).then(() => {
                                if (config.bgConfig)
                                    config.bgConfig.bgImgUrl = bgImgKey;
                                dataArr[i] = config;
                                localforage.setItem('light-chaser', dataArr).then(() => {
                                    resolve(config.id as number);
                                });
                            });
                        } else {
                            //2.2 如果没有新背景图片数据，则删除原有图片（如果有）后更新项目
                            delImgFormLocal("bgImg" + config.id);
                            dataArr[i] = config;
                            localforage.setItem('light-chaser', dataArr).then(() => {
                                resolve(config.id as number);
                            }).catch((error) => {
                                console.log("save bgImg error", error);
                                resolve(-1);
                            });
                        }
                    }
                }
            } else {
                resolve(-1);
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
                                if (target.bgConfig)
                                    target.bgConfig.bgImgUrl = url;
                                resolve(target);
                            });
                        } else {
                            resolve(target);
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