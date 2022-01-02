import {
    ADD_ITEM, DELETE_ITEM, UPDATE_TITLE_CONFIG, UPDATE_BORDER_CONFIG,
    UPDATE_BACKGROUND_CONFIG, UPDATE_CHART_CONFIG, UPDATE_ACTIVE_CONFIG,
} from '../constant';
import {antdBaseBar, antdGroupBar, antdZoneBar, antdStackBar, antdPercentBar} from '../../init/data/antd-bar';
import {antdBarPropertiesProcess} from '../../utils/AntdBarUtil';

/**
 * 初始化的布局设计器状态
 */
const initState = {
    count: 0,
    currentActive: {
        activeId: "",    //激活的组件id
        activeType: "",    //激活的组件类型
        activeSubType: "",    //激活的组件子类型
    },
    chartConfig: new Map(),//布局设计器中的图表组件列表，每次设置图表样式或数据时更新此状态中的数据来更新渲染
    layoutConfig: [],//布局配置数据，用于控制图表在页面中的整体布局位置
}

/**
 *布局设计器reducer，该reducer下分发各路子的处理器，
 *分别处理当前激活状态、标题设置、背景设置、边框设置、图表属性设置
 */
export default function layoutDesignerReducer(preState = initState, action) {
    const {type, data} = action;
    switch (type) {
        case ADD_ITEM:                                      //添加新的组件到画布中
            return addItem(preState, action);
        case DELETE_ITEM:                                   //从画布中删除组件
            return deleteItem(preState, action);
        case UPDATE_ACTIVE_CONFIG:                          //更新当前激活的组件信息
            return updateActiveConfig(preState, data);
        case UPDATE_TITLE_CONFIG:                           //更新标题设置
            return updateTitleConfig(preState, data);
        case UPDATE_BORDER_CONFIG:                          //更新边框设置
            return updateBorderConfig(preState, data);
        case UPDATE_BACKGROUND_CONFIG:                      //更新背景设置
            return updateBackgroundConfig(preState, data);
        case UPDATE_CHART_CONFIG:                           //更新图表设置
            return updateChartConfig(preState, data);
        default:                                            //无更新，返回之前的状态
            return preState;
    }
}

/**
 * 想布局设计器中添加组件
 * @param preState
 * @param action
 * @returns {{layoutConfig, chartConfig, count}}
 */
function addItem(preState, action) {
    let {chartConfig, layoutConfig, currentActive, count} = preState;
    const {data} = action;
    layoutConfig.push(data);
    analysisConfig(preState, data);
    count++;
    return {chartConfig, layoutConfig, currentActive, count};
}

/**
 * 删除布局中的组件
 * @param preState
 * @param action
 */
function deleteItem(preState, action) {
    // const {chartList, layoutConfig} = initState;
}

/**
 * 解析布局类型，根据不同的组件设置不同的初始化属性
 * @param data
 */
function analysisConfig(preState, data) {
    const {i, name} = data;
    switch (name) {
        case "AntdBaseBar":
            preState.chartConfig.set(i, antdBaseBar);
            break;
        case "AntdGroupBar":
            preState.chartConfig.set(i, antdGroupBar);
            break;
        case "AntdPercentBar":
            preState.chartConfig.set(i, antdPercentBar);
            break;
        case "AntdZoneBar":
            preState.chartConfig.set(i, antdZoneBar);
            break;
        case "AntdStackBar":
            preState.chartConfig.set(i, antdStackBar);
            break;
        default:
            preState.chartConfig.set(i, antdBaseBar);
    }
}

/**
 * 更新标题设置
 * @param data
 */
function updateTitleConfig(preState, data) {
    let {currentActive, chartConfig} = preState;
    let {activeId = -1} = currentActive;
    let tempChartConfig = chartConfig.get(activeId);
    tempChartConfig['titleConfig'] = {...tempChartConfig.titleConfig, ...data};
    chartConfig.set(activeId, tempChartConfig);
    return {...preState};
}

/**
 * 更新边框设置
 * @param preState
 * @param data
 */
function updateBorderConfig(preState, data) {
    //通过激活的id拿到对应组件的配置
    const {currentActive, chartConfig} = preState;
    let {activeId = -1} = currentActive;
    let tempConfig = chartConfig.get(activeId);
    tempConfig.borderConfig = {...tempConfig.borderConfig, ...data};
    return {...preState, ...{chartConfig}};
}

/**
 * 更新背景设置
 * @param preState
 * @param data
 */
function updateBackgroundConfig(preState, data) {
    //通过激活的id拿到对应组件的配置
    const {currentActive, chartConfig} = preState;
    let {activeId = -1} = currentActive;
    let tempConfig = chartConfig.get(activeId);
    tempConfig.backgroundConfig = {...tempConfig.backgroundConfig, ...data};
    return {...preState, ...{chartConfig}};
}

/**
 * 更新当前激活参数
 * @param preState
 * @param data
 */
function updateActiveConfig(preState, data) {
    let res = preState;
    let {currentActive} = preState;
    //合并激活配置
    currentActive = {...currentActive, ...data};
    res = {...preState, ...{currentActive}};
    return {...res};
}

/**
 * 更新图表组件配置，此方法需要根据具体图表组件的进行配置分发处理
 * @param preState
 * @param data
 */
function updateChartConfig(preState, data) {
    return antdBarPropertiesProcess(preState, data);
}