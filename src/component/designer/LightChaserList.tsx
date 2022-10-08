import React, {Component} from 'react';
import './style/LightChaserList.less';

class LightChaserList extends Component {
    render() {
        return (
            <div className={'light-chaser-list'}>
                <div className={'lc-list-head'}>
                    <div className={'lc-list-head-title'}>LIGHT CHASER 数据大屏设计器</div>
                </div>
                <div className={'lc-list-statistics'}>
                    <div>数据统计：</div>
                    <div className={'lc-statistics-item lc-statistics-current-time'}>
                        <p>2022-10-08 22:34:15</p>
                        <p>当前时间</p>
                    </div>
                    <div className={'lc-statistics-item'}>
                        <p>12</p>
                        <p>大屏数</p>
                    </div>
                </div>
                <div className={'lc-list-content'}>内容</div>
            </div>
        );
    }
}

export default LightChaserList;