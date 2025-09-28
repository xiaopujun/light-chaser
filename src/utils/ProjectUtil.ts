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


import designerManager from "../designer/manager/DesignerManager.ts";

export default class ProjectUtil {
    public static calculateProjectDependency() {
        const projectData = designerManager!.getData();
        const fonts = new Set(), images = new Set();
        const projectJson = JSON.stringify(projectData);

        //1. 计算当前项目所依赖的外部资源
        //1.1 计算项目使用的字体
        const regex = /"fontFamily"\s*:\s*"([^"]+)"/g;
        let match;
        while ((match = regex.exec(projectJson)) !== null) {
            fonts.add(match[1]);
        }

        Object.values(projectData?.layerManager?.elemConfigs ?? {}).forEach((item) => {
            //1.2 计算项目使用的图片
            if (item?.base?.type === 'BaseImage') {
                if (item.style?.localUrl) {
                    //统一目录分隔符
                    const url = item.style.localUrl.replace(/\\+/g, '/');
                    images.add(url?.substring(url.lastIndexOf('/') + 1, url.length));
                }
            }
        })

        //2. 将项目数据及外部资源数据一起发送至后端并生成下载链接
        return {
            id: window.LC_ENV.projectId,
            name: document.title,
            fonts: Array.from(fonts),
            images: Array.from(images),
            projectJson: projectJson,
        };
    }

}