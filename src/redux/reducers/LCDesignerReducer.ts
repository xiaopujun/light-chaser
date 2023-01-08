import {Action, LCDesignerProps} from "../../types/LcDesignerType";
import * as _ from 'lodash'
import deepmerge from "deepmerge";
import {DesignerOperate} from "../../enum/DesignerOperate";
import {lcCompInits} from "../../component/designer";

/**
 * 初始化的布局设计器状态
 */
const initState: LCDesignerProps = {
    id: -1,
    canvasConfig: {
        saveType: 'local',//数据存储方式 local(本地）server（远程服务）
        screenRatio: '',//屏幕比例
        screenName: '数据大屏',
        screenWidth: 1920,
        screenHeight: 1080,
        elemInterval: 0,//元素间隔
        columns: 0,//列个数
        baseLineHeight: 0,//元素基准高度
        elemCount: 0,//元素个数
    },
    activated: {
        id: -1,    //激活的组件id
        type: "",    //激活的组件类型
    },
    chartConfigs: {},//布局设计器中的图表组件列表，每次设置图表样式或数据时更新此状态中的数据来更新渲染
    layoutConfigs: [],//布局配置数据，用于控制图表在页面中的整体布局位置
    systemConfig: {},
    bgConfig: {},
    projectConfig: {}
}

/**
 *布局设计器reducer，该reducer下分发各路子的处理器，
 *分别处理当前激活状态、标题设置、背景设置、边框设置、图表属性设置
 */
export default function LCDesignerReducer(preState: LCDesignerProps = initState, action: Action) {
    const {type, data} = action;
    switch (type) {
        case DesignerOperate.UPDATE_DESIGNER_STORE:                      //初始化store
            return updateDesignerStore(preState, data);
        case DesignerOperate.CLEAR_DESIGNER_STORE:                      //清除store
            return clearDesignerStore(preState, data);
        case DesignerOperate.ADD_ITEM:                                       //添加新的组件到画布中
            return addItem(preState, data);
        case DesignerOperate.DEL_ITEM:                                   //从画布中删除组件
            return delItem(preState, data);
        case DesignerOperate.UPDATE_LAYOUT:
            return updateLayout(preState, data);
        case DesignerOperate.UPDATE_ACTIVE:
            return updateActive(preState, data);
        case DesignerOperate.UPDATE_BASE_STYLE:
            return updateBaseStyle(preState, data);
        case DesignerOperate.UPDATE_CHART_PROPS:
            return updateChartProps(preState, data);
        case DesignerOperate.UPDATE_BASE_INFO:
            return updateBaseInfo(preState, data);
        case DesignerOperate.UPDATE_CANVAS_CONFIG:
            return updateCanvasConfig(preState, data);
        case DesignerOperate.UPDATE_PROJECT_CONFIG:
            return updateProjectConfig(preState, data);
        case DesignerOperate.UPDATE_BG_CONFIG:
            return updateBgConfig(preState, data);
        case DesignerOperate.UPDATE_SYSTEM_CONFIG:
            return updateSystemConfig(preState, data);
        default:                                            //无更新，返回之前的状态
            return preState;
    }
}

/**
 * 清除store
 */
function clearDesignerStore(preState: LCDesignerProps, data: any) {
    return initState;
}

/**
 * 清除store
 */
function updateBaseInfo(preState: LCDesignerProps, data: any) {
    const {chartConfigs, activated} = preState;
    let chartConfig = chartConfigs[activated.id];
    chartConfig.baseInfo = {...chartConfig.baseInfo, ...data};
    return {...preState, ...{chartConfigs}};
}


/**
 * 初始化store
 */
function updateDesignerStore(preState: LCDesignerProps, data: any) {
    return {...deepmerge(preState, data)};
}


/**
 * 想布局设计器中添加组件
 */
function addItem(preState: LCDesignerProps, data: any) {
    let {canvasConfig, layoutConfigs, chartConfigs} = preState;
    //更新布局
    layoutConfigs.push(data);
    //更新组件配置信息
    console.log(lcCompInits)
    let initObj: any = lcCompInits[data.name + "Init"];
    let initData: any = initObj.getInitConfig()
    initData.baseInfo = {...initData.baseInfo, ...{id: canvasConfig.elemCount}}
    chartConfigs[canvasConfig.elemCount + ""] = initData;
    //id增加
    canvasConfig.elemCount++;
    //生成新store
    return {...preState, ...{canvasConfig, layoutConfigs, chartConfigs}};
}

/**
 * 删除布局中的组件
 */
function delItem(preState: LCDesignerProps, data: any) {
    data = parseInt(data);
    let {layoutConfigs, chartConfigs, activated} = preState;
    _.remove(layoutConfigs, function (item) {
        return item?.id === data;
    })
    delete chartConfigs[data + ''];
    if (data === activated.id) {
        activated.id = -1;
        activated.type = "";
    }
    return {...preState};
}

/**
 * 更新每个组件的布局属性
 */
function updateLayout(preState: LCDesignerProps, data: any) {
    let {layoutConfigs} = preState;
    const {i, x, y, w, h} = data;
    for (let index = 0; index < layoutConfigs.length; index++) {
        if (layoutConfigs[index].i === i) {
            layoutConfigs[index] = {...layoutConfigs[index], ...{x, y, w, h}}
            break;
        }
    }
    return {...preState};
}

/**
 * 更新右侧抽屉visible属性
 */
function updateActive(preState: LCDesignerProps, data: any) {
    let {activated} = preState;
    const {elemId, type} = data;
    activated = {...activated, ...{id: elemId, type}};
    return {...preState, ...{activated}};
}

/**
 * 更新组件基础属性
 */
function updateBaseStyle(preState: LCDesignerProps, data: any) {
    let {chartConfigs, activated} = preState;
    const {id} = activated;
    let charConfig = chartConfigs[id + ''];
    let baseConfig = charConfig?.baseStyle;
    charConfig.baseStyle = {...baseConfig, ...data};
    return {...preState};
}

/**
 * 更新图表设置
 */
function updateChartProps(preState: LCDesignerProps, data: any) {
    let {chartConfigs, activated} = preState;
    let activeConfig = chartConfigs[activated?.id + ''];
    const activeCompName = activated?.type;
    if (activeCompName === "AntdRadar") {
        activeConfig.chartProps = {...activeConfig.chartProps, ...data}
    } else {
        activeConfig.chartProps = _.mergeWith(activeConfig.chartProps, data, (objValue: any, srcValue: any, key: any) => {
            if (key === 'data')
                return objValue = srcValue;
        });
    }
    return {...preState};
}

/**
 * 更新设计器全局配置
 */
function updateCanvasConfig(preState: LCDesignerProps, data: any) {
    const {canvasConfig} = preState;
    preState.canvasConfig = {...canvasConfig, ...data};
    return {...preState};
}

/**
 * 更新项目设置
 */
function updateProjectConfig(preState: LCDesignerProps, data: any) {

}

/**
 * 更新背景设置
 */
function updateBgConfig(preState: LCDesignerProps, data: any) {

}

/**
 * 更新系统设置
 */
function updateSystemConfig(preState: LCDesignerProps, data: any) {

}
