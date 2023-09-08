import React from "react";
import {
    AbstractCustomComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonLine, {AntdLineProps} from "./AntdCommonLine";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdLineCommonStyleConfig = React.lazy(() => import("./AntdLineCommonConfig").then((module) => ({default: module.AntdLineCommonStyleConfig})));
const AntdLineFieldMapping = React.lazy(() => import("./AntdLineCommonConfig").then((module) => ({default: module.AntdLineFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractLineDefinition extends AbstractCustomComponentDefinition<AntdCommonLine, AntdLineProps> {

    getComponent(): ClazzTemplate<AntdCommonLine> | null {
        return AntdCommonLine;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdLineCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdLineFieldMapping
        };
    }
}

export default AbstractLineDefinition;
