import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonAreaController, {AntdAreaProps} from "./AntdCommonAreaController";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdAreaCommonStyleConfig = React.lazy(() => import("./AntdAreaCommonConfig").then((module) => ({default: module.AntdAreaCommonStyleConfig})));
const AntdFieldMapping = React.lazy(() => import("../config/field-mapping/AntdFieldMapping"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractAreaDefinition extends AbstractComponentDefinition<AntdCommonAreaController, AntdAreaProps> {

    getComponent(): ClazzTemplate<AntdCommonAreaController> | null {
        return AntdCommonAreaController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdAreaCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdFieldMapping
        };
    }
}

export default AbstractAreaDefinition;
