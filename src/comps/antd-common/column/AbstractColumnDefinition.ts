import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonColumn, {AntdColumnProps} from "./AntdCommonColumn";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdColumnCommonStyleConfig = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnCommonStyleConfig})));
const AntdFieldMapping = React.lazy(() => import("../config/field-mapping/AntdFieldMapping"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractColumnDefinition extends AbstractComponentDefinition<AntdCommonColumn, AntdColumnProps> {

    getComponent(): ClazzTemplate<AntdCommonColumn> | null {
        return AntdCommonColumn;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdColumnCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdFieldMapping
        };
    }
}

export default AbstractColumnDefinition;
