import './HotKeyDes.less';
import Dialog from "../../../json-schema/ui/dialog/Dialog";

const hotkeys = [
    {name: '保存项目', windows: 'ctrl + s', mac: 'ctrl + s'},
    {name: '复制组件', windows: 'ctrl + v', mac: 'ctrl + v'},
    {name: '锁定组件', windows: 'ctrl + l', mac: 'ctrl + l'},
    {name: '解锁组件', windows: 'ctrl + shift + l', mac: 'ctrl + shift + l'},
    {name: '隐藏组件', windows: 'ctrl + h', mac: 'ctrl + h'},
    {name: '开/关辅助边框', windows: 'ctrl + k', mac: 'ctrl + k'},
    {name: '图层置顶', windows: 'ctrl + up-arrow(方向上键)', mac: 'ctrl + up-arrow(方向上键)'},
    {name: '图层置底', windows: 'ctrl + down-arrow(方向下键)', mac: 'ctrl + down-arrow(方向下键)'},
    {name: '图层上移', windows: 'alt + up-arrow(方向上键)', mac: 'alt + up-arrow(方向上键)'},
    {name: '图层下移', windows: 'alt + down-arrow(方向下键)', mac: 'alt + down-arrow(方向下键)'},
    {name: '删除组件', windows: 'delete', mac: 'delete'},
    {name: '缩放画布', windows: 'alt + wheel(鼠标滑轮)', mac: 'alt + wheel(鼠标滑轮)'},
    {name: '拖拽画布', windows: '长按鼠标右键', mac: '长按鼠标右键'},
    {name: '组件上移', windows: '方向上键', mac: '方向上键'},
    {name: '组件下移', windows: '方向下键', mac: '方向下键'},
    {name: '组件左移', windows: '方向左键', mac: '方向左键'},
    {name: '组件右移', windows: '方向右键', mac: '方向右键'},
    {name: '组件上扩大', windows: 'ctrl + shift + 方向上键', mac: 'ctrl + shift + 方向上键'},
    {name: '组件下扩大', windows: 'ctrl + shift + 方向下键', mac: 'ctrl + shift + 方向下键'},
    {name: '组件左扩大', windows: 'ctrl + shift + 方向左键', mac: 'ctrl + shift + 方向左键'},
    {name: '组件右扩大', windows: 'ctrl + shift + 方向右键', mac: 'ctrl + shift + 方向右键'},
    {name: '组件上缩小', windows: 'ctrl + alt + 方向上键', mac: 'ctrl + alt + 方向上键'},
    {name: '组件下缩小', windows: 'ctrl + alt + 方向下键', mac: 'ctrl + alt + 方向下键'},
    {name: '组件左缩小', windows: 'ctrl + alt + 方向左键', mac: 'ctrl + alt + 方向左键'},
    {name: '组件右缩小', windows: 'ctrl + alt + 方向右键', mac: 'ctrl + alt + 方向右键'},
    {name: '撤销', windows: 'ctrl + z', mac: 'ctrl + z'},
    {name: '重做', windows: 'ctrl + shift + z', mac: 'ctrl + shift + z'},
    {name: '打开/关闭项目设置', windows: 'ctrl + 1', mac: 'ctrl + 1'},
    {name: '打开/关闭画布设置', windows: 'ctrl + 2', mac: 'ctrl + 2'},
    {name: '打开/关闭全局主题设置', windows: 'ctrl + 3', mac: 'ctrl + 3'},
    {name: '打开/关闭快捷键说明', windows: 'ctrl + 4', mac: 'ctrl + 4'},
    {name: '编组', windows: 'ctrl + g', mac: 'ctrl + g'},
    {name: '解除编组', windows: 'ctrl + shift + g', mac: 'ctrl + shift + g'},
    {name: '从分组中移除', windows: 'alt + shift + g', mac: 'alt + shift + g'},
]

export interface HotKeyDesProps {
    onClose: () => void;
}

export const HotKeyDes = (prop: HotKeyDesProps) => {
    const {onClose} = prop;
    return (
        <Dialog title={'快捷键说明'} visible={true} width={800} onClose={onClose}>
            <div className={'lc-hotkey-des'} style={{color: 'white'}}>
                <table className={'hotkey-des-table'}>
                    <thead>
                    <tr>
                        <th style={{width: '10%'}}>编号</th>
                        <th style={{textAlign: 'left'}}>功能</th>
                        <th style={{textAlign: 'left'}}>Windows</th>
                        <th style={{textAlign: 'left'}}>Mac</th>
                    </tr>
                    </thead>
                    <tbody>

                    {hotkeys.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td style={{textAlign: 'left'}}>{item.name}</td>
                                <td style={{textAlign: 'left'}}>{item.windows}</td>
                                <td style={{textAlign: 'left'}}>{item.mac}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Dialog>
    );
}
