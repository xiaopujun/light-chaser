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

import './SourceList.less';
import {lazy, Suspense} from "react";
import Loading from "../../../json-schema/ui/loading/Loading.tsx";

const ImageSource = lazy(() => import('./image-source/ImageSource'));

export default function SourceList() {
    return <div className={'source-library'}>
        <div className={'source-categorize'}>
            <div className={'categorize-item'}>图片</div>
        </div>
        <div className={'source-library-content'}>
            <Suspense fallback={<Loading/>}>
                <ImageSource/>
            </Suspense>
        </div>
    </div>;
}
