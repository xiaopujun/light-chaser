import designerStore from "../../designer/store/DesignerStore";
import {ProjectDataType, SaveType} from "../../designer/DesignerType";
import localforage from "localforage";
import {ImgUtil} from "../../utils/ImgUtil";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import {buildUrlParams, parseUrlParams} from "../../utils/URLUtil";
import {AbstractOperator} from "./AbstractOperator";
import {idGenerate} from "../../utils/IdGenerate";
import {LocalConstant} from "../LocalConstant";
import {message} from "antd";
import {cloneDeep} from "lodash";
import {ComponentBaseProps} from "../../comps/common-component/common-types";
import DesignerLoaderFactory from "../../designer/loader/DesignerLoaderFactory";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {

    public getKey(): string {
        return SaveType.LOCAL;
    }

    public saveProject(projectData: ProjectDataType): void {
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
        projectData.extendParams!.maxLevel = maxLevel;
        projectData.extendParams!.minLevel = minLevel;
        // 3. 处理数据转换
        const {abstractConvertMap} = DesignerLoaderFactory.getLoader();
        const {elemConfigs} = projectData;
        Object.keys(elemConfigs!).forEach((key: string) => {
            const elemConfig = elemConfigs![key] as ComponentBaseProps;
            const convertIns = abstractConvertMap[elemConfig.info!.type!];
            if (convertIns)
                convertIns.convert(elemConfig);
        })
        // 4. 异步生成工作区截图
        let imgDom: any = document.querySelector('.lc-drag-scale-provider');
        const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
        projectData!.projectConfig!.screenshot = screenShotId; //截图
        ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: 0.3}).then(() => console.log('异步生成截图成功'));
    }

    private static async doCreate(projectData: ProjectDataType): Promise<void> {
        try {
            if (!projectData.id) {
                console.error('项目id异常', projectData);
                return;
            }
            await localforage.setItem(projectData.id, projectData);
            // 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
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
        urlParams = {...urlParams, ...{id: id!, action: 'edit'}};
        window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
    }

    private async updateProject(projectData: ProjectDataType): Promise<void> {
        LocalOperator.updateProjectBefore(projectData);
        await this.doUpdate(projectData);
    }

    private static updateProjectBefore(projectData: ProjectDataType): void {
        //1. 处理元素层级
        const {maxLevel, minLevel} = eventOperateStore;
        projectData.extendParams!.maxLevel = maxLevel;
        projectData.extendParams!.minLevel = minLevel;
        const updateTime = Date.now();
        const {lastTimeSave, setLastTimeSave} = designerStore;
        const duringTime = updateTime - lastTimeSave;
        //2. 处理数据转换
        const {abstractConvertMap} = DesignerLoaderFactory.getLoader();
        const {elemConfigs} = projectData;
        Object.keys(elemConfigs!).forEach((key: string) => {
            const elemConfig = elemConfigs![key] as ComponentBaseProps;
            const convertIns = abstractConvertMap[elemConfig.info!.type!];
            if (convertIns)
                convertIns.convert(elemConfig);
        })
        //距离上一次更新时间超过20分钟，重新生成截图
        if (duringTime / 1000 / 60 > 20) {
            //2. 异步生成工作区截图
            let imgDom: any = document.querySelector('.lc-drag-scale-provider');
            const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
            projectData!.projectConfig!.screenshot = screenShotId; //截图
            ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: 0.3}).then(() => console.log('异步更新截图成功'));
            setLastTimeSave(updateTime);
        }
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

    //todo 逻辑要优化，要删除promise的传递
    public deleteProject(id: string): boolean {
        //删除项目数据
        localforage.removeItem(id).then(() => console.log('删除项目数据成功'));
        //删除项目截图
        ImgUtil.delImgFormLocal(LocalConstant.LOCAL_PROJECT_SCREENSHOT + id);
        //删除项目列表信息
        this.getProjectSimpleInfoList().then((simpleInfoList) => {
            let index = simpleInfoList.findIndex((project) => project.id === id);
            simpleInfoList.splice(index, 1);
            localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList).then(() => console.log('删除项目列表信息成功'));
        });
        return true;
    }

    public async getProject(id: string): Promise<ProjectDataType | null> {
        const projectData = await localforage.getItem(id);
        if (!projectData) return null;
        //处理数据转换
        const {abstractConvertMap} = DesignerLoaderFactory.getLoader();
        const {elemConfigs} = projectData as ProjectDataType;
        for (const key of Object.keys(elemConfigs!)) {
            const elemConfig = elemConfigs![key] as ComponentBaseProps;
            const convertIns = abstractConvertMap[elemConfig?.info?.type!];
            //todo 异步调用想想怎么优化
            if (convertIns) {
                await convertIns.convertBack(elemConfig);
            }
        }

        return projectData as ProjectDataType;
    }

    public async getProjectSimpleInfoList(): Promise<any[]> {
        let simpleDataList = await localforage.getItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST);
        if (simpleDataList && simpleDataList instanceof Array)
            return simpleDataList;
        else
            return [];
    }

    public async copyProject(id: string, name?: string): Promise<string> {
        //1. 获取id对应的项目数据
        const copiedData = await this.getProject(id)
        //3. 复制项目数据
        const newId = idGenerate.generateId();
        const newData = cloneDeep(copiedData);
        newData!.id = newId;
        newData!.projectConfig!.name = name || newData!.projectConfig!.name + '(副本)';
        //4. 复制项目截图
        const copiedImgBlob = await ImgUtil.getImgBlobFromLocal(LocalConstant.LOCAL_PROJECT_SCREENSHOT + id);
        const newImgBlob = new Blob([copiedImgBlob!], {type: copiedImgBlob?.type});
        const newScreenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + newId;
        await ImgUtil.saveImgBlobToLocal(newImgBlob, newScreenShotId);
        newData!.projectConfig!.screenshot = newScreenShotId;
        //5. 存储新的项目数据到indexedDB
        await localforage.setItem(newId, newData);
        //6. 更新项目列表信息
        const simpleInfoList = await this.getProjectSimpleInfoList();
        simpleInfoList.push({
            id: newId,
            name: newData!.projectConfig!.name,
            des: newData!.projectConfig!.des,
            state: newData!.projectConfig!.state,
            updateTime: newData!.projectConfig!.updateTime,
            screenshot: newData!.projectConfig!.screenshot,
            saveType: newData!.projectConfig!.saveType
        });
        await localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList);
        return newId;
    }

}

export default LocalOperator;
