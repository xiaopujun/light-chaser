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

export interface IImageData {
    /**
     * 图片id，在线项目为数据库中的id值，本地项目为图片的hash值
     */
    id?: string;
    /**
     * 图片文件的hash码，用于判断图片是否重复，节省内存和磁盘空间
     */
    hash?: string;
    /**
     * 图片名称，默认取文件名
     */
    name?: string;
    /**
     * 图片文件源数据，用于本地项目中做图片与可访问资源链接的转换
     */
    blob?: Blob;
    /**
     * 图片url地址，在线项目取图片的可访问资源链接。本地项目中通过blob和URL.createObjectURL(blob)生成
     */
    url: string;
}

export interface BaseImageComponentStyle {
    type?: 'online' | 'local';
    onLineUrl?: string;
    localUrl?: string;
    hash?: string;
    opacity?: number;
}

class BaseImageComponent extends Component<BaseImageComponentStyle, BaseImageComponentStyle> {

    constructor(props: BaseImageComponentStyle) {
        super(props);
        this.state = {...props}
    }

    eventHandlerMap: Record<string, Function> = {};

    onClick = () => {
        if ('click' in this.eventHandlerMap)
            this.eventHandlerMap['click']();
    }

    render() {
        const {type, onLineUrl, localUrl, opacity} = this.state;
        const src = type === 'online' ? onLineUrl : localUrl;
        return (
            <div style={{width: '100%', height: '100%'}} onClick={this.onClick}>
                {!src ? <div style={{
                        color: '#9a9a9a',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div>请配置图片连接或上传图片</div>
                    </div> :
                    <img alt={'图片组件'} style={{opacity}} width={'100%'} height={'100%'} src={src}/>}
            </div>
        );
    }
}

export default BaseImageComponent;