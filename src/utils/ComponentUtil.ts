/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

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