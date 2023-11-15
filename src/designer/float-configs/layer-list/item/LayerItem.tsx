import React, {MouseEvent} from 'react';
import './LayerItem.less';
import lockImg from '../icon/lock.svg';
import previewClose from '../icon/preview-close.svg';
import previewOpen from '../icon/preview-open.svg';
import unlockImg from '../icon/unlock.svg';
import layerListStore from "../LayerListStore";

export interface LayerItemDataProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
}

class LayerItem extends React.PureComponent<LayerItemDataProps> {

    state = {
        selected: false,
        lock: false,
        hide: false,
        compId: '',
        name: ''
    }

    constructor(props: LayerItemDataProps) {
        super(props);
        const {selected, lock, hide, compId, name} = props;
        this.state = {
            selected: selected || false,
            lock: lock || false,
            hide: hide || false,
            compId: compId || '',
            name: name || ''
        }
    }

    toggleLock = () => {
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.state.compId, !this.state.lock);
    }

    toggleHide = () => {
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.state.compId, !this.state.hide);
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange({...this.state, ...{selected: true}}, event);
    }

    render() {
        const {name, lock, hide, selected = false} = this.state || {};
        const itemClass = `layer-item ${selected ? "layer-item-selected" : hide ? "layer-item-hide" : lock ? "layer-item-lock" : ""}`;
        return (
            <div className={itemClass}
                 onClick={this.onSelected}>
                <div className={'layer-item-name'}>{name}</div>
                <div className={'layer-item-operators'}>
                    <div className={'layer-item-operator'}>
                        <span onClick={this.toggleHide}>
                            <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}/>
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