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

import {action, makeObservable, observable} from "mobx";

export interface Student {
    id?: string;
    name?: string;
    age?: number;
    city?: {
        code?: string;
        name?: string;
        position?: [number, number]
    }
}

class DemoStore {
    constructor() {
        makeObservable(this, {
            student: observable.struct,
            updateStudent: action,
        })
    }

    student: Student = {
        id: "1",
        name: "张三",
        age: 18,
        city: {
            code: "110000",
            name: "北京市",
            position: [116.405285, 39.904989]
        }
    }

    updateStudent = (student: Student) => {
        this.student = student
    }
}

const demoStore = new DemoStore();
export default demoStore;