import {Component} from 'react';

export interface BaseImageComponentStyle {
    type?: 'online' | 'local';
    onLineUrl?: string;
    localUrl?: string;
    hashCode?: string;
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