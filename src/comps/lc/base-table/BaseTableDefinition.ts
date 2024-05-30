import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTableImg from './base-table.png';
import {BaseTableController} from "./BaseTableController";
import {BaseTableComponentProps} from "./BaseTableComponent";
import {BaseTableStyleConfig} from "./BaseTableConfig";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

export default class BaseTableDefinition extends AbstractDesignerDefinition<BaseTableController, BaseTableComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础表格",
            compKey: "LcBaseTable",
            categorize: "web",
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
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = BaseTableStyleConfig;
        return menuMapping;
    }

    getEventList(): Array<EventInfo> {
        const eventList = super.getEventList();
        eventList.push(...[
            {
                id: "dataChange",
                name: "数据变更时",
            }
        ])
        return eventList;
    }
}