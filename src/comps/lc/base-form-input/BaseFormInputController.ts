import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseFormInputComponent, {BaseFormInputComponentProps, BaseFormInputComponentRef} from "./BaseFormInputComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class BaseFormInputController extends AbstractDesignerController<BaseFormInputComponentRef, BaseFormInputComponentProps> {

    async create(container: HTMLElement, config: BaseFormInputComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseFormInputComponentRef>(container, BaseFormInputComponent, config);
        this.registerEvent();
        window.onGlobalDataChangeObservable.add((eventData, eventState)=>{
            const r = ObjectUtil.merge(this.config,{data:{...this.config?.data,...eventData}});
            console.log("BaseFormInputController", eventData, r);
            // this.config = ObjectUtil.merge(this.config,{data:{...this.config?.data,...eventData}});
            this.instance?.updateConfig(r);

        }, 1,"haha");

    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseFormInputComponentProps | null {
        return this.config;
    }


    changeData(data: string[]) {
        this.config!.data!.staticData = data;
        this.instance?.updateConfig(this.config!);
    }

    update(config: BaseFormInputComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender){
            this.instance?.updateConfig(this.config!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }


    registerEvent() {
        const nodeId = this.config?.base?.id!;
        this.instance?.setEventHandler({
            click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config),
            onChange: (value: string) => BPExecutor.triggerComponentEvent(nodeId!, "onChange", value),
            onPressEnter: (value: string) => BPExecutor.triggerComponentEvent(nodeId!, "onPressEnter", value),
            update:(newConfig)=>{
                this.update(newConfig);
            }
        });
    }
}
