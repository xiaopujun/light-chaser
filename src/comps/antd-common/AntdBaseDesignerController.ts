import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import {UpdateOptions} from "../../framework/core/AbstractController";
import {ComponentBaseProps} from "../common-component/CommonTypes.ts";
import {Options, Plot} from "@antv/g2plot";
import ObjectUtil from "../../utils/ObjectUtil";
import BPExecutor from "../../designer/blueprint/core/BPExecutor";

export abstract class AntdBaseDesignerController<I extends Plot<any> = Plot<Options>,
    C extends ComponentBaseProps = ComponentBaseProps> extends AbstractDesignerController<I, C> {

    protected interval: NodeJS.Timeout | null = null;
    //上一次数据连接状态 true：成功 false：失败
    protected lastReqState: boolean = true;
    //是否为断开后重新连接
    protected reConnect: boolean = false;

    changeData(data: any) {
        this.instance?.changeData(data);
        //g2plot系列图表，style.data是其内部存储图表数据的地方，因此每次更新数据，该属性可以主动更新
        if (this.config?.style?.data)
            this.config!.style!.data = data;
        //data.staticData是LC表中组件属性存储静态数据的地方，也作为其他数据源存储结果的中转站，更新数据时应该同时更新staticData属性
        this.config!['data']!['staticData'] = data;
    }

    registerEvent(): void {
        const nodeId = this.config?.base?.id ?? "";
        this.instance?.on('plot:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "globalClick", this.config)
        });
        this.instance?.on('element:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementClick", this.config)
        });
        // 图例添加点击事件
        this.instance?.on('legend-item:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "legendClick", this.config)
        });
        // 图例名称添加点击事件
        this.instance?.on('legend-item-name:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "elementNameClick", this.config)
        });
        // axis-label 添加点击事件
        this.instance?.on('axis-label:click', () => {
            BPExecutor.triggerComponentEvent(nodeId!, "axisLabelClick", this.config)
        });
    }

    public commonCreate(container: HTMLElement, Clazz: new (...args: any[]) => I, config: C): void {
        this.config = config;
        this.container = container;
        this.instance = new Clazz(container, this.config?.style ?? {} as C);
        this.instance?.render();
        this.registerEvent();
    }

    public commonUpdate(config: C, Clazz: new (...args: any[]) => I, upOp?: UpdateOptions,): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.update(this.config?.style ?? {});
    }
}