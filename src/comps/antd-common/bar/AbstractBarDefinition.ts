import React from "react";
import {
    AbstractCustomComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonBar, {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";
import {AntdBarFieldMapping} from "./AntdBarCommonConfig";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdBarCommonStyleConfig = React.lazy(() => import("./AntdBarCommonConfig").then((module) => ({default: module.AntdBarCommonStyleConfig})));
// const AntdFieldMapping = React.lazy(() => import("../config/field-mapping/AntdFieldMapping"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractBarDefinition extends AbstractCustomComponentDefinition<AntdCommonBar, AntdBarProps> {

    getComponent(): ClazzTemplate<AntdCommonBar> | null {
        return AntdCommonBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdBarCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdBarFieldMapping,
        };
    }
}

export default AbstractBarDefinition;
