import lcDesignerContentStore from "./store/DesignerStore";
import {getProjectById} from "../utils/LocalStorageUtil";
import eventOperateStore from "./operate-provider/EventOperateStore";
import designerStarter from "./DesignerStarter";
import {designerRouter} from "../index";

const {doScan} = designerStarter;

export const loadDesigner = () => {
    doScan();
    loadProjectData();
}


/**
 * 初始化项目操作类型。新增 / 更新
 */
const loadProjectData = () => {
    const {history: {location: {state: {action}}}} = designerRouter;
    switch (action) {
        case 'create':
            initNewProject();
            break;
        case 'edit':
            initExistProject();
            break;
    }
}

/**
 * 初始化以创建方式打开时项目信息
 */
const initNewProject = () => {
    const {doInit} = lcDesignerContentStore;
    const {history: {location: {state}}} = designerRouter;
    const {screenName, screenWidth, screenHeight} = state;
    doInit({
        canvasConfig: {
            width: parseInt(screenWidth),
            height: parseInt(screenHeight),
        },
        projectConfig: {
            name: screenName
        },
    })
}

/**
 * 初始化以更新方式打开时项目信息
 */
const initExistProject = () => {
    const {doInit} = lcDesignerContentStore;
    const {history: {location: {state: {id}}}} = designerRouter;
    getProjectById(id).then((store: any) => {
        if (store) {
            doInit({
                id: store.id,
                canvasConfig: store.canvasConfig,
                activeElem: store.activeElem,
                projectConfig: store.projectConfig,
                elemConfigs: store.elemConfigs,
                layoutConfigs: store.layoutConfigs,
                statisticInfo: store.statisticInfo,
                layers: store.layers,
                themeConfig: store.theme,
                group: store.group,
                linkage: store.linkage,
                condition: store.condition,
                extendParams: store.extendParams,
            })
            const {setMinOrder, setMaxOrder} = eventOperateStore;
            setMinOrder(store.extendParams['minOrder']);
            setMaxOrder(store.extendParams['maxOrder']);
        }
    })
}