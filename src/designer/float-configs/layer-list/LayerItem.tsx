import React, {Component} from 'react';
import './LayerItem.less';
import previewOpen from './icon/preview-open.svg';
import unlockImg from './icon/unlock.svg';
import previewClose from './icon/preview-close.svg';
import lockImg from './icon/lock.svg';

export interface LayerItemProps {
    data?: {
        compId?: string;
        name?: string;
        lock?: boolean;
        hide?: boolean;
        selected?: boolean;
    }
    lockChange?: (data: any) => void;
    hideChange?: (data: any) => void;
    selectedChange?: (data: any, e: any) => void;
}

class LayerItem extends React.PureComponent<LayerItemProps> {

    toggleLock = () => {
        const {lockChange, data} = this.props;
        lockChange && lockChange({...data, lock: !data!.lock});
    }

    toggleHide = () => {
        const {hideChange, data} = this.props;
        hideChange && hideChange({...data, hide: !data!.hide});
    }

    onSelected = (e: any) => {
        const {selectedChange, data} = this.props;
        selectedChange && selectedChange(data, e);
    }

    render() {
        const {name, lock, hide, selected = false} = this.props.data || {};
        return (
            <div className={`layer-item ${selected ? "layer-item-selected" : ""}`}
                 onClick={(e) => this.onSelected(e)}>
                <div className={'layer-item-name'}>{name}</div>
                <div className={'layer-item-operators'}>
                    <div className={'layer-item-operator'}>
                        <span onClick={this.toggleHide}>
                            <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}
                                 style={{width: 14}}/>
                        </span>
                    </div>
                    <div className={'layer-item-operator'}>
                        <span onClick={this.toggleLock}>
                            <img src={lock ? lockImg : unlockImg} alt={lock ? '锁定' : '解锁'}/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LayerItem;