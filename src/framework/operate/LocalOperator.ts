import ProjectDataOperator from "./ProjectDataOperator";
import {DesignerStore} from "../../designer/store/DesignerStore";
import {BackgroundConfig} from "../../designer/DesignerType";
import localforage from "localforage";
import {ImgUtil} from "../../utils/ImgUtil";
import {LocalOperatorTemplate} from "./LocalOperatorTemplate";
import eventOperateStore from "../../designer/operate-provider/EventOperateStore";
import scaleCore from "../../designer/operate-provider/scale/ScaleCore";
import {buildUrlParams, parseUrlParams} from "../../utils/URLUtil";

/**
 * 本地项目数据操作实现
 */
export default class LocalOperator extends LocalOperatorTemplate implements ProjectDataOperator {

    deleteProject(id: number): boolean {
        return false;
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

    createProjectAfter(designerStore: DesignerStore): void {
        let {id = '', setId} = designerStore;
        //更新id
        setId && setId(id);
        //修改路由参数，新增变为更新
        let urlParams = parseUrlParams();
        urlParams = {...urlParams, ...{id, action: 'edit'}};
        window.history.replaceState(null, '', '?' + buildUrlParams(urlParams));
        alert("create success");
    }

    async createProjectBefore(designerStore: DesignerStore): Promise<void> {
        await this.doScreenshot(designerStore);
    }

    updateProjectAfter(designerStore: DesignerStore): void {
    }

    async updateProjectBefore(designerStore: DesignerStore): Promise<void> {
        await this.doScreenshot(designerStore);
    }

    async doScreenshot(designerStore: DesignerStore): Promise<void> {
        const {maxLevel, minLevel} = eventOperateStore;
        designerStore.layerConfigs.maxLevel = maxLevel;
        designerStore.layerConfigs.minLevel = minLevel;
        let imgDom: any = document.querySelector('.lc-content-scale');
        const imageId = await ImgUtil.htmlToImgWithId(imgDom, {scale: scaleCore.scale});
        designerStore.projectConfig.screenshot = imageId || ''; //截图
    }
}