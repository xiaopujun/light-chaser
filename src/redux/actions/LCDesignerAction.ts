import {
    ACTIVE_ELEM,
    ADD_ITEM, CLEAR_LC_DESIGNER_STORE,
    DELETE_ITEM,
    UPDATE_DRAWER_VISIBLE,
    UPDATE_ELEM_BASE_SET,
    UPDATE_ELEM_CHART_SET,
    UPDATE_ITEM_LAYOUT,
    UPDATE_LC_DESIGNER_STORE,
} from '../constant';

/**
 * 布局设计器的action
 * @param data
 * @returns {{data, type: string}}
 */

//初始化store
export const updateLCDesignerStore = (data: any) => ({type: UPDATE_LC_DESIGNER_STORE, data});
//清除store
export const clearLCDesignerStore = (data: any) => ({type: CLEAR_LC_DESIGNER_STORE, data});
//添加组件
export const addItem = (data: any) => ({type: ADD_ITEM, data});
//删除组件
export const deleteItem = (data: any) => ({type: DELETE_ITEM, data});
//更新组件布局
export const updateItemLayout = (data: any) => ({type: UPDATE_ITEM_LAYOUT, data});
//激活组件
export const activeElem = (data: any) => ({type: ACTIVE_ELEM, data});
//更新右侧抽屉显示状态
export const updateDrawerVisible = (data: any) => ({type: UPDATE_DRAWER_VISIBLE, data});
//更新组件基础配置
export const updateElemBaseSet = (data: any) => ({type: UPDATE_ELEM_BASE_SET, data});
//更新组件图表配置
export const updateElemChartSet = (data: any) => ({type: UPDATE_ELEM_CHART_SET, data});


