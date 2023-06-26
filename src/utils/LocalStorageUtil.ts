import localforage from 'localforage';
import {BackgroundConfig, DesignerType} from "../designer/DesignerType";
import {DesignerStore} from "../designer/store/DesignerStore";

export async function saveProjectToLocal(config: any) {
    try {
        let dataArr: any = await localforage.getItem('light-chaser');
        if (!Array.isArray(dataArr))
            dataArr = [];
        dataArr.push(config);
        await localforage.setItem('light-chaser', dataArr);
        return config.id as number;
    } catch (error) {
        console.log("saveProjectToLocal error", error);
        return -1;
    }
}

/**
 * 根据url从内存中获取图片源数据，并保存到本地数据库
 * @param url 图片地址
 * @param key 图片存储后的key标识
 */
export async function saveImgToLocal(url: string, key: string) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            await localforage.setItem(key, blob);
            return true;
        } else {
            console.error("save bgImg error", response);
            return false;
        }
    } catch (error) {
        console.error("save bgImg error", error);
        return false;
    }
}

export async function getImageFromLocalWithKey(key: string) {
    try {
        const blob = await localforage.getItem(key);
        if (blob)
            return {[key]: URL.createObjectURL(blob)};
        else
            return {[key]: ""};
    } catch (error) {
        console.log("get bgImg error", error);
        return {[key]: ""};
    }
}

/**
 * 从本地数据库获取背景图片
 */
export async function getImgFromLocal(key: string | any) {
    const imageObj = await getImageFromLocalWithKey(key)
    return imageObj[key];
}

const delImgFormLocal = (blobKey: string) => {
    localforage.removeItem(blobKey).then(() => {
        console.log("del bgImg success: ", blobKey);
    });
}

async function saveProject(config: DesignerType) {
    try {
        // 1. 如果有背景图片则先处理背景图片
        const bgConfig: BackgroundConfig = (config.elemConfigs ?? {})['-1']['background'];
        if (bgConfig?.bgImg.bgImgUrl !== '') {
            const bgImgKey = 'bgImg' + config.id;
            // 1.1 保存背景图片到本地数据库
            const res = await saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
            if (bgConfig && res)
                bgConfig.bgImg.bgImgUrl = bgImgKey;
        }
        // 2. 保存项目到本地数据库
        return await saveProjectToLocal(config);
    } catch (error) {
        console.log("save project error", error);
        return null;
    }
}

async function saveProjectSimpleData(config: DesignerType | any) {
    try {
        const dataArr = await localforage.getItem('lc-project-list');
        const simpleData = {
            id: config.id,
            name: config.projectConfig.name,
            des: config.projectConfig.des,
            state: config.projectConfig.state,
            updateTime: config.projectConfig.updateTime,
            screenshot: config.projectConfig.screenshot,
        };
        if (dataArr && Array.isArray(dataArr)) {
            dataArr.push(simpleData);
            await localforage.setItem('lc-project-list', dataArr);
            return true;
        } else {
            // 如果没有保存过数据则初始化
            const newDataArr = [simpleData];
            await localforage.setItem('lc-project-list', newDataArr);
            return true;
        }
    } catch (error) {
        console.log("saveProjectSimpleData error", error);
        return false;
    }
}

/**
 * 创建项目
 */
export async function createProject(designerStore: DesignerStore) {
    try {
        // 1. 构建保存项目时的基础数据
        const config = designerStore.getData();
        // 2. 生成唯一id
        config.id = Date.now();
        // 3. 保存项目
        await saveProject(config);
        // 4. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
        await saveProjectSimpleData(config);
        return config.id as number;
    } catch (error) {
        console.log("createProject error", error);
        return null;
    }
}

/**
 * 更新项目
 */
export async function updateProject(designerStore: DesignerStore) {
    const config = designerStore.getData();
    const dataArr = await getAllProject();
    if (dataArr) {
        const projectIndex = dataArr.findIndex((project) => project.id === config.id);
        if (projectIndex !== -1) {
            const bgConfig: BackgroundConfig = config.elemConfigs['-1']['background'];
            if (bgConfig?.bgImg.bgImgUrl !== '') {
                const bgImgKey = 'bgImg' + config.id;
                await saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
                if (bgConfig) config.elemConfigs['-1']['background'].bgImg.bgImgUrl = bgImgKey;
            } else {
                await delImgFormLocal('bgImg' + config.id);
            }
            dataArr[projectIndex] = config;
            try {
                await localforage.setItem('light-chaser', dataArr);
                return config.id as number;
            } catch (error) {
                console.log('save bgImg error', error);
            }
        }
    }
    return -1;
};

/**
 * 根据项目id获取项目
 */
export async function getProjectById(id: number | string) {
    const dataArr = await localforage.getItem('light-chaser');
    if (dataArr && dataArr instanceof Array) {
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].id === id) {
                let target: DesignerStore | any = dataArr[i];
                let bgConfig: BackgroundConfig = target.elemConfigs['-1']['background'];
                if (bgConfig?.bgImg.bgImgUrl !== '') {
                    const url = await getImgFromLocal(bgConfig?.bgImg.bgImgUrl);
                    if (bgConfig)
                        target.elemConfigs['-1']['background'].bgImg.bgImgUrl = url;
                }
                return target;
            }
        }
    }
    return null;
}

/**
 * 查询所有项目
 */
export async function getAllProject() {
    try {
        const dataArr = await localforage.getItem('light-chaser');
        return dataArr && dataArr instanceof Array ? dataArr : [];
    } catch (error) {
        console.log("getAllProject error", error);
        return [];
    }
}