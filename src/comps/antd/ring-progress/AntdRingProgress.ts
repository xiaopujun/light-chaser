import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRingProgressOptions} from "../../antd-common/types";
import {RingProgress, RingProgressOptions} from "@antv/g2plot";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";
import {getModeByUrl, Mode} from "../../../utils/URLUtil";
import {sendHttpRequest} from "../../../utils/HttpUtil";
import ComponentUtil from "../../../utils/ComponentUtil";
import {LoadError} from "../../../lib/lc-loaderr/LoadError";
import ReactDOM from "react-dom";
import {merge} from "../../../utils/ObjectUtil";

export interface AntdRingProgressProps extends ComponentBaseProps {
    style?: WritableRingProgressOptions;
}

export default class AntdRingProgress extends AntdBaseDesignerComponent<RingProgress, AntdRingProgressProps> {

    public commonLoadData(ins: AntdRingProgress): void {
        const {data} = ins.config!;
        const {dataSource} = data!;
        let mode = getModeByUrl();
        if (mode !== Mode.VIEW) {
            ins.config!.style!.percent = ins.config?.data?.staticData?.data;
            return;
        }
        switch (dataSource) {
            case "static":
                ins.config!.style!.percent = ins.config?.data?.staticData?.data;
                break;
            case "api":
                const {url, method, params, header, flashFrequency = 5} = data?.apiData!;
                this.interval = setInterval(() => {
                    sendHttpRequest(url!, method!, params!, header!).then((data: any) => {
                        if (data) {
                            this.update({style: {data}} as any, {reRender: true, operateType: OperateType.DATA});
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
                    }).catch(() => {
                        this.lastReqState = false;
                        this.update({} as any);
                    });
                }, flashFrequency * 1000);
                break;
        }
    }


    async create(container: HTMLElement, config: AntdRingProgressProps): Promise<this> {
        return super.commonCreate(container, RingProgress, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRingProgressProps | null {
        return this.config;
    }

    update(config: AntdRingProgressProps, upOp?: UpdateOptions): void {

        console.log('update ring progress', config)
        super.commonUpdate(config, RingProgress, upOp);
        if (!this.lastReqState) {
            //如果上一次（最近一次)请求失败，则展示错误提示信息
            ComponentUtil.createAndRender(this.container!, LoadError);
        } else {
            if (this.reConnect) {
                //如果为短线重连，则重新挂载组件并渲染，渲染前先清空错误信息提示组件
                ReactDOM.unmountComponentAtNode(this.container!);
                this.instance = new RingProgress(this.container!, this.config!.style! as RingProgressOptions);
                this.instance.render();
            } else {
                this.config = merge(this.config, config);
                upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
                if (upOp.reRender) {
                    if (upOp.operateType === OperateType.DATA)
                        this.instance?.changeData(this.config!.style!.percent!);
                    else
                        this.instance?.update(this.config?.style!);
                }
            }
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}