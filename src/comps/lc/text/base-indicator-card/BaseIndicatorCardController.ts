import {DesignerMode} from "../../../../designer/DesignerType";
import {UpdateOptions} from "../../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../../utils/ComponentUtil";
import BaseIndicatorCardComponent, {BaseIndicatorCardComponentProps, BaseIndicatorCardComponentRef} from "./BaseIndicatorCardComponent";
import ObjectUtil from "../../../../utils/ObjectUtil";
import BPExecutor from "../../../../designer/blueprint/core/BPExecutor";
import URLUtil from "../../../../utils/URLUtil";

export class BaseIndicatorCardController extends AbstractDesignerController<BaseIndicatorCardComponentRef, BaseIndicatorCardComponentProps> {

    async create(container: HTMLElement, config: BaseIndicatorCardComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseIndicatorCardComponentRef>(container, BaseIndicatorCardComponent, config);
        const {mode} = URLUtil.parseUrlParams();
        //基础文本在编辑模式下放开事件，以实现双击直接进入编辑状态
        if (mode === DesignerMode.EDIT)
            this.container!.style!.pointerEvents = "auto";
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseIndicatorCardComponentProps | null {
        return this.config;
    }

    update(config: BaseIndicatorCardComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender){
            this.instance?.updateConfig(this.config!);
        }
    }


    changeData(data: any) {
        super.changeData(data);
        this.update(data);
    }

    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id!;
            this.instance.setEventHandler({
                click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config)
            });
        }
    }


}
