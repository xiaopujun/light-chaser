import lcDesignerContentStore from "./store/DesignerStore";
import eventOperateStore from "./operate-provider/EventOperateStore";
import designerStarter from "./DesignerStarter";
import {parseUrlParams} from "../utils/URLUtil";
import LocalOperator from "../framework/operate/LocalOperator";

const {doScan} = designerStarter;

export const loadDesigner = () => {
    //扫描组件
    doScan();
    //初始化项目数据
    loadProjectData();
}

/**
 * 初始化项目操作类型。新增 / 更新
 */
const loadProjectData = () => {
    let urlParams = parseUrlParams();
    const {action} = urlParams;
    if (action === 'edit')
        initExistProject();
    else if (action === 'create')
        initNewProject();
    else
        throw new Error('action is error')
}

/**
 * 初始化以创建方式打开时项目信息
 */
const initNewProject = () => {
    let urlParams = parseUrlParams();
    const {screenWidth, screenHeight, screenName} = urlParams;
    const {doInit} = lcDesignerContentStore;
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
    let urlParams = parseUrlParams();
    const {doInit} = lcDesignerContentStore;
    new LocalOperator().getProject(urlParams.id).then((store: any) => {
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