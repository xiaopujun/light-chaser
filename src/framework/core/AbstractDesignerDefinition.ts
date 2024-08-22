import {AbstractDefinition, MenuToConfigMappingType} from "./AbstractDefinition.ts";
import AbstractController from "./AbstractController.ts";
import AbstractDesignerController from "./AbstractDesignerController.ts";
import {MenuInfo} from "../../designer/right/MenuType.ts";
import {ColorFilter, Data, Optimize, SettingOne, Theme} from "@icon-park/react";
import {lazy} from "react";
import {Observable} from "../../utils/observable";

const AnimationConfig = lazy(() => import("../../comps/common-component/animation-config/AnimationConfig.tsx"));
const ThemeConfig = lazy(() => import("../../comps/common-component/theme-config/ThemeConfig.tsx"));
const BaseInfo = lazy(() => import("../../comps/common-component/base-info/BaseInfo.tsx"));
const DataConfig = lazy(() => import("../../comps/common-component/data-config/DataConfig.tsx"));
const FilterConfig = lazy(() => import("../../comps/common-component/filter-config/FilterConfig.tsx"));


export default abstract class AbstractDesignerDefinition<C extends AbstractController = AbstractDesignerController, P = any> extends AbstractDefinition<C, P> {

    // 全局的数据发生变化的时候，通知组件更新数据，挂在在window下是否合适？？？
    public onGlobalDataChangeObservable = window.onGlobalDataChangeObservable = new Observable();


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
}
