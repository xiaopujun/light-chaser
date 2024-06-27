import AbstractController from "../../framework/core/AbstractController";
import AbstractDesignerDefinition from "../../framework/core/AbstractDesignerDefinition.ts";
import {EventInfo} from "../../designer/DesignerType.ts";


export abstract class AntdCommonDefinition<C extends AbstractController = AbstractController, P = any> extends AbstractDesignerDefinition<C, P> {

    getEventList(): Array<EventInfo> {
        const eventList = super.getEventList();
        eventList.push(...[
            {
                id: "dataChange",
                name: "数据变更时",
            },
            {
                id: "globalClick",
                name: "点击整个组件时",
            },
            {
                id: "elementClick",
                name: "点击图形元素时",
            },
            {
                id: "legendClick",
                name: "点击图例时"
            },
            {
                id: "elementNameClick",
                name: "点击图例名称时"
            },
            {
                id: "axisLabelClick",
                name: "点击坐标文字时"
            }
        ])
        return eventList;
    }

}

