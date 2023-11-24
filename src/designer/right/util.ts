import {AppstoreFilled, DatabaseFilled, HighlightFilled, InteractionFilled, SkinFilled} from "@ant-design/icons";
import {MenuInfo} from "./MenuType";

export const getDefaultMenuList = (): Array<MenuInfo> => {
    return [
        {
            icon: AppstoreFilled,
            name: '基础',
            key: 'base',
        },
        {
            icon: HighlightFilled,
            name: '样式',
            key: 'style',
        },
        {
            icon: DatabaseFilled,
            name: '数据',
            key: 'data',
        },
        {
            icon: InteractionFilled,
            name: '映射',
            key: 'mapping',
        },
        // {
        //     icon: VideoCameraFilled,
        //     name: '动画',
        //     key: 'animation',
        // },
        {
            icon: SkinFilled,
            name: '主题',
            key: 'theme',
        }
    ];
}