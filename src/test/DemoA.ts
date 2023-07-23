import React from "react";
import ReactDOM from "react-dom";
import AbstractComponent from "../framework/core/AbstractComponent";
import A from "./A";

class DemoA extends AbstractComponent<any> {

    public async create(container: any, props: any): Promise<AbstractComponent<any> | null> {
        if (this.instance) return this.instance;
        return await new Promise((resolve) => {
            try {
                ReactDOM.render(
                    React.createElement(A, {
                        ref: (instance: any) => resolve(instance),
                        ...props
                    }),
                    container
                );
            } catch (e: any) {
                resolve(null);
            }
        });
    }

    public changeData(data: any): void {
        throw new Error("Method not implemented.");
    }

    public update(data: any): void {
        throw new Error("Method not implemented.");
    }

    public destory(): void {
        throw new Error("Method not implemented.");
    }

    public getData(): void {
        throw new Error("Method not implemented.");
    }
}

export default DemoA;
