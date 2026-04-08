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

import AbstractConvert from "../../../framework/convert/AbstractConvert";
import {BaseImageComponentProps} from "./BaseImageController";
import imageSourceCache from "../../../framework/cache/ImageSourceCache";
import {IImageData} from "./BaseImageComponent";

/**
 * 图片转换器，用于将图片资源地址转换为唯一id，图片资源使用blob存入indexDB
 */
export default class BaseImageConvert extends AbstractConvert<BaseImageComponentProps> {

    getKey(): string {
        return "BaseImage";
    }

    convert(data: BaseImageComponentProps): void {
        // 将本地上传的图片数据以blob形式存入indexDB，并替换localUrl属性为blobId
        // const {hashCode, localUrl} = data.style!;
        // if (this.savedImgHash.includes(hashCode!)) return;
        // if (hashCode && localUrl) {
        //     ImgUtil.saveImgToLocal(localUrl, hashCode).then(() => this.savedImgHash.push(hashCode));
        // }
    }

    async convertBack(data: BaseImageComponentProps): Promise<void> {
        const {hash, type} = data.style!;
        if (type === 'local') {
            const imageInfo: IImageData = await imageSourceCache.getCache(hash!);
            if (!imageInfo) return;
            data.style!.localUrl = imageInfo.url;
        }
    }

}