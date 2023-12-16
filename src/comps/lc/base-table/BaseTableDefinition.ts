import {AbstractDefinition, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTableImg from './base-table.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseTableController} from "./BaseTableController";
import {BaseTableComponentProps} from "./BaseTableComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import {BaseTableStyleConfig} from "./BaseTableConfig";
import DataConfig from "../../common-component/data-config/DataConfig";

export default class BaseTableDefinition extends AbstractDefinition<BaseTableController, BaseTableComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础表格",
            compKey: "LcBaseTable",
            type: "基础",
            typeKey: "base",
        };
    }

    getChartImg(): string | null {
        return baseTableImg;
    }

    getController(): ClazzTemplate<BaseTableController> | null {
        return BaseTableController;
    }

    getInitConfig(): BaseTableComponentProps {
        const data = [
            {name: '张三', age: 18, sex: '男'},
            {name: '李四', age: 20, sex: '女'},
            {name: '王五', age: 22, sex: '男'}
        ];
        return {
            base: {
                id: "",
                name: '基础表格',
                type: 'LcBaseTable',
            },
            style: {
                columns: [
                    {
                        key: 'name',
                        label: '姓名',
                        width: undefined,
                        textAlign: 'center',
                    },
                    {
                        key: 'age',
                        label: '年龄',
                        width: undefined,
                        textAlign: 'center',
                    },
                    {
                        key: 'sex',
                        label: '性别',
                        width: undefined,
                        textAlign: 'center',
                    }
                ],
                data,
                header: {
                    height: 40,
                    background: '#0080be',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 900,
                },
                body: {
                    background: '#141414',
                    color: '#acacac',
                    fontSize: 14,
                    fontWeight: 500,
                    enableCarousel: false,
                    carouselSpeed: 3,
                }
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data
                },
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme' && item.key !== 'mapping');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseTableStyleConfig,
            animation: AnimationConfig,
            data: DataConfig,
        };
    }
}