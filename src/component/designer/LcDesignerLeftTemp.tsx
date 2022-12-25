import React, {Component} from 'react';
import './style/LcDesignerLeftTemp.less';
import {
    AppstoreFilled, ClockCircleFilled, CloseOutlined,
    FileSearchOutlined,
    FormatPainterFilled,
    FundFilled,
    GoldFilled,
    MenuOutlined, ProfileFilled,
    UsbFilled
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

class LcDesignerLeftTemp extends Component {
    render() {
        return (
            <>
                <div className={'lc-charts-sort'}>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><AppstoreFilled/></div>
                        <span className={'sort-item-content'}>全部</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><GoldFilled/></div>
                        <span className={'sort-item-content'}>基础</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><FundFilled/></div>
                        <span className={'sort-item-content'}>图表</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><FormatPainterFilled/></div>
                        <span className={'sort-item-content'}>装饰</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><UsbFilled/></div>
                        <span className={'sort-item-content'}>其他</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><ProfileFilled/></div>
                        <span className={'sort-item-content'}>图层</span>
                    </div>
                    <div className={'sort-item'}>
                        <div className={'sort-item-icon'}><ClockCircleFilled/></div>
                        <span className={'sort-item-content'}>记录</span>
                    </div>
                </div>
                <div className={'lc-charts-list'}>
                    <div className={'menu-title'}>
                        <div className={'menu-title-content'}>组件列表</div>
                        <div><span><CloseOutlined/></span></div>
                    </div>
                    <div className={'charts-search'}>
                        <Search placeholder="搜索组件" style={{width: '100%'}}/>
                    </div>
                    <div className={'charts-list-items'}>
                        <div className={'charts-list-item'}>图表1</div>
                        <div className={'charts-list-item'}>图表2</div>
                        <div className={'charts-list-item'}>图表3</div>
                        <div className={'charts-list-item'}>图表3</div>
                        <div className={'charts-list-item'}>图表3</div>
                        <div className={'charts-list-item'}>图表3</div>
                    </div>
                </div>

                <div className={'lc-charts-layer'}>
                    <div className={'menu-title'}>
                        <div className={'menu-title-content'}>图层</div>
                        <div><span><CloseOutlined/></span></div>
                    </div>
                    <div className={'charts-layer-items'}>
                        <div className={'charts-layer-item'}>图层1</div>
                        <div className={'charts-layer-item'}>图层2</div>
                        <div className={'charts-layer-item'}>图层3</div>
                        <div className={'charts-layer-item'}>图层3</div>
                        <div className={'charts-layer-item'}>图层3</div>
                        <div className={'charts-layer-item'}>图层3</div>
                    </div>
                </div>
            </>
        );
    }
}

export default LcDesignerLeftTemp;