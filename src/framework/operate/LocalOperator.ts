import designerStore from "../../designer/store/DesignerStore";
import {BackgroundConfigType, ProjectDataType, SaveType} from "../../designer/DesignerType";
import localforage from "localforage";
import {ImgUtil} from "../../utils/ImgUtil";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import scaleCore from "../../designer/operate-provider/scale/ScaleCore";
import {buildUrlParams, parseUrlParams} from "../../utils/URLUtil";
import {AbstractOperator} from "./AbstractOperator";
import {idGenerate} from "../../utils/IdGenerate";
import {LocalConstant} from "../LocalConstant";
import {message} from "antd";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {

    public getKey(): string {
        return SaveType.LOCAL;
    }

    public doCreateOrUpdate(projectData: ProjectDataType): void {
        if (projectData.id === '')
            LocalOperator.createProject(projectData).then(() => message.success('保存成功'));
        else {
            this.updateProject(projectData).then(() => message.success('更新成功'));
        }
    }

    private static async createProject(projectData: ProjectDataType): Promise<void> {
        LocalOperator.createProjectBefore(projectData);
        await LocalOperator.doCreate(projectData);
        LocalOperator.createProjectAfter(projectData);
    }

    private static createProjectBefore(projectData: ProjectDataType): void {
        //1. 生成项目id
        projectData.id = idGenerate.generateId();
        // 2. 处理元素层级
        const {maxLevel, minLevel} = eventOperateStore;
        // projectData.layerConfigs!.maxLevel = maxLevel;
        // projectData.layerConfigs!.minLevel = minLevel;
        // 3. 异步生成工作区截图
        let imgDom: any = document.querySelector('.lc-content-scale');
        const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
        projectData!.projectConfig!.screenshot = screenShotId; //截图
        ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: scaleCore.scale}).then(() => console.log('异步生成截图成功'));
        // 4. 异步保存背景图片（如果有）
        // const bgConfig: BackgroundConfig = (projectData.elemConfigs ?? {})['-1']['background'];
        // if (bgConfig?.bgImg.bgImgUrl !== '') {
        //     const bgImgKey = LocalConstant.LOCAL_BACKGROUND_IMG + projectData.id;
        //     bgConfig.bgImg.bgImgUrl = bgImgKey;
        //     ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey).then(() => console.log('异步生成背景图片成功'));
        // }
    }

    private static async doCreate(projectData: ProjectDataType): Promise<void> {
        try {
            if (!projectData.id) {
                console.error('项目id异常', projectData);
                return;
            }
            await localforage.setItem(projectData.id, projectData);
            // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
            await LocalOperator.doSaveProjectSimpleInfo(projectData);
        } catch (error) {
            console.log("createProject error", error);
        }
    }

    private static createProjectAfter(projectData: ProjectDataType): void {
        const {setId} = designerStore;
        let {id} = projectData;
        //更新id
        id && id !== '' && setId && setId(id);
        //修改路由参数，新增变为更新
        let urlParams = parseUrlParams();
        urlParams = {...urlParams, ...{id, action: 'edit'}};
        window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
    }

    private async updateProject(projectData: ProjectDataType): Promise<void> {
        LocalOperator.updateProjectBefore(projectData);
        await this.doUpdate(projectData);
    }

    private static updateProjectBefore(projectData: ProjectDataType): void {
        //1. 处理元素层级
        const {maxLevel, minLevel} = eventOperateStore;
        // projectData.layerConfigs!.maxLevel = maxLevel;
        // projectData.layerConfigs!.minLevel = minLevel;
        //2. 异步生成工作区截图
        let imgDom: any = document.querySelector('.lc-content-scale');
        const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
        projectData!.projectConfig!.screenshot = screenShotId; //截图
        ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: scaleCore.scale}).then(() => console.log('异步更新截图成功'));
        //3. 异步处理背景图片
        // const bgConfig: BackgroundConfig = projectData.elemConfigs?.['-1']['background'];
        // const bgImgKey = LocalConstant.LOCAL_BACKGROUND_IMG + projectData.id;
        // projectData!.elemConfigs!['-1'].background!.bgImg!.bgImgUrl = bgImgKey;
        // if (bgConfig?.bgImg.bgImgUrl !== '')
        //     ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey).then(() => console.log('异步更新背景图片成功'));
        // else
        //     ImgUtil.delImgFormLocal(bgImgKey);
    }

    private async doUpdate(projectData: ProjectDataType): Promise<void> {
        if (!projectData.id) {
            console.log('更新数据id异常', projectData);
            return;
        }
        // 更新项目数据
        await localforage.setItem(projectData.id, projectData);
        //更新项目列表信息
        this.getProjectSimpleInfoList().then((simpleInfoList) => {
            let index = simpleInfoList.findIndex((project) => project.id === projectData.id);
            const {id, projectConfig} = projectData;
            const {name, des, state, updateTime, screenshot, saveType} = projectConfig!;
            simpleInfoList[index] = {id, name, des, state, updateTime, screenshot, saveType};
            localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList);
        });
    }

    private static async doSaveProjectSimpleInfo(projectData: any): Promise<void> {
        // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
        const simpleInfoList = await localforage.getItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST);
        const {id, projectConfig: {name, des, state, updateTime, screenshot, saveType}} = projectData;
        const simpleData = {id, name, des, state, updateTime, screenshot, saveType};
        if (simpleInfoList && Array.isArray(simpleInfoList)) {
            simpleInfoList.push(simpleData);
            await localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList);
        } else {
            // 如果没有保存过数据则初始化
            const newDataArr = [simpleData];
            await localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, newDataArr);
        }
    }

    public deleteProject(id: string): boolean {
        return false;
    }

    public async getProject(id: string): Promise<ProjectDataType | null> {
        const projectData = await localforage.getItem(id);
        if (!projectData) return null;
        // let bgConfig: BackgroundConfig = (projectData as ProjectDataType)!.elemConfigs!['-1']['background'];
        // if (bgConfig?.bgImg.bgImgUrl !== '') {
        //     const url = await ImgUtil.getImgFromLocal(bgConfig?.bgImg.bgImgUrl);
        //     if (bgConfig)
        //         (projectData as ProjectDataType)!.elemConfigs!['-1']['background'].bgImg.bgImgUrl = url;
        // }
        return projectData as ProjectDataType;
    }

    public async getProjectSimpleInfoList(): Promise<any[]> {
        let simpleDataList = await localforage.getItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST);
        if (simpleDataList && simpleDataList instanceof Array)
            return simpleDataList;
        else
            return [];
    }

}

export default LocalOperator;
