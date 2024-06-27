import {AbstractDefinition} from "./AbstractDefinition.ts";
import AbstractController from "./AbstractController.ts";
import AbstractDesignerController from "./AbstractDesignerController.ts";
import {MenuInfo} from "../../designer/right/MenuType.ts";
import {ColorFilter, Data, Optimize, SettingOne, Theme} from "@icon-park/react";
import {lazy} from "react";
import {MenuToConfigMappingType} from "../../designer/DesignerType.ts";

export interface ActionInfo {
    name: string;
    id: string;
    handler: (controller: AbstractDesignerController, params?: any) => void;
}


const AnimationConfig = lazy(() => import("../../comps/common-component/animation-config/AnimationConfig.tsx"));
const ThemeConfig = lazy(() => import("../../comps/common-component/theme-config/ThemeConfig.tsx"));
const BaseInfo = lazy(() => import("../../comps/common-component/base-info/BaseInfo.tsx"));
const DataConfig = lazy(() => import("../../comps/common-component/data-config/DataConfig.tsx"));
const FilterConfig = lazy(() => import("../../comps/common-component/filter-config/FilterConfig.tsx"));


export default abstract class AbstractDesignerDefinition<C extends AbstractController = AbstractDesignerController, P = any> extends AbstractDefinition<C, P> {

    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: SettingOne,
                name: '基础',
                key: 'base',
            },
            {
                icon: Optimize,
                name: '样式',
                key: 'style',
            },
            {
                icon: Data,
                name: '数据',
                key: 'data',
            },
            {
                icon: ColorFilter,
                name: '滤镜',
                key: 'filter',
            },
            // {
            //     icon: VideoCameraFilled,
            //     name: '动画',
            //     key: 'animation',
            // },
            {
                icon: Theme,
                name: '主题',
                key: 'theme',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            filter: FilterConfig
        };
    }

    /**
     * 返回当前组件能接受的动作列表，在蓝图图层节点中使用。可据此实现对组件的操作
     */
    getActionList(): ActionInfo[] {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractDesignerController) => {
                    controller.container!.style.visibility = "visible";
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractDesignerController) => {
                    controller.container!.style.visibility = "hidden";
                }
            },
            {
                name: "更新组件样式",
                id: "updateConfig",
                handler: (controller: AbstractDesignerController, params?: object) => {
                    controller.update(params);
                }
            },
            {
                name: "更新组件数据",
                id: "updateData",
                handler: (controller: AbstractDesignerController, params?: object) => {
                    controller.changeData(params);
                }
            }
        ];
    }
}