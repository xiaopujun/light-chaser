import {ClazzTemplate} from "../DesignerType.ts";
import {AbstractBPNodeController} from "../blueprint/node/core/AbstractBPNodeController.ts";

class BluePrintLoader {
    //蓝图Controller类
    public bpControllerMap: Record<string, ClazzTemplate<AbstractBPNodeController>> = {};

    public load(): void {
        this.scanBPController();
    }

    private scanBPController(): void {
        const glob = import.meta.glob('../blueprint/node/core/impl/**/*.ts', {eager: true}) as Record<string, any>;
        for (const key of Object.keys(glob)) {
            const Clazz = glob[key]?.default as ClazzTemplate<AbstractBPNodeController>;
            if (Clazz && AbstractBPNodeController.isPrototypeOf(Clazz)) {
                this.bpControllerMap[Clazz.name.replaceAll("Controller", "")] = Clazz;
            }
        }
    }
}

const bluePrintLoader = new BluePrintLoader();
export default bluePrintLoader;