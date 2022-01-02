import {OPEN_RIGHT_SIIDE_BOX, CLOSE_RIGHT_SILDE_BOX} from "../constant";


/**
 *右滑框初始化状态
 */
const initSwitch = {
    switchState: false,
};

/**
 * 右滑框状态的reducer
 * @param preState 之前的状态
 * @param action 动作描述对象
 * @returns 下一个状态
 */
export default function rightSlideBoxReducer(preState = initSwitch, action) {
    const {type, data} = action;
    switch (type) {
        case OPEN_RIGHT_SIIDE_BOX:
        case CLOSE_RIGHT_SILDE_BOX:
            return {...preState, ...{switchState: data}};
        default:
            return preState;
    }
}

