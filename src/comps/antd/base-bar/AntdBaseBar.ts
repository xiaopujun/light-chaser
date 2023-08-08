import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {Bar, BarOptions} from "@antv/g2plot";
import {merge} from "../../../utils/ObjectUtil";
import {WritableBarOptions} from "./AntdBaseBarDefinition";
import {DataConfigType, ThemeItemType} from "../../../designer/DesignerType";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import AbstractDesignerComponent from "../../../framework/core/AbstractDesignerComponent";
import {ShapeAttrs} from "@antv/g-base";
import ComponentUtil from "../../../utils/ComponentUtil";
import {LoadError} from "../../../lib/lc-loaderr/LoadError";
import ReactDOM from "react-dom";

export interface ComponentInfoType {
    id: string;
    name: string;
    type: string;
    desc: string;
}

export interface ComponentBaseProps {
    info?: ComponentInfoType;
    style?: Record<string, any>;
    data?: DataConfigType;
}

export interface AntdBarProps extends ComponentBaseProps {
    style?: WritableBarOptions;
}

export default class AntdBaseBar extends AbstractDesignerComponent<Bar, AntdBarProps> {

    interval: NodeJS.Timer | null = null;

    //上一次数据连接状态 true：成功 false：失败
    lastReqState: boolean = true;
    //是否为断开后重新连接
    reConnect: boolean = false;

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
                            if (!this.lastReqState) {
                                this.lastReqState = true;
                                //如果上一次连接失败，则本次为断线重连
                                this.reConnect = true;
                            } else {
                                //上一次连接成功，则本次为正常连接
                                this.reConnect = false;
                            }
                        } else
                            console.log('error')
                    }).catch((e) => {
                        this.lastReqState = false;
                        this.update({})
                    });
                }, flashFrequency * 1000);
                break;
        }
    }

    async create(container: HTMLElement, config: AntdBarProps): Promise<this> {
        if (!this.config)
            this.config = config;
        if (!this.container)
            this.container = container;
        if (!this.instance) {
            this.instance = new Bar(container, this.config?.style! as BarOptions);
        }
        this.loadData();
        this.instance.render();
        return this;
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
        if (!this.lastReqState) {
            //如果上一次（最近一次)请求失败，则展示错误提示信息
            ComponentUtil.createAndRender(this.container!, LoadError);
        } else {
            if (this.reConnect) {
                //如果为短线重连，则重新挂载组件并渲染，渲染前先清空错误信息提示组件
                ReactDOM.unmountComponentAtNode(this.container!);
                this.instance = new Bar(this.container!, this.config?.style! as BarOptions);
                this.instance.render();
            } else {
                this.config = merge(this.config, config) as AntdBarProps;
                upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
                if (upOp.reRender) {
                    if (upOp.operateType === OperateType.DATA)
                        this.instance?.changeData(this.config!.style!.data!);
                    else
                        this.instance?.update(this.config?.style!);
                }
            }
        }
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme)
            return;
        const styleConfig = this.config?.style!;
        const {colors: {main, text, supplementary, emphasize, /*background,*/ auxiliary}} = newTheme;
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