import React, {MouseEvent} from "react";
import previewClose from "../icon/preview-close.svg";
import previewOpen from "../icon/preview-open.svg";
import lockImg from "../icon/lock.svg";
import unlockImg from "../icon/unlock.svg";
import {FolderOpenFilled} from "@ant-design/icons";
import layerListStore from "../LayerListStore";
import './LayerGroupItem.less';


export interface GroupItemProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
    children?: React.ReactNode;
}

export default class LayerGroupItem extends React.Component<GroupItemProps> {

    constructor(props) {
        super(props);
        const {hide, compId, lock, name} = this.props;
        this.state = {
            hide: hide || false,
            lock: lock || false,
            name: name || '',
            selected: false,
            compId
        }
    }

    toggleHide = () => {

    }

    toggleLock = () => {
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange({...this.state, ...{selected: true}}, event);
    }

    render() {
        const {children, compId} = this.props;
        const {hide, lock, showContent, selected, name} = this.state;
        return (
            <div className={'layer-group-item'} id={compId} onClick={this.onSelected}>
                <div className={`layer-group-header ${selected ? 'layer-group-header-selected' : ''}`} onClick={() => {
                    this.setState({showContent: !showContent})
                }}>
                    <div className={'layer-group-left'}>
                        <div className={'layer-group-icon'}><FolderOpenFilled/></div>
                        <div className={'layer-group-name'}>{name}</div>
                    </div>
                    <div className={'layer-group-operators'}>
                        <div className={'layer-group-operator'}>
                        <span onClick={this.toggleHide}>
                            <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}/>
                        </span>
                        </div>
                        <div className={'layer-group-operator'}>
                        <span onClick={this.toggleLock}>
                            <img src={lock ? lockImg : unlockImg} alt={lock ? '锁定' : '解锁'}/>
                        </span>
                        </div>
                    </div>
                </div>
                {showContent && <div className={'layer-group-content'}>
                    {children}
                </div>}
            </div>
        );
    }
};