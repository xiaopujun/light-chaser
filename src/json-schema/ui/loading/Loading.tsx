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

import {Component} from 'react';

interface LoadingProps {
    width?: string | number;
    height?: string | number;
}

class Loading extends Component<LoadingProps> {
    render() {
        const {width = '100%', height = '100%'} = this.props;
        const style = {
            width,
            height,
            backgroundColor: '#374f85',
            background: 'linear-gradient(to right, #182848, #1a2848)',
            color: '#1db3ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: '300'
        }
        return (
            <div style={style}>加 载 中 . . . . . .</div>
        );
    }
}

export default Loading;