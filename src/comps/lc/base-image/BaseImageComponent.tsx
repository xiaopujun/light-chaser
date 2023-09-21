import React, {Component} from 'react';

export interface BaseImageComponentStyle {
    source?: 'link' | 'local';
    src?: string;
}

class BaseImageComponent extends Component<BaseImageComponentStyle> {

    state = {
        src: ''
    }

    constructor(props: BaseImageComponentStyle) {
        super(props);
        this.state = {
            src: props.src || ''
        }
    }

    render() {
        const {src} = this.state;
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
                    <img width={'100%'} height={'100%'} src={src} alt={'image'}/>}
            </div>
        );
    }
}

export default BaseImageComponent;