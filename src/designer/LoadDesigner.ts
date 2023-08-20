import designerStore from "./store/DesignerStore";
import eventOperateStore from "./operate-provider/EventOperateStore";
import designerStarter from "./DesignerStarter";
import {parseUrlParams} from "../utils/URLUtil";
import {ProjectDataType, SaveType} from "./DesignerType";

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
    if (['edit', 'view'].includes(action))
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
    const {width, height, name} = urlParams;
    const {doInit, setLoaded} = designerStore;
    doInit({
        canvasConfig: {
            width: parseInt(width),
            height: parseInt(height),
        },
        projectConfig: {
            name: name
        },
    })
    setLoaded(true);
}

/**
 * 初始化以更新方式打开时项目信息
 */
const initExistProject = () => {
    let urlParams = parseUrlParams();
    const {doInit, setLoaded} = designerStore;
    const {abstractOperatorMap} = designerStarter;
    const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
    abstractOperatorMap[saveType].getProject(urlParams.id).then((store: ProjectDataType | null) => {
        if (store) {
            doInit({
                id: store.id,
                canvasConfig: store.canvasConfig,
                projectConfig: store.projectConfig,
                elemConfigs: store.elemConfigs,
                layoutConfigs: store.layoutConfigs,
                statisticInfo: store.statisticInfo,
                themeConfig: store.themeConfig,
                extendParams: store.extendParams,
            })
            //设置事件操作器的最大最小层级
            const {setMinLevel, setMaxLevel} = eventOperateStore;
            setMinLevel(store.extendParams?.minLevel || 0);
            setMaxLevel(store.extendParams?.maxLevel || 0);
        }
        setLoaded(true);
    })
}