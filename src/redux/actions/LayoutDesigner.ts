import {
    ADD_ITEM,
    DELETE_ITEM,
} from '../constant';

/**
 * 布局设计器的action
 * @param data
 * @returns {{data, type: string}}
 */
export const addItem = (data: any) => ({type: ADD_ITEM, data});
export const deleteItem = (data: any) => ({type: DELETE_ITEM, data});


