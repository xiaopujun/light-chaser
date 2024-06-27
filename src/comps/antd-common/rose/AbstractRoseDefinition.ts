import React from "react";
import {ClazzTemplate, MenuToConfigMappingType} from "../../../designer/DesignerType.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";

import AntdCommonRoseController, {AntdRoseProps} from "./AntdCommonRoseController";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRoseCommonStyleConfig = React.lazy(() => import("./AntdRoseCommonConfig"));
const AntdRoseFieldMapping = React.lazy(() => import("./AntdRoseCommonConfig").then((module) => ({default: module.AntdRoseFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractRoseDefinition extends AntdCommonDefinition<AntdCommonRoseController, AntdRoseProps> {

    getController(): ClazzTemplate<AntdCommonRoseController> | null {
        return AntdCommonRoseController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdRoseCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdRoseFieldMapping
        };
    }
}

export default AbstractRoseDefinition;
