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

import {Modal} from "antd";
import {useEffect} from "react";
import {HookAPI} from "antd/es/modal/useModal";

class GModal {
    public modalApi: HookAPI | null = null;

    public setModalApi(modalApi: HookAPI | null) {
        this.modalApi = modalApi;
    }

}

const globalModal = new GModal();
export {globalModal};


export default function GlobalModal() {
    const [modalApi, contextHolder] = Modal.useModal();

    useEffect(() => {
        globalModal.setModalApi(modalApi);
        return () => {
            globalModal.setModalApi(null);
        }
    }, []);

    return (
        <>
            {contextHolder}
        </>
    )
}