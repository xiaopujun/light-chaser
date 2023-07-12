import designerStore from "../../designer/store/DesignerStore";
import {BackgroundConfig, ProjectDataType, SaveType} from "../../designer/DesignerType";
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

    public async doCreateOrUpdate(projectData: ProjectDataType): Promise<void> {
        if (projectData.id === '')
            await LocalOperator.createProject(projectData);
        else {
            await this.updateProject(projectData);
        }
    }

    private static async createProject(projectData: ProjectDataType): Promise<string> {
        let time = new Date().getTime();
        await LocalOperator.createProjectBefore(projectData);
        await LocalOperator.doCreate(projectData);
        LocalOperator.createProjectAfter(projectData);
        console.log('createProject time', new Date().getTime() - time);
        return projectData!.id || '';
    }

    private static async createProjectBefore(projectData: ProjectDataType): Promise<void> {
        projectData.id = idGenerate.generateId();
        const {maxLevel, minLevel} = eventOperateStore;
        projectData.layerConfigs!.maxLevel = maxLevel;
        projectData.layerConfigs!.minLevel = minLevel;
        // 2. 对项目画面截图
        let time = new Date().getTime();
        await LocalOperator.doScreenshot(projectData);
        console.log('doScreenshot time', new Date().getTime() - time);
        // 3. 如果有背景图片则处理背景图片
        const bgConfig: BackgroundConfig = (projectData.elemConfigs ?? {})['-1']['background'];
        if (bgConfig?.bgImg.bgImgUrl !== '') {
            //4. 生成背景图片的key
            const bgImgKey = LocalConstant.LOCAL_BACKGROUND_IMG + projectData.id;
            //5. 保存背景图片到本地数据库
            let time = new Date().getTime();
            const res = await ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
            console.log('doScreenshot time', new Date().getTime() - time);
            //6. 将背景图片的可访问地址替换为唯一标识。
            if (res) bgConfig.bgImg.bgImgUrl = bgImgKey;
        }
    }

    private static async doCreate(projectData: ProjectDataType): Promise<void> {
        try {
            if (!projectData.id)
                throw new Error('创建项目id异常');
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
        message.success('创建成功');
    }

    private async updateProject(projectData: ProjectDataType): Promise<boolean> {
        await LocalOperator.updateProjectBefore(projectData);
        await this.doUpdate(projectData);
        message.success('保存成功');
        return true;
    }

    private static async updateProjectBefore(projectData: ProjectDataType): Promise<void> {
        const {maxLevel, minLevel} = eventOperateStore;
        projectData.layerConfigs!.maxLevel = maxLevel;
        projectData.layerConfigs!.minLevel = minLevel;
        //屏幕截图
        await LocalOperator.doScreenshot(projectData);
        //处理背景图片
        const bgConfig: BackgroundConfig = projectData.elemConfigs?.['-1']['background'];
        if (bgConfig?.bgImg.bgImgUrl !== '') {
            const bgImgKey = LocalConstant.LOCAL_BACKGROUND_IMG + projectData.id;
            await ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
            if (bgConfig) projectData!.elemConfigs!['-1'].background!.bgImg!.bgImgUrl = bgImgKey;
        } else {
            await ImgUtil.delImgFormLocal(LocalConstant.LOCAL_BACKGROUND_IMG + projectData.id);
        }
    }

    private async doUpdate(projectData: ProjectDataType): Promise<void> {
        if (!projectData.id) {
            console.log('更新数据id异常', projectData);
            return;
        }
        await localforage.setItem(projectData.id, projectData);
        //更新项目列表信息
        let simpleInfoList = await this.getProjectSimpleInfoList();
        let index = simpleInfoList.findIndex((project) => project.id === projectData.id);
        const {id, projectConfig} = projectData;
        const {name, des, state, updateTime, screenshot, saveType} = projectConfig!;
        simpleInfoList[index] = {id, name, des, state, updateTime, screenshot, saveType};
        await localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList);
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
        let bgConfig: BackgroundConfig = (projectData as ProjectDataType)!.elemConfigs!['-1']['background'];
        if (bgConfig?.bgImg.bgImgUrl !== '') {
            const url = await ImgUtil.getImgFromLocal(bgConfig?.bgImg.bgImgUrl);
            if (bgConfig)
                (projectData as ProjectDataType)!.elemConfigs!['-1']['background'].bgImg.bgImgUrl = url;
        }
        return projectData as ProjectDataType;
    }

    private static async doScreenshot(projectData: ProjectDataType): Promise<void> {
        let imgDom: any = document.querySelector('.lc-content-scale');
        const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
        const res = await ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: scaleCore.scale});
        if (res)
            projectData!.projectConfig!.screenshot = screenShotId; //截图
    }

    public async getProjectSimpleInfoList(): Promise<any[]> {
        let simpleDataList = await localforage.getItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST);
        console.log('simpleDataList', simpleDataList);
        if (simpleDataList && simpleDataList instanceof Array)
            return simpleDataList;
        else
            return [];
    }

}

export default LocalOperator;
