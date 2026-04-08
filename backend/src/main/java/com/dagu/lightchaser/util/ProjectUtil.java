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

package com.dagu.lightchaser.util;

import com.dagu.lightchaser.model.dto.ProjectDependencyItemDTO;

import java.util.List;

/**
 * Map工具类
 */
public class ProjectUtil {
    /**
     * 用于在导入项目时，根据文件hash值获取对应的文件名称
     * 根据传入value模糊匹配map中的value，获取第一个匹配的value对应的key
     *
     * @param depItemList 依赖项List
     * @param value       键
     * @return 键
     */
    public static String getDepFileName(List<ProjectDependencyItemDTO> depItemList, String value) {
        if (depItemList == null || depItemList.isEmpty() || value == null)
            return null;
        for (ProjectDependencyItemDTO depItem : depItemList) {
            if (depItem.getValue().contains(value))
                return depItem.getName();
        }
        return null;
    }


}
