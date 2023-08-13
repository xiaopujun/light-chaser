import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonColumn, {AntdColumnProps} from "./AntdCommonColumn";
import {AntdBaseMenuMapping} from "../types";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdColumnCommonStyleConfig = React.lazy(() => import("./AntdColumnCommonConfig").then((module) => ({default: module.AntdColumnCommonStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractColumnDefinition extends AbstractCustomComponentDefinition<AntdCommonColumn, AntdBaseMenuMapping, AntdColumnProps> {

    getComponent(): ClazzTemplate<AntdCommonColumn> | null {
        return AntdCommonColumn;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdColumnCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}

export default AbstractColumnDefinition;
