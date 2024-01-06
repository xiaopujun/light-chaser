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
}

class BaseImageComponent extends Component<BaseImageComponentStyle, BaseImageComponentStyle> {

    constructor(props: BaseImageComponentStyle) {
        super(props);
        this.state = {...props}
    }

    render() {
        const {type, onLineUrl, localUrl} = this.state;
        const src = type === 'online' ? onLineUrl : localUrl;
        return (
            <div style={{width: '100%', height: '100%'}}>
                {!src ? <div style={{
                        color: '#9a9a9a',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div>请配置图片连接或上传图片</div>
                    </div> :
                    <img alt={'图片组件'} width={'100%'} height={'100%'} src={src}/>}
            </div>
        );
    }
}

export default BaseImageComponent;