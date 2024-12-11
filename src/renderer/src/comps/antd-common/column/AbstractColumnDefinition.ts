import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdCommonColumnController, {AntdColumnProps} from "./AntdCommonColumnController";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdColumnCommonStyleConfig = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnCommonStyleConfig})));
const AntdColumnCommonFieldMapping = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnCommonFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractColumnDefinition extends AntdCommonDefinition<AntdCommonColumnController, AntdColumnProps> {

    getController(): ClazzTemplate<AntdCommonColumnController> | null {
        return AntdCommonColumnController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdColumnCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdColumnCommonFieldMapping
        };
    }
}

export default AbstractColumnDefinition;
