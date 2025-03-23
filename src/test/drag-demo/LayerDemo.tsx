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

import React from "react";
import {SelectableDemo} from "./SelectableDemo";
import {MovableDemo} from "./MovableDemo";
import './LayerDemo.less';

export const LayerDemo: React.FC = () => {

    return (
        <div style={{width: '100%', height: '100%', background: 'black', position: 'relative'}}
             className={'selectable-demo-container'}>
            <SelectableDemo>
                <MovableDemo>
                    <div style={{
                        display: 'block',
                        position: 'absolute',
                        width: 10,
                        height: 10,
                        background: '#8b2c24',
                        transform: 'translate(0, 0)'
                    }} className={'selectable-demo-item container-demo'}>
                        <div style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(500px, 250px)'
                        }} className={'selectable-demo-item'}/>
                        <div style={{
                            width: 100,
                            height: 100,
                            position: 'absolute',
                            background: '#6d6d6d',
                            transform: 'translate(200px, 300px)'
                        }} className={'selectable-demo-item'}>
                            sfsdf塑料袋放进看
                        </div>
                    </div>
                </MovableDemo>
            </SelectableDemo>
        </div>
    );
};