import {MenuInfo} from "../menu-list/AbstractMenu";
import {
    DatabaseFilled,
    HighlightFilled,
    MediumCircleFilled,
    PictureFilled,
    SkinFilled,
    VideoCameraFilled
} from "@ant-design/icons";

export const getDefaultMenuList = (): Array<MenuInfo> => {
    return [
        {
            icon: VideoCameraFilled,
            name: '动画',
            key: 'animation',
        },
        {
            icon: PictureFilled,
            name: '背景',
            key: 'bg',
        },
        {
            icon: DatabaseFilled,
            name: '数据',
            key: 'data',
        },
        {
            icon: MediumCircleFilled,
            name: '信息',
            key: 'info',
        },
        {
            icon: HighlightFilled,
            name: '样式',
            key: 'style',
        },
        {
            icon: SkinFilled,
            name: '主题',
            key: 'theme',
        }
    ];
}