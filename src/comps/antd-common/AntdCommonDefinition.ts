import AbstractController from "../../framework/core/AbstractController";
import {AbstractComponentDefinition, ActionInfo, EventInfo} from "../../framework/core/AbstractComponentDefinition";


export abstract class AntdCommonDefinition<C extends AbstractController = AbstractController, P = any> extends AbstractComponentDefinition<C, P> {

    getEventList(): Array<EventInfo> {
        return [
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
        ]
    }

    getActionList(): Array<ActionInfo> {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractController, params?: any) => {
                    controller.container!.style.display = "block";
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractController, params?: any) => {
                    controller.container!.style.display = "none";
                }
            },
            {
                name: "更新组件配置",
                id: "updateConfig",
                handler: (controller: AbstractController, params?: any) => {
                    controller.update(params);
                }
            }
        ]
    }
}

