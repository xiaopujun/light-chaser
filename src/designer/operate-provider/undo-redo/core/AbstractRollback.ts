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

import {IHistoryRecord} from "../OperateType";

/**
 * 撤销回滚抽象接口定义
 */
export default abstract class AbstractRollback {
    /**
     * 撤销
     */
    public abstract undo(record: IHistoryRecord): void;

    /**
     * 重做
     */
    public abstract redo(record: IHistoryRecord): void;
}