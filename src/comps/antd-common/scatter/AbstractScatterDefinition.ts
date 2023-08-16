import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdCommonScatter, {AntdScatterProps} from "./AntdCommonScatter";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdScatterCommonStyleConfig = React.lazy(() => import("./AntdScatterCommonConfig").then((module) => ({default: module.AntdScatterCommonStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractScatterDefinition extends AbstractCustomComponentDefinition<AntdCommonScatter, BaseMenuMapping, AntdScatterProps> {

    getComponent(): ClazzTemplate<AntdCommonScatter> | null {
        return AntdCommonScatter;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdScatterCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}

export default AbstractScatterDefinition;
