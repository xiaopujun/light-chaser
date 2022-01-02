import {
    ADD_ITEM,
    DELETE_ITEM,
    UPDATE_TITLE_CONFIG,
    UPDATE_BORDER_CONFIG,
    UPDATE_BACKGROUND_CONFIG,
    UPDATE_CHART_CONFIG,
    UPDATE_ACTIVE_CONFIG,
} from '../constant';

/**
 * 布局设计器的action
 * @param data
 * @returns {{data, type: string}}
 */
export const addItem = data => ({type: ADD_ITEM, data});
export const deleteItem = data => ({type: DELETE_ITEM, data});
export const updateTitleConfig = data => ({type: UPDATE_TITLE_CONFIG, data});
export const updateBorderConfig = data => ({type: UPDATE_BORDER_CONFIG, data});
export const updateBackgroundConfig = data => ({type: UPDATE_BACKGROUND_CONFIG, data});
export const updateActiveConfig = data => ({type: UPDATE_ACTIVE_CONFIG, data});
export const updateChartConfig = data => ({type: UPDATE_CHART_CONFIG, data})


