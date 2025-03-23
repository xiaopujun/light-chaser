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
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";

export interface BaseIframeComponentStyle {
    src?: string;
}

export interface BaseIframeComponentProps extends ComponentBaseProps {
    style?: BaseIframeComponentStyle;
}

class BaseIframeComponent extends Component<BaseIframeComponentProps, BaseIframeComponentProps> {

    constructor(props: BaseIframeComponentProps) {
        super(props);
        this.state = {...props};
    }

    eventHandlerMap: Record<string, Function> = {};

    onLoad = () => {
        if ('load' in this.eventHandlerMap)
            this.eventHandlerMap['load']();
    }

    render() {
        const {src} = this.state.style!;
        return (
            <>
                {src === "" ? <div style={{
                    color: '#9a9a9a',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>请设置iframe地址</div>
                </div> : <div style={{height: '100%', display: 'flex'}}>
                    <iframe title={'lc标准iframe组件'} src={src} onLoad={this.onLoad}
                            style={{width: '100%', height: '100%', border: 'none'}}/>
                </div>}
            </>
        );
    }
}

export default BaseIframeComponent;