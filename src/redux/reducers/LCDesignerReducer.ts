import {
    ACTIVE_ELEM,
    ADD_ITEM,
    CLEAR_LC_DESIGNER_STORE,
    DELETE_ITEM,
    UPDATE_DRAWER_VISIBLE,
    UPDATE_ELEM_BASE_SET,
    UPDATE_ELEM_CHART_SET,
    UPDATE_ITEM_LAYOUT,
    UPDATE_LC_DESIGNER_STORE,
} from '../constant';
import {Action, LCDesignerProps} from "../../global/types";
import {getChartInitData} from "../../utils/ChartUtil";
import * as _ from 'lodash'
import deepmerge from "deepmerge";

/**
 * 初始化的布局设计器状态
 */
const initState: LCDesignerProps = {
    id: -1,
    globalSet: {
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
    active: {
        id: -1,    //激活的组件id
        type: "",    //激活的组件类型
    },
    chartConfigs: {},//布局设计器中的图表组件列表，每次设置图表样式或数据时更新此状态中的数据来更新渲染
    layoutConfigs: [],//布局配置数据，用于控制图表在页面中的整体布局位置
    rightDialog: {
        visible: false
    }
}

/**
 *布局设计器reducer，该reducer下分发各路子的处理器，
 *分别处理当前激活状态、标题设置、背景设置、边框设置、图表属性设置
 */
export default function LCDesignerReducer(preState: LCDesignerProps = initState, action: Action) {
    const {type, data} = action;
    switch (type) {
        case UPDATE_LC_DESIGNER_STORE:                      //初始化store
            return updateLCDesignerStore(preState, data);
        case CLEAR_LC_DESIGNER_STORE:                      //清除store
            return clearLCDesignerStore(preState, data);
        case ADD_ITEM:                                      //添加新的组件到画布中
            return addItem(preState, data);
        case DELETE_ITEM:                                   //从画布中删除组件
            return deleteItem(preState, data);
        case UPDATE_ITEM_LAYOUT:
            return updateItemLayout(preState, data);
        case ACTIVE_ELEM:
            return activeElem(preState, data);
        case UPDATE_DRAWER_VISIBLE:
            return updateDrawerVisible(preState, data);
        case UPDATE_ELEM_BASE_SET:
            return updateElemBaseSet(preState, data);
        case UPDATE_ELEM_CHART_SET:
            return updateElemChartSet(preState, data);
        default:                                            //无更新，返回之前的状态
            return preState;
    }
}

/**
 * 清除store
 */
function clearLCDesignerStore(preState: LCDesignerProps, data: any) {
    return initState;
}


/**
 * 初始化store
 * @param preState
 * @param data
 * @returns
 */
function updateLCDesignerStore(preState: LCDesignerProps, data: any) {
    return {...deepmerge(preState, data)};
}


/**
 * 想布局设计器中添加组件
 * @param preState
 * @param data
 * @returns {{layoutConfigs, chartConfig, count}}
 */
function addItem(preState: LCDesignerProps, data: any) {
    let {globalSet, layoutConfigs, chartConfigs} = preState;
    const {name: type} = data;
    //根据类型获取对应图表的初始化数据
    let chartInitData = getChartInitData(type);
    layoutConfigs.push(data);
    chartConfigs[globalSet.elemCount + ""] = chartInitData;
    globalSet.elemCount++; //组件数增加
    //重组状态
    return {...preState, ...{globalSet, layoutConfigs, chartConfigs}};
}

/**
 * 删除布局中的组件
 * @param preState
 * @param data
 */
function deleteItem(preState: LCDesignerProps, data: any) {
    data = parseInt(data);
    let {layoutConfigs, chartConfigs, active} = preState;
    _.remove(layoutConfigs, function (item) {
        return item?.id === data;
    })
    delete chartConfigs[data + ''];
    if (data === active.id) {
        active.id = -1;
        active.type = "";
    }
    return {...preState};
}

/**
 * @description 更新每个组件的布局属性
 * @param preState
 * @param data
 */
function updateItemLayout(preState: LCDesignerProps, data: any) {
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
 * @description 更新右侧抽屉visible属性
 * @param preState
 * @param data
 */
function activeElem(preState: LCDesignerProps, data: any) {
    let {active, rightDialog} = preState;
    const {elemId, type} = data;
    active = {...active, ...{id: elemId, type}};
    rightDialog.visible = !rightDialog.visible;
    return {...preState, ...{active, rightDialog}};
}


/**
 * @description 更新右侧抽屉显示状态
 * @param preState
 * @param data
 */
function updateDrawerVisible(preState: LCDesignerProps, data: any) {
    let {rightDialog} = preState;
    rightDialog.visible = !rightDialog.visible;
    return {...preState, ...{rightDialog}};
}

/**
 * @description 更新组件基础属性
 * @param preState
 * @param data
 */
function updateElemBaseSet(preState: LCDesignerProps, data: any) {
    let {chartConfigs, active} = preState;
    const {id} = active;
    let charConfig = chartConfigs[id + ''];
    let baseConfig = charConfig?.baseStyle;
    charConfig.baseStyle = {...baseConfig, ...data};
    return {...preState};
}

/**
 * @description 更新图表设置
 * @param preState
 * @param data
 */
function updateElemChartSet(preState: LCDesignerProps, data: any) {
    let {chartConfigs, active} = preState;
    let activeConfig = chartConfigs[active?.id + ''];
    const activeCompName = active?.type;
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
