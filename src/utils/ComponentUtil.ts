import {ClassType, createElement} from "react";
import {createRoot} from "react-dom/client";

class ComponentUtil {

    public static async createAndRender<T, P = any>(container: HTMLElement, Template: ClassType<P, any, any>, props?: any): Promise<T | null> {
        if (!container)
            throw new Error("create react node failed, container is null");
        return new Promise<T | null>((resolve) => {
            try {
                createRoot(container).render(createElement(Template, {
                    ref: (instance: T) => resolve(instance),
                    ...props
                }))
            } catch (e: unknown) {
                console.error('create react node failed ', e)
                resolve(null);
            }
        });
    }
}

export default ComponentUtil;