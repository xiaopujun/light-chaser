import {ADD_ITEM, DELETE_ITEM,} from '../constant';
import {Action, LayoutDesignerStoreProps} from "../../global/types";
import {getChartInitData} from "../../utils/ChartUtil";


/**
 * 初始化的布局设计器状态
 */
const initState: LayoutDesignerStoreProps = {
    count: 0,
    active: {
        id: -1,    //激活的组件id
        type: "",    //激活的组件类型
        subType: "",    //激活的组件子类型
    },
    chartConfigMap: new Map(),//布局设计器中的图表组件列表，每次设置图表样式或数据时更新此状态中的数据来更新渲染
    layoutConfig: [],//布局配置数据，用于控制图表在页面中的整体布局位置
    propConfigDialog: {
        visible: false
    }
}

/**
 *布局设计器reducer，该reducer下分发各路子的处理器，
 *分别处理当前激活状态、标题设置、背景设置、边框设置、图表属性设置
 */
export default function layoutDesignerReducer(preState: LayoutDesignerStoreProps = initState, action: Action) {
    const {type, data} = action;
    switch (type) {
        case ADD_ITEM:                                      //添加新的组件到画布中
            return addItem(preState, data);
        case DELETE_ITEM:                                   //从画布中删除组件
            return deleteItem(preState, data);
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
function addItem(preState: LayoutDesignerStoreProps, data: any) {
    let {count, layoutConfig, chartConfigMap} = preState;
    const {name: type} = data;
    //根据类型获取对应图表的初始化数据
    let chartInitData = getChartInitData(type);
    layoutConfig.push(data);
    chartConfigMap.set(count, chartInitData);
    count++; //组件数增加
    //重组状态
    return {...preState, ...{count, layoutConfig, chartConfigMap}};
}

/**
 * 删除布局中的组件
 * @param preState
 * @param action
 */
function deleteItem(preState: LayoutDesignerStoreProps, data: any) {

}

