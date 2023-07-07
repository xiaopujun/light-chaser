import {DesignerStore} from "../../designer/store/DesignerStore";
import {BackgroundConfig, SaveType} from "../../designer/DesignerType";
import localforage from "localforage";
import {ImgUtil} from "../../utils/ImgUtil";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import scaleCore from "../../designer/operate-provider/scale/ScaleCore";
import {buildUrlParams, parseUrlParams} from "../../utils/URLUtil";
import {AbstractOperator} from "./AbstractOperator";
import {idGenerate} from "../../utils/IdGenerate";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {

    public getKey(): string {
        return SaveType.LOCAL;
    }

    public async doCreateOrUpdate(designerStore: DesignerStore): Promise<void> {
        if (designerStore.id === '')
            await LocalOperator.createProject(designerStore);
        else {
            await this.updateProject(designerStore);
        }
    }

    private static async createProject(designerStore: DesignerStore): Promise<string> {
        await LocalOperator.createProjectBefore(designerStore);
        await LocalOperator.doCreate(designerStore);
        LocalOperator.createProjectAfter(designerStore);
        return designerStore.id;
    }

    private static async createProjectBefore(designerStore: DesignerStore): Promise<void> {
        await LocalOperator.doScreenshot(designerStore);
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
            await LocalOperator.doSaveProjectSimpleInfo(config);
        } catch (error) {
            console.log("createProject error", error);
        }
    }

    private static createProjectAfter(designerStore: DesignerStore): void {
        let {id = '', setId} = designerStore;
        //更新id
        setId && setId(id);
        //修改路由参数，新增变为更新
        let urlParams = parseUrlParams();
        urlParams = {...urlParams, ...{id, action: 'edit'}};
        window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
        alert("create success");
    }

    private async updateProject(designerStore: DesignerStore): Promise<boolean> {
        await LocalOperator.updateProjectBefore(designerStore);
        await this.doUpdate(designerStore);
        alert('update success');
        return true;
    }

    private static async updateProjectBefore(designerStore: DesignerStore): Promise<void> {
        await LocalOperator.doScreenshot(designerStore);
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
        const {id, projectConfig: {name, des, state, updateTime, screenshot, saveType}} = config;
        simpleInfoList[index] = {id, name, des, state, updateTime, screenshot, saveType};
        await localforage.setItem('lc_project_list', simpleInfoList);
    }

    private static async doSaveProjectSimpleInfo(projectData: any): Promise<void> {
        // 8. 维护项目列表（保存项目的轻量级描述信息，避免加载列表时内存占用过大）
        const simpleInfoList = await localforage.getItem('lc_project_list');
        const {id, projectConfig: {name, des, state, updateTime, screenshot, saveType}} = projectData;
        const simpleData = {id, name, des, state, updateTime, screenshot, saveType};
        if (simpleInfoList && Array.isArray(simpleInfoList)) {
            simpleInfoList.push(simpleData);
            await localforage.setItem('lc_project_list', simpleInfoList);
        } else {
            // 如果没有保存过数据则初始化
            const newDataArr = [simpleData];
            await localforage.setItem('lc_project_list', newDataArr);
        }
    }

    public deleteProject(id: number): boolean {
        return false;
    }

    public async getProject(id: number): Promise<DesignerStore | null> {
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

    private static async doScreenshot(designerStore: DesignerStore): Promise<void> {
        const {maxLevel, minLevel} = eventOperateStore;
        designerStore.layerConfigs.maxLevel = maxLevel;
        designerStore.layerConfigs.minLevel = minLevel;
        let imgDom: any = document.querySelector('.lc-content-scale');
        const imageId = await ImgUtil.htmlToImgWithId(imgDom, {scale: scaleCore.scale});
        designerStore.projectConfig.screenshot = imageId || ''; //截图
    }

    public async getProjectSimpleInfoList(): Promise<any[]> {
        let simpleDataList = await localforage.getItem('lc_project_list');
        if (simpleDataList && simpleDataList instanceof Array)
            return simpleDataList;
        else
            return [];
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
}

export default LocalOperator;
