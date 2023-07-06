import {DesignerStore} from "../../designer/store/DesignerStore";
import {idGenerate} from "../../utils/IdGenerate";
import {BackgroundConfig} from "../../designer/DesignerType";
import {ImgUtil} from "../../utils/ImgUtil";
import localforage from "localforage";
import ProjectDataOperator from "./ProjectDataOperator";

/**
 * 使用模板方法模式，抽象化创建和更新项目的过程。
 */
export abstract class AbstractLocalOperator implements ProjectDataOperator {

    public async doCreateOrUpdate(designerStore: DesignerStore): Promise<void> {
        if (designerStore.id === '')
            await this.createProject(designerStore);
        else {
            await this.updateProject(designerStore);
        }
    }

    public async createProject(designerStore: DesignerStore): Promise<string> {
        await this.createProjectBefore(designerStore);
        await AbstractLocalOperator.doCreate(designerStore);
        this.createProjectAfter(designerStore);
        return designerStore.id;
    }

    private static async doSaveProjectSimpleInfo(projectData: any): Promise<void> {
        // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
        const simpleInfoList = await localforage.getItem('lc_project_list');
        const {id, projectConfig: {name, des, state, updateTime, screenshot}} = projectData;
        const simpleData = {id, name, des, state, updateTime, screenshot};
        if (simpleInfoList && Array.isArray(simpleInfoList)) {
            simpleInfoList.push(simpleData);
            await localforage.setItem('lc_project_list', simpleInfoList);
        } else {
            // 如果没有保存过数据则初始化
            const newDataArr = [simpleData];
            await localforage.setItem('lc_project_list', newDataArr);
        }
    }

    private static async doCreate(designerStore: DesignerStore): Promise<void> {
        try {
            // 1. 构建保存项目时的基础数据
            const config = designerStore.getData();
            // 2. 生成唯一id
            config.id = idGenerate.generateId();
            designerStore.id = config.id;
            // 3.如果有背景图片则先处理背景图片
            const bgConfig: BackgroundConfig = (config.elemConfigs ?? {})['-1']['background'];
            if (bgConfig?.bgImg.bgImgUrl !== '') {
                //4. 生成背景图片的key
                const bgImgKey = 'bgImg_' + config.id;
                //5. 保存背景图片到本地数据库
                const res = await ImgUtil.saveImgToLocal(bgConfig.bgImg.bgImgUrl!, bgImgKey);
                //6. 将背景图片的可访问地址替换为唯一标识。
                if (res) bgConfig.bgImg.bgImgUrl = bgImgKey;
            }
            // 7. 保存项目到本地数据库
            let dataArr: any = await localforage.getItem('light-chaser');
            if (!Array.isArray(dataArr))
                dataArr = [];
            dataArr.push(config);
            await localforage.setItem('light-chaser', dataArr);
            // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
            await AbstractLocalOperator.doSaveProjectSimpleInfo(config);
        } catch (error) {
            console.log("createProject error", error);
        }
    }

    public createProjectBefore(designerStore: DesignerStore): void {

    }

    public createProjectAfter(designerStore: DesignerStore): void {

    }

    public async updateProject(designerStore: DesignerStore): Promise<boolean> {
        await this.updateProjectBefore(designerStore);
        await this.doUpdate(designerStore);
        this.updateProjectAfter(designerStore);
        alert('update success');
        return true;
    }

    public async getAllProject(): Promise<any[]> {
        try {
            const dataArr = await localforage.getItem('light-chaser');
            return dataArr && dataArr instanceof Array ? dataArr : [];
        } catch (error) {
            console.log("getAllProject error", error);
            return [];
        }
    }

    private async doUpdate(designerStore: DesignerStore): Promise<void> {
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
            }
        }
        //更新项目列表信息
        let simpleInfoList = await this.getProjectSimpleInfoList();
        let index = simpleInfoList.findIndex((project) => project.id === config.id);
        const {id, projectConfig: {name, des, state, updateTime, screenshot}} = config;
        simpleInfoList[index] = {id, name, des, state, updateTime, screenshot};
        await localforage.setItem('lc_project_list', simpleInfoList);
    }

    public updateProjectBefore(designerStore: DesignerStore): void {

    }

    public updateProjectAfter(designerStore: DesignerStore): void {
    }

    abstract deleteProject(id: number): boolean;

    abstract getProject(id: number): Promise<DesignerStore | null>;

    abstract getProjectSimpleInfoList(): Promise<any[]>;
}
