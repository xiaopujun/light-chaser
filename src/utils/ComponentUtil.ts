import ReactDOM from "react-dom";
import React, {ClassType} from "react";

class ComponentUtil {

    public static async createAndRender<T>(container: HTMLElement, clazzTemp: ClassType<T, any, any>, props?: any): Promise<T | null> {
        if (!container)
            throw new Error("create react node failed, container is null");
        return await new Promise<T | null>((resolve) => {
            try {
                ReactDOM.render(
                    React.createElement(clazzTemp, {
                        ref: (instance: T) => resolve(instance),
                        ...props
                    }),
                    container
                );
            } catch (e: any) {
                console.error('create react node failed ', e)
                resolve(null);
            }
        });
    }
}

export default ComponentUtil;