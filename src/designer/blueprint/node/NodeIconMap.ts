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

import {ConnectionPoint, Fork, Ring} from "@icon-park/react";

const nodeIconMap = new Map();

nodeIconMap.set('CodeSandboxOutlined', ConnectionPoint);
nodeIconMap.set('BranchesOutlined', Fork);
nodeIconMap.set('FunctionOutlined', Ring);

export default nodeIconMap;