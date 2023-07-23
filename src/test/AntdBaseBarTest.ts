import {Bar} from "@antv/g2plot";
import AbstractComponent from "../framework/core/AbstractComponent";
import {MovableItemType} from "../lib/lc-movable/types";

export default class AntdBaseBarTest extends AbstractComponent<any, any> {
    public getConfig() {
        throw new Error("Method not implemented.");
    }


    public updateConfig(config: any): void {
        throw new Error("Method not implemented.");
    }

    public updateLayout(layout: any): void {
        throw new Error("Method not implemented.");
    }

    public async create(container: HTMLElement, props?: any): Promise<void> {
        this.instance = new Bar(container, {
            data: [
                {year: "1951 年", value: 38},
                {year: "1952 年", value: 52},
                {year: "1956 年", value: 61},
                {year: "1957 年", value: 145},
                {year: "1958 年", value: 48},
            ],
            xField: "value",
            yField: "year",
            seriesField: "year",
            legend: {
                position: "top-left",
            },
        });
        this.instance.render();
        return this.instance;
    }


    public changeData(data: any): void {
        throw new Error("Method not implemented.");
    }

    public update(data: any): void {
        throw new Error("Method not implemented.");
    }

    public destroy(): void {
        throw new Error("Method not implemented.");
    }

    public getData(): void {
        throw new Error("Method not implemented.");
    }

    getLayout(): MovableItemType | null {
        return null;
    }
}
