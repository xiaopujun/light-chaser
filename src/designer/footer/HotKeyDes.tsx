import React, {Component} from 'react';
import './HotKeyDes.less';

class HotKeyDes extends Component {
    render() {
        return (
            <div className={'lc-hotkey-des'} style={{color: 'white'}}>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Ctrl + S</code></div>
                    <div className={'hotkey-des'}>保存项目</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Ctrl + V</code></div>
                    <div className={'hotkey-des'}>复制元素</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Ctrl + L</code></div>
                    <div className={'hotkey-des'}>锁定元素</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Ctrl + up-arrow(方向上键)</code></div>
                    <div className={'hotkey-des'}>元素置顶</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Ctrl + down-arrow(方向下键)</code></div>
                    <div className={'hotkey-des'}>元素置底</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Delete</code></div>
                    <div className={'hotkey-des'}>删除元素</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>Alt + wheel(鼠标滑轮)</code></div>
                    <div className={'hotkey-des'}>缩放画布</div>
                </div>
                <div className={'hotkey-des-item'}>
                    <div className={'hotkey-content'}><code>长按鼠标右键</code></div>
                    <div className={'hotkey-des'}>拖拽画布</div>
                </div>
            </div>
        );
    }
}

export default HotKeyDes;