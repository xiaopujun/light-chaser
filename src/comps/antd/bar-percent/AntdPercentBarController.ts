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

import AntdCommonBarController from "../../antd-common/bar/AntdCommonBarController.ts";

export default class AntdPercentBarController extends AntdCommonBarController {

    changeData(data: any) {
        super.changeData(data);
        this.instance?.render();
    }
}