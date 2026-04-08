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

import {useNavigate} from "react-router-dom";
import {Button, Result} from "antd";

export default function Error() {
    const navigate = useNavigate();
    return (
        <Result
            status="500"
            subTitle="服务器错误，请联系管理员"
            extra={<Button type="primary" onClick={() => navigate('/home/server')}>返回首页</Button>}
        />
    );
}