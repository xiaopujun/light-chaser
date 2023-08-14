import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import {AntdBaseMenuMapping} from "../types";
import AntdCommonArea, {AntdAreaProps} from "./AntdCommonArea";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdAreaCommonStyleConfig = React.lazy(() => import("./AntdAreaCommonConfig").then((module) => ({default: module.AntdAreaCommonStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractAreaDefinition extends AbstractCustomComponentDefinition<AntdCommonArea, AntdBaseMenuMapping, AntdAreaProps> {

    getComponent(): ClazzTemplate<AntdCommonArea> | null {
        return AntdCommonArea;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdAreaCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}

export default AbstractAreaDefinition;
