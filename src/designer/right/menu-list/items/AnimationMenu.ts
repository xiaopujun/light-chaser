import {VideoCameraFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class AnimationMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: VideoCameraFilled,
            name: '动画',
            key: 'animation',
        }
    }
}