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

import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode} from "../DesignerType";

const editorDesignerLoader = import('./EditorDesignerLoader').then(module => module.default);
const viewDesignerLoader = import('./ViewDesignerLoader').then(module => module.default);

const loaderMap = new Map<DesignerMode, Promise<AbstractDesignerLoader>>();
loaderMap.set(DesignerMode.EDIT, editorDesignerLoader);
loaderMap.set(DesignerMode.VIEW, viewDesignerLoader);

export default class DesignerLoaderFactory {
    /**
     * 获取设计器加载器，根据不同模式获取不同的设计器加载器
     * @param mode 当前模式 --> DesignerMode 存在编辑模式、预览模式两种。默认加载编辑模式
     * @returns 设计器加载器实例对象
     */
    public static async getLoader(mode?: DesignerMode): Promise<AbstractDesignerLoader> {
        if (mode && loaderMap.has(mode))
            return loaderMap.get(mode)!;
        else
            return editorDesignerLoader;
    }
}