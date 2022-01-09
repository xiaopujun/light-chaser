import {
    ACTIVE_ELEM,
    ADD_ITEM,
    DELETE_ITEM, UPDATE_DRAWER_VISIBLE, UPDATE_ITEM_LAYOUT,
} from '../constant';

/**
 * 布局设计器的action
 * @param data
 * @returns {{data, type: string}}
 */
export const addItem = (data: any) => ({type: ADD_ITEM, data});
export const deleteItem = (data: any) => ({type: DELETE_ITEM, data});
export const updateItemLayout = (data: any) => ({type: UPDATE_ITEM_LAYOUT, data});
export const activeElem = (data: any) => ({type: ACTIVE_ELEM, data});
export const updateDrawerVisible = (data: any) => ({type: UPDATE_DRAWER_VISIBLE, data});


