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
//更新组件基础配置
export const updateBaseStyle = (data: any) => ({type: DesignerOperate.UPDATE_BASE_STYLE, data});
//更新组件图表配置
export const updateChartProps = (data: any) => ({type: DesignerOperate.UPDATE_CHART_PROPS, data});
//更新组件基础信息
export const updateBaseInfo = (data: any) => ({type: DesignerOperate.UPDATE_BASE_INFO, data});
//更新系统设置
export const updateSystemConfig = (data: any) => ({type: DesignerOperate.UPDATE_SYSTEM_CONFIG, data});
//更新背景设置
export const updateBgConfig = (data: any) => ({type: DesignerOperate.UPDATE_BG_CONFIG, data});
//更新画布设置
export const updateCanvasConfig = (data: any) => ({type: DesignerOperate.UPDATE_CANVAS_CONFIG, data});
//更新项目设置
export const updateProjectConfig = (data: any) => ({type: DesignerOperate.UPDATE_PROJECT_CONFIG, data});


