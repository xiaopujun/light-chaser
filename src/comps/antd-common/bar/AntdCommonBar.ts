import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableBarOptions} from "../types";
import {Bar} from "@antv/g2plot";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";
import BPExecutor from "../../../blueprint/core/BPExecutor";
import {NodeType} from "../../../blueprint/node/types";
import {AnchorPointType} from "../../../blueprint/node/BPNode";

export interface AntdBarProps extends ComponentBaseProps {
    style?: WritableBarOptions;
}

export default class AntdCommonBar extends AntdBaseDesignerController<Bar, AntdBarProps> {

    async create(container: HTMLElement, config: AntdBarProps): Promise<this> {
        const controller = super.commonCreate(container, Bar, config);
        this.registerEvent();
        return controller;
    }

    private registerEvent(): void {
        const nodeId = this.config?.info?.id!;
        this.instance?.on('plot:click', (...args: any) => {
            BPExecutor.execute(nodeId! + "_" + NodeType.LAYER + "_globalClick_" + AnchorPointType.OUTPUT, {msg: '这是测试参数'})
        });
        // this.instance?.on('element:click', (...args: any) => {
        //     console.log('element:click', ...args);
        // });
        // // 图例添加点击事件
        // this.instance?.on('legend-item:click', (...args: any) => {
        //     console.log('legend-item:click', ...args);
        // });
        // // 图例名称添加点击事件
        // this.instance?.on('legend-item-name:click', (...args: any) => {
        //     console.log('legend-item-name:click', ...args);
        // });
        // // 给 tooltip 添加点击事件
        // this.instance?.on('tooltip:show', (...args: any) => {
        //     console.log('tooltip:show', ...args);
        // });
        // this.instance?.on('tooltip:hide', (...args: any) => {
        //     console.log('tooltip:hide', ...args);
        // });
        // this.instance?.on('tooltip:change', (...args: any) => {
        //     console.log('tooltip:change', ...args);
        // });
        // // label 添加点击事件
        // this.instance?.on('label:click', (...args: any) => {
        //     console.log('label:click', ...args);
        // });
        // // mask 添加点击事件
        // this.instance?.on('mask:click', (...args: any) => {
        //     console.log('mask:click', ...args);
        // });
        // // axis-label 添加点击事件
        // this.instance?.on('axis-label:click', (...args: any) => {
        //     console.log('axis-label:click', ...args);
        // });
        // // 给 annotation 添加点击事件
        // this.instance?.on('annotation:click', (...args: any) => {
        //     console.log('annotation:click', ...args);
        // });
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdBarProps | null {
        return this.config;
    }

    update(config: AntdBarProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Bar, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme) return;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementSecond, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color) {
            styleConfig.barStyle = {fill: undefined};
            styleConfig.color = [main!, supplementFirst!, supplementSecond!];
        }
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs))
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = mainText;
        //x轴-文本
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.label?.style as ShapeAttrs))
            (styleConfig!.xAxis!.label!.style as ShapeAttrs).fill = subText;
        //x轴-标题
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.title as ShapeAttrs))
            (styleConfig!.xAxis!.title!.style as ShapeAttrs).fill = mainText;
        //x轴-轴线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.line?.style as ShapeAttrs))
            (styleConfig!.xAxis!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-网格线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.grid?.line?.style as ShapeAttrs))
            (styleConfig!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.tickLine?.style as ShapeAttrs))
            (styleConfig!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-子刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.subTickLine?.style as ShapeAttrs))
            (styleConfig!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = supplementSecond;
        //y轴-文本
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.label?.style as ShapeAttrs))
            (styleConfig!.yAxis!.label!.style as ShapeAttrs).fill = subText;
        //y轴-标题
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.title as ShapeAttrs))
            (styleConfig!.yAxis!.title!.style as ShapeAttrs).fill = mainText;
        //y轴-轴线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.line?.style as ShapeAttrs))
            (styleConfig!.yAxis!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-网格线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.grid?.line?.style as ShapeAttrs))
            (styleConfig!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.tickLine?.style as ShapeAttrs))
            (styleConfig!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-子刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.subTickLine?.style as ShapeAttrs))
            (styleConfig!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = supplementSecond;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true, operateType: OperateType.OPTIONS});
    }
}