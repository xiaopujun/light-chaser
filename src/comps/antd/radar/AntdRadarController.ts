import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRadarOptions} from "../../antd-common/types";
import {Radar} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRadarProps extends ComponentBaseProps {
    style?: WritableRadarOptions;
}

export default class AntdRadarController extends AntdBaseDesignerController<Radar, AntdRadarProps> {

    async create(container: HTMLElement, config: AntdRadarProps): Promise<void> {
        super.commonCreate(container, Radar, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRadarProps | null {
        return this.config;
    }

    changeData(data: any) {
        this.config!.data!.staticData = data;
        this.config!.style!.data = data;
        this.instance?.changeData(data);
    }


    update(config: AntdRadarProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Radar, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}