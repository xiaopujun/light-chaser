import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdCommonLineController, {AntdLineProps} from "./AntdCommonLineController";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdLineCommonStyleConfig = React.lazy(() => import("./AntdLineCommonConfig").then((module) => ({default: module.AntdLineCommonStyleConfig})));
const AntdLineCommonFieldMapping = React.lazy(() => import("./AntdLineCommonConfig").then((module) => ({default: module.AntdLineCommonFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractLineDefinition extends AntdCommonDefinition<AntdCommonLineController, AntdLineProps> {

    getController(): ClazzTemplate<AntdCommonLineController> | null {
        return AntdCommonLineController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdLineCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdLineCommonFieldMapping
        };
    }
}

export default AbstractLineDefinition;
