import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import LcColorBlock from "./LcColorBlock";
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";
import ThemeConfig from "../../../lib/common-fragment/theme-config/ThemeConfig";
import {LcColorBlockConfig} from "./LcColorBlockConfig";
import ColorBlockImg from './color-block.png';

class LcColorBlockCore extends AbstractCustomComponentDefinition {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    }

    getBaseInfo(): BaseInfoType | null {
        return {
            name: "颜色块",
            key: 'LcColorBlock',
            typeName: "颜色块",
            typeKey: "base",
            sourceName: "Lc",
            sourceKey: "lc",
        };
    }

    getChartImg(): any {
        return ColorBlockImg;
    }

    getComponent(): any {
        return LcColorBlock;
    }

    getInitConfig(): ElemConfig | Object | null {
        return {
            info: {
                id: '',
                name: '颜色块',
                type: 'LcColorBlock',
                des: 'Lc设计器默认颜色块',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "#0f273db5",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {}
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: "基础文本"
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }

    getKey(): string {
        return "LcColorBlock";
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((item: MenuInfo) => item.name !== '数据');
    }

    getMenuToConfigContentMap(): { [p: string]: any } {
        return {
            'info': BaseInfo,
            'style': LcColorBlockConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

}

export default LcColorBlockCore;