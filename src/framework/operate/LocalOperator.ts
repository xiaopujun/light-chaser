import ProjectDataOperator from "./ProjectDataOperator";
import {DesignerStore} from "../../designer/store/DesignerStore";
import {idGenerate} from "../../utils/IdGenerate";
import {BackgroundConfig} from "../../designer/DesignerType";
import localforage from "localforage";
import {ImgUtil} from "../../utils/ImgUtil";

/**
 * 本地项目数据操作实现
 */
export default class LocalOperator implements ProjectDataOperator {

    async createProject(designerStore: DesignerStore): Promise<string> {
        try {
            // 1. 构建保存项目时的基础数据
            const config = designerStore.getData();
            // 2. 生成唯一id
            config.id = idGenerate.generateId();
            // 3.如果有背景图片则先处理背景图片
            const bgConfig: BackgroundConfig = (config.elemConfigs ?? {})['-1']['background'];
            if (bgConfig?.bgImg.bgImgUrl !== '') {
                //4. 生成背景图片的key
                const bgImgKey = 'bgImg_' + config.id;
                //5. 保存背景图片到本地数据库
                const res = await ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
                //6. 将背景图片的可访问地址替换为唯一标识。
                if (res)
                    bgConfig.bgImg.bgImgUrl = bgImgKey;
            }
            // 7. 保存项目到本地数据库
            let dataArr: any = await localforage.getItem('light-chaser');
            if (!Array.isArray(dataArr))
                dataArr = [];
            dataArr.push(config);
            await localforage.setItem('light-chaser', dataArr);
            // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
            const projectListInfo = await localforage.getItem('lc-project-list');
            const simpleData = {
                id: config.id,
                name: config.projectConfig.name,
                des: config.projectConfig.des,
                state: config.projectConfig.state,
                updateTime: config.projectConfig.updateTime,
                screenshot: config.projectConfig.screenshot,
            };
            if (projectListInfo && Array.isArray(projectListInfo)) {
                projectListInfo.push(simpleData);
                await localforage.setItem('lc-project-list', projectListInfo);
            } else {
                // 如果没有保存过数据则初始化
                const newDataArr = [simpleData];
                await localforage.setItem('lc-project-list', newDataArr);
            }
            return config.id as string;
        } catch (error) {
            console.log("createProject error", error);
            return '';
        }
    }

    deleteProject(id: number): boolean {
        return false;
    }

    async getAllProject(): Promise<any[]> {
        try {
            const dataArr = await localforage.getItem('light-chaser');
            return dataArr && dataArr instanceof Array ? dataArr : [];
        } catch (error) {
            console.log("getAllProject error", error);
            return [];
        }
    }

    async getProject(id: number): Promise<DesignerStore | null> {
        const dataArr = await localforage.getItem('light-chaser');
        if (dataArr && dataArr instanceof Array) {
            for (let i = 0; i < dataArr.length; i++) {
                if (dataArr[i].id === id) {
                    let target: DesignerStore | any = dataArr[i];
                    let bgConfig: BackgroundConfig = target.elemConfigs['-1']['background'];
                    if (bgConfig?.bgImg.bgImgUrl !== '') {
                        const url = await ImgUtil.getImgFromLocal(bgConfig?.bgImg.bgImgUrl);
                        if (bgConfig)
                            target.elemConfigs['-1']['background'].bgImg.bgImgUrl = url;
                    }
                    return target;
                }
            }
        }
        return null;
    }

    async updateProject(designerStore: DesignerStore): Promise<boolean> {
        const config = designerStore.getData();
        const dataArr = await this.getAllProject();
        if (dataArr) {
            const projectIndex = dataArr.findIndex((project) => project.id === config.id);
            if (projectIndex !== -1) {
                const bgConfig: BackgroundConfig = config.elemConfigs['-1']['background'];
                if (bgConfig?.bgImg.bgImgUrl !== '') {
                    const bgImgKey = 'bgImg' + config.id;
                    await ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
                    if (bgConfig) config.elemConfigs['-1']['background'].bgImg.bgImgUrl = bgImgKey;
                } else {
                    await ImgUtil.delImgFormLocal('bgImg' + config.id);
                }
                dataArr[projectIndex] = config;
                await localforage.setItem('light-chaser', dataArr);
                return true;

            }
        }
        return false;
    }

}