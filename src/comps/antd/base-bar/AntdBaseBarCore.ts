import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import previewImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import {updateTheme} from "../../common-fragment/ThemeFragment";
import AntdBar from "./AntdBar";
import {ConfigType} from "../../../designer/right/ConfigType";
import {BaseInfoProps} from "../../common-fragment/base-info/BaseInfo";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<BaseInfoProps<BaseInfoType>>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}

export type ClazzTemplate<C> = new () => C | null;

const AntdBaseBarStyleConfig = React.lazy(() => import("./AntdBaseBarConfig").then((module) => ({default: module.AntdBaseBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));


class AntdBaseBarCore extends AbstractCustomComponentDefinition<AntdBar, AntdBaseBarMenuMapping> {
    getBaseInfo(): BaseInfoType {
        return {
            name: "基础条形图",
            key: "AntdBaseBar",
            typeName: "条形图",
            typeKey: "bar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): string {
        return previewImg;
    }

    getComponent(): ClazzTemplate<AntdBar> | null {
        return AntdBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseBarMenuMapping | null {
        return {
            info: BaseInfo,
            style: AntdBaseBarStyleConfig,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseBarCore;
