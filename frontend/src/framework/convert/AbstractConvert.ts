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

abstract class AbstractConvert<P = any> {
    /**
     * 获取转换器唯一标识
     */
    abstract getKey(): string;

    /**
     * 正向转换
     * @param data
     */
    abstract convert(data: P): void;

    /**
     * 反向转换
     * @param data
     */
    abstract convertBack(data: P): Promise<void>
}

export default AbstractConvert;