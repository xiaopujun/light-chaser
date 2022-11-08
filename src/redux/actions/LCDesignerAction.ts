import {DesignerOperate} from "../../enum/DesignerOperate";

/**
 * 布局设计器的action
 * @param data
 * @returns {{data, type: string}}
 */

//初始化store
export const updateDesignerStore = (data: any) => ({type: DesignerOperate.UPDATE_DESIGNER_STORE, data});
//清除store
export const clearDesignerStore = (data: any) => ({type: DesignerOperate.CLEAR_DESIGNER_STORE, data});
//添加组件
export const addItem = (data: any) => ({type: DesignerOperate.ADD_ITEM, data});
//删除组件
export const delItem = (data: any) => ({type: DesignerOperate.DEL_ITEM, data});
//更新组件布局
export const updateLayout = (data: any) => ({type: DesignerOperate.UPDATE_LAYOUT, data});
//激活组件
export const updateActive = (data: any) => ({type: DesignerOperate.UPDATE_ACTIVE, data});
//更新右侧抽屉显示状态
export const updateRightVisible = (data: any) => ({type: DesignerOperate.UPDATE_RIGHT_VISIBLE, data});
//更新组件基础配置
export const updateBaseStyle = (data: any) => ({type: DesignerOperate.UPDATE_BASE_STYLE, data});
//更新组件图表配置
export const updateChartProps = (data: any) => ({type: DesignerOperate.UPDATE_CHART_PROPS, data});


