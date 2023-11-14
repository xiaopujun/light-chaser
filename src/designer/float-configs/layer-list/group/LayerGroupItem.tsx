import React from "react";
import './LayerGroupItem.less';
import previewClose from "../icon/preview-close.svg";
import previewOpen from "../icon/preview-open.svg";
import lockImg from "../icon/lock.svg";
import unlockImg from "../icon/unlock.svg";
import {FolderOpenFilled} from "@ant-design/icons";


export interface GroupItemProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
    children?: React.ReactNode;
}

export default class LayerGroupItem extends React.Component<GroupItemProps> {
    state = {
        hide: false,
        lock: false,
        showContent: false
    }

    toggleHide = () => {

    }

    toggleLock = () => {
    }

    render() {
        const {children, name} = this.props;
        const {hide, lock, showContent} = this.state;
        return (
            <div className={'layer-group-item'}>
                <div className={'layer-group-header'} onClick={() => {
                    this.setState({showContent: !this.state.showContent})
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