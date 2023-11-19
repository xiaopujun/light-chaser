import {Component} from 'react';
import './HotKeyDes.less';

class HotKeyDes extends Component {

    hotkeys = [
        {name: '保存项目', key: 'ctrl + s'},
        {name: '复制组件', key: 'ctrl + v'},
        {name: '锁定组件', key: 'ctrl + l'},
        {name: '解锁组件', key: 'ctrl + shift + l'},
        {name: '隐藏组件', key: 'ctrl + h'},
        {name: '开/关辅助边框', key: 'ctrl + k'},
        {name: '元素置顶', key: 'ctrl + up-arrow(方向上键)'},
        {name: '元素置底', key: 'ctrl + down-arrow(方向下键)'},
        {name: '删除组件', key: 'delete'},
        {name: '缩放画布', key: 'alt + wheel(鼠标滑轮)'},
        {name: '拖拽画布', key: '长按鼠标右键'},
        {name: '组件上移', key: '方向上键'},
        {name: '组件下移', key: '方向下键'},
        {name: '组件左移', key: '方向左键'},
        {name: '组件右移', key: '方向右键'},
        {name: '组件上扩大', key: 'ctrl + shift + 方向上键'},
        {name: '组件下扩大', key: 'ctrl + shift + 方向下键'},
        {name: '组件左扩大', key: 'ctrl + shift + 方向左键'},
        {name: '组件右扩大', key: 'ctrl + shift + 方向右键'},
        {name: '组件上缩小', key: 'ctrl + alt + 方向上键'},
        {name: '组件下缩小', key: 'ctrl + alt + 方向下键'},
        {name: '组件左缩小', key: 'ctrl + alt + 方向左键'},
        {name: '组件右缩小', key: 'ctrl + alt + 方向右键'},
        {name: '撤销', key: 'ctrl + z'},
        {name: '重做', key: 'ctrl + shift + z'},
        {name: '打开/关闭项目设置', key: 'ctrl + 1'},
        {name: '打开/关闭画布设置', key: 'ctrl + 2'},
        {name: '打开/关闭全局主题设置', key: 'ctrl + 3'},
        {name: '打开/关闭图层', key: 'ctrl + 4'},
        {name: '打开/关闭快捷键说明', key: 'ctrl + 5'},
        {name: '编组', key: 'ctrl + g'},
        {name: '解除编组', key: 'ctrl + shift + g'},
    ]

    render() {
        return (
            <div className={'lc-hotkey-des'} style={{color: 'white'}}>
                {this.hotkeys.map((item, index) => {
                    return (
                        <div className={'hotkey-des-item'} key={index}>
                            <div className={'hotkey-content'}><code>{item.key}</code></div>
                            <div className={'hotkey-des'}>{item.name}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default HotKeyDes;