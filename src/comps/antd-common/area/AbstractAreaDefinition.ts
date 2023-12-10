import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonAreaController, {AntdAreaProps} from "./AntdCommonAreaController";
import {AntdAreaCommonFieldMapping} from "./AntdAreaCommonConfig";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdAreaCommonStyleConfig = React.lazy(() => import("./AntdAreaCommonConfig").then((module) => ({default: module.AntdAreaCommonStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractAreaDefinition extends AntdCommonDefinition<AntdCommonAreaController, AntdAreaProps> {

    getController(): ClazzTemplate<AntdCommonAreaController> | null {
        return AntdCommonAreaController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdAreaCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdAreaCommonFieldMapping
        };
    }
}

export default AbstractAreaDefinition;
