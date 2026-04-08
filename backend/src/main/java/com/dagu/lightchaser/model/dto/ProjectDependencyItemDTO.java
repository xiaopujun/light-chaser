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

package com.dagu.lightchaser.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author yinzhenpu
 * @date 2025/6/18 07:49:15
 * @description 项目依赖项（用于项目导出时各类资源项目的引用）
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDependencyItemDTO implements Serializable {
    /**
     * 依赖名称
     */
    String name;
    /**
     * 依赖值
     */
    String value;
}
