import designerStore from "./store/DesignerStore";
import {getProjectById} from "../utils/LocalStorageUtil";
import eventOperateStore from "./operate-provider/EventOperateStore";
import {designerRouter} from "../index";
import designerStarter from "./DesignerStarter";

export const loadDesigner = () => {
    console.log("load designer")
    // const {doInit} = designerStarter;
    // Promise.all([doInit(), loadProject()]).then((res) => {
    //     const [scanRes, loadProRes] = res;
    //     // if (scanRes && loadProRes) {
    //     //     const {setLoadComplete} = designerStore;
    //     //     setLoadComplete(true);
    //     //     console.log('designer load complete');
    //     // }
    // });
}

const loadProject = async () => {
    console.log("load project")
    const {history: {location: {state: {action}}}} = designerRouter;
    switch (action) {
        case 'create':
            doCreateProject();
            break;
        case 'edit':
            await loadExistProject();
            break;
    }
    return true;
}

/**
 * 初始化一个新的项目。
 */
const doCreateProject = () => {
    console.log("do create project")
    const {doInit} = designerStore;
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
 * 加载已经存在的项目。
 */
const loadExistProject = () => {
    console.log("load exist project")
    const {doInit} = designerStore;
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