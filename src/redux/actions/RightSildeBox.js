import {OPEN_RIGHT_SIIDE_BOX, CLOSE_RIGHT_SILDE_BOX} from '../constant';

/**
 * 右滑框的action
 * @param data
 * @returns {{data, type: string}}
 */
export const openRightSlideBox = data => ({type: OPEN_RIGHT_SIIDE_BOX, data});
export const closeRightSildeBox = data => ({type: CLOSE_RIGHT_SILDE_BOX, data});


