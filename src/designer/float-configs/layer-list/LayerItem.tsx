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
    lockChange?: (compId: string, data: boolean) => void;
    hideChange?: (compId: string, data: boolean) => void;
    selectedChange?: (compId: string) => void;
}

class LayerItem extends Component<LayerItemProps> {

    toggleLock = (compId: string) => {
        const {lockChange, data} = this.props;
        lockChange && lockChange(compId, !data!.lock);
    }

    toggleHide = (compId: string) => {
        const {hideChange, data} = this.props;
        hideChange && hideChange(compId, !data!.hide);
    }

    onSelected = (compId: string) => {
        const {selectedChange} = this.props;
        selectedChange && selectedChange(compId);
    }

    render() {
        const {name, lock, hide, compId = '', selected = false} = this.props.data || {};
        return (
            <div className={`layer-item ${selected ? "layer-item-selected" : ""}`}
                 onClick={() => this.onSelected(compId)}>
                <div className={'layer-item-name'}>{name}</div>
                <div className={'layer-item-operators'}>
                    <div className={'layer-item-operator'}>
                        <span onClick={() => this.toggleHide(compId)}>
                            <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}
                                 style={{width: 14}}/>
                        </span>
                    </div>
                    <div className={'layer-item-operator'}>
                        <span onClick={() => this.toggleLock(compId)}>
                            <img src={lock ? lockImg : unlockImg} alt={lock ? '锁定' : '解锁'}/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LayerItem;