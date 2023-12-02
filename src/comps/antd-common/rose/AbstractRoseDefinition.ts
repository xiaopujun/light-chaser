import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonRose, {AntdRoseProps} from "./AntdCommonRose";
import {AntdRoseFieldMapping} from "./AntdRoseCommonConfig";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRoseCommonStyleConfig = React.lazy(() => import("./AntdRoseCommonConfig"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

abstract class AbstractRoseDefinition extends AntdCommonDefinition<AntdCommonRose, AntdRoseProps> {

    getComponent(): ClazzTemplate<AntdCommonRose> | null {
        return AntdCommonRose;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
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
