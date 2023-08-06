import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {Bar, BarOptions} from "@antv/g2plot";
import {merge} from "../../../utils/ObjectUtil";
import {WritableBarOptions} from "./AntdBaseBarDefinition";
import {DataConfigType, ThemeItemType} from "../../../designer/DesignerType";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import AbstractDesignerComponent from "../../../framework/core/AbstractDesignerComponent";
import {ShapeAttrs} from "@antv/g-base";

export interface ComponentInfoType {
    name: string;
    type: string;
    desc: string;
}

export interface AntdBarProps {
    info?: ComponentInfoType;
    style?: WritableBarOptions;
    data?: DataConfigType;
}

export default class AntdBaseBar extends AbstractDesignerComponent<Bar, AntdBarProps> {


    interval: NodeJS.Timer | null = null;

    private loadData(): void {
        const {data} = this.config!;
        const {dataSource} = data!;
        switch (dataSource) {
            case "static":
                this.config!.style!.data = this.config?.data?.staticData?.data;
                break;
            case "api":
                const {url, method, params, header, flashFrequency = 5} = data?.apiData!;
                this.interval = setInterval(() => {
                    sendHttpRequest(url!, method!, params!, header!).then((data: any) => {
                        if (data) {
                            this.update({style: {data}}, {reRender: true, operateType: OperateType.DATA});
                        } else
                            //todo 提示错误
                            console.log('error')
                    });
                }, flashFrequency * 1000);
                break;
        }
    }

    async create(container: HTMLElement, config: AntdBarProps): Promise<this> {
        this.config = config;
        if (!this.instance)
            this.instance = new Bar(container, config?.style! as BarOptions);
        this.loadData();
        this.instance.render();
        return this;
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): AntdBarProps | null {
        return this.config;
    }

    update(config: AntdBarProps, upOp?: UpdateOptions): void {
        this.config = merge(this.config, config) as AntdBarProps;
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender) {
            if (upOp.operateType === OperateType.DATA)
                this.instance?.changeData(this.config!.style!.data!);
            else
                this.instance?.update(this.config?.style!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme)
            return;
        const styleConfig = this.config?.style!;
        const {colors: {main, text, supplementary, emphasize, background, auxiliary}} = newTheme;
        //图形
        if (styleConfig?.color)
            styleConfig.color = main;
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs)?.fill)
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = text;
        //x轴-文本
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.label?.style as ShapeAttrs).fill)
            (styleConfig!.xAxis!.label!.style as ShapeAttrs).fill = text;
        //x轴-标题
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.xAxis!.title!.style as ShapeAttrs).fill = text;
        //x轴-轴线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //x轴-网格线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //x轴-刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //x轴-子刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-文本
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.label?.style as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.label!.style as ShapeAttrs).fill = text;
        //y轴-标题
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.title!.style as ShapeAttrs).fill = text;
        //y轴-轴线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //y轴-网格线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //y轴-子刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
        //重新渲染
        this.update({style: styleConfig}, {reRender: true, operateType: OperateType.OPTIONS});
    }

}