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

import {lazy} from "react";

const BPHeader = lazy(() => import("./header/BPHeader"));
const BPFooter = lazy(() => import("./footer/BPFooter"));
const BPLeft = lazy(() => import("./left/BPLeft"));
const BPRight = lazy(() => import("./right/BPRight"));
const BPCanvas = lazy(() => import("./BPCanvas"));
const FrameLayout = lazy(() => import("../../json-schema/ui/frame-layout/FrameLayout"));


export default function BluePrint() {
    return (
        <FrameLayout header={<BPHeader/>}
                     footer={<BPFooter/>}
                     left={<BPLeft/>}
                     right={<BPRight/>}
                     content={<BPCanvas/>}
        />
    )
}
