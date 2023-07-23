import AbstractComponent from "../framework/core/AbstractComponent";
import A from "./A";
import ComponentUtil from "../utils/ComponentUtil";

class DemoA extends AbstractComponent<any> {
    public async create(container: any, props?: any): Promise<AbstractComponent<any> | null> {
        if (this.instance)
            return this.instance;
        this.instance = await ComponentUtil.createAndRender(container, A, props);
        return this.instance;
    }

    public changeData(data: any): void {
        throw new Error("Method not implemented.");
    }

    public update(data: any): void {
        if (!this.instance)
            return;
        this.instance.setState({count: data});
    }

    public destroy(): void {
        throw new Error("Method not implemented.");
    }

    public getData(): void {
        throw new Error("Method not implemented.");
    }
}

export default DemoA;
