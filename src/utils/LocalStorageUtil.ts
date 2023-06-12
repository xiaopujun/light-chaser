import {DesignerStore} from "../designer/store/DesignerStore";
import localforage from 'localforage';
import {BackgroundConfig} from "../designer/DesignerType";

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
        fetch(url).then((response) => {
            if (response.ok)
                return response.blob();
            throw new Error("get bgImg error");
        }).then((blob) => {
            localforage.setItem(key, blob).then(() => {
                resolve(true)
            }).catch((error) => {
                console.log("save bgImg error", error);
                resolve(false);
            });
        }).catch((error) => {
            console.log("get bgImg error", error);
            resolve(false);
        });
    });
}

/**
 * 从本地数据库获取背景图片
 */
const getImgFromLocal = (blobKey: string | any) => {
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

const saveProject = (config: DesignerStore) => {
    return new Promise((resolve) => {
        //1.如果有背景图片则先处理背景图片
        const bgConfig: BackgroundConfig = config.elemConfigs['-1']['background'];
        if (bgConfig?.bgImg.bgImgUrl !== '') {
            let bgImgKey = 'bgImg' + config.id;
            //1.1 保存背景图片到本地数据库
            saveImgToLocal(bgConfig?.bgImg.bgImgUrl!, bgImgKey).then((res) => {
                if (bgConfig && res)
                    bgConfig.bgImg.bgImgUrl = bgImgKey;
                //2.2 保存项目到本地数据库
                saveProjectToLocal(config).then(id => resolve(id));
            });
        } else {
            //2.无背景图片则直接保存
            saveProjectToLocal(config).then(id => resolve(id));
        }
    });
}

const saveProjectSimpleData = (config: DesignerStore) => {
    return new Promise((resolve) => {
        localforage.getItem('lc-project-list').then((dataArr: any) => {
            let simpleData = {
                id: config.id,
                name: config.projectConfig.name,
                des: config.projectConfig.des,
                state: config.projectConfig.state,
                updateTime: config.projectConfig.updateTime,
            }
            if (dataArr && dataArr instanceof Array) {
                dataArr.push(simpleData);
                localforage.setItem('lc-project-list', dataArr).then(() => {
                    resolve(true);
                }).catch((error) => {
                    console.log("saveProjectToLocal error", error)
                    resolve(false);
                });
            } else {
                //没有没有保存过数据则初始化
                let dataArr = [];
                dataArr.push(simpleData);
                localforage.setItem('lc-project-list', dataArr).then(() => {
                    resolve(true);
                }).catch((error) => {
                    console.log("Save simple data error", error)
                    resolve(false);
                });
            }
        });
    });
}

/**
 * 创建项目
 */
export const createProject = (designerStore: DesignerStore) => {
    return new Promise((resolve) => {
        //1.构建保存项目时的基础数据
        let config = designerStore.getData();
        //2.生成唯一id
        config.id = Date.now();
        //3.保存项目
        saveProject(config).then(() => {
            //4.维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
            saveProjectSimpleData(config).then(() => {
                resolve(config.id as number);
            });
        });
    });
}

/**
 * 更新项目
 */
export const updateProject = (designerStore: DesignerStore) => {
    return new Promise((resolve) => {
        //1.构建更新项目时的基础数据
        let config = designerStore.getData();
        getAllProject().then((dataArr: any) => {
            if (dataArr && dataArr instanceof Array) {
                //2.找到要更新的项目
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i].id === config.id) {
                        const bgConfig: BackgroundConfig = config.elemConfigs['-1']['background'];
                        if (bgConfig?.bgImg.bgImgUrl !== '') {
                            let bgImgKey = 'bgImg' + config.id;
                            //2.1 如果有新背景图片数据，则保存新背景图片
                            saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey).then(() => {
                                if (bgConfig)
                                    config.elemConfigs['-1']['background'].bgImg.bgImgUrl = bgImgKey;
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
                        let target: DesignerStore | any = dataArr[i];
                        let bgConfig: BackgroundConfig = target.elemConfigs['-1']['background'];
                        if (bgConfig?.bgImg.bgImgUrl !== '') {
                            getImgFromLocal(bgConfig?.bgImg.bgImgUrl).then((url) => {
                                if (bgConfig)
                                    target.elemConfigs['-1']['background'].bgImg.bgImgUrl = url;
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