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

import AbstractController from "../../framework/core/AbstractController";
import {ISelectOption} from "../../json-schema/ui/select/Select";

export default class AntdCommonUtil {
    public static getDataFieldOptions(controller: AbstractController) {
        const config = controller.getConfig();
        const data = config?.data?.staticData;
        const options: ISelectOption[] = [];
        if (data && data.length >= 1) {
            const dataObj = data[0];
            Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
        }
        return options;
    }
}