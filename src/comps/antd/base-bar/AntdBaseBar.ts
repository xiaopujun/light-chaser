import AbstractComponent, {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {Bar, BarOptions} from "@antv/g2plot";
import {merge} from "../../../utils/ObjectUtil";
import {WritableBarOptions} from "./AntdBaseBarDefinition";
import {DataConfigType} from "../../../designer/DesignerType";
import {sendHttpRequest} from "../../../utils/HttpUtil";

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

export default class AntdBaseBar extends AbstractComponent<Bar, AntdBarProps> {

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

}