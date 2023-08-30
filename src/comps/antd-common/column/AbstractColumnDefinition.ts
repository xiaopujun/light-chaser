import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdCommonColumn, {AntdColumnProps} from "./AntdCommonColumn";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdColumnCommonStyleConfig = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnCommonStyleConfig})));
const AntdColumnFieldMapping = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractColumnDefinition extends AbstractCustomComponentDefinition<AntdCommonColumn, BaseMenuMapping, AntdColumnProps> {

    getComponent(): ClazzTemplate<AntdCommonColumn> | null {
        return AntdCommonColumn;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdColumnCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdColumnFieldMapping
        };
    }
}

export default AbstractColumnDefinition;
