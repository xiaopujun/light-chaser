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

import '../DemoMain.less';
import "@amap/amap-jsapi-types";
import {useEffect, useRef} from "react";

/**
 * canvas网格动画，探究transform多重变换的效果，以及transform-origin的作用
 * @constructor
 */
export default function Demo() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = canvasRef.current!.getContext('2d');

        const gridSize = 50;
        const width = canvasRef.current!.width;
        const height = canvasRef.current!.height;

        ctx!.beginPath();
        ctx!.strokeStyle = '#ff8a8a';
        ctx!.lineWidth = 1


        // 绘制网格
        for (let x = 0; x <= width; x += gridSize) {
            ctx!.moveTo(x, 0);
            ctx!.lineTo(x, height);
        }

        for (let y = 0; y <= height; y += gridSize) {
            ctx!.moveTo(0, y);
            ctx!.lineTo(width, y);
        }
        ctx!.stroke();

    }, []);

    return (

        <>
            <canvas className={'demo-canvas'} ref={canvasRef} width={1000} height={700}
                    style={{width: 1000, height: 700}}/>
            <div id="demo-transform" style={{height: 100, width: 100}}/>
        </>

    );
}
