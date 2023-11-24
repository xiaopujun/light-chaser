import previewClose from "../icon/preview-close.svg";
import previewOpen from "../icon/preview-open.svg";
import lockImg from "../icon/lock.svg";
import unlockImg from "../icon/unlock.svg";
import {FolderOpenFilled} from "@ant-design/icons";
import {BaseLayer} from "./BaseLayer";

export default class LayerGroupItem extends BaseLayer {

    render() {
        const {children} = this.props;
        const {hide, lock, showContent, selected, name} = this.state;
        return (
            <div className={'layer-group'}>
                <div className={`group-header ${selected ? "layer-selected" : hide
                    ? "layer-hide" : lock ? "layer-lock" : ""}`}
                     onClick={(e) => {
                         this.onSelected(e);
                         this.setState({showContent: !showContent})
                     }}>
                    <div className={'group-left'}>
                        <div className={'group-icon'}><FolderOpenFilled/></div>
                        <div className={'group-name'}>{name}</div>
                    </div>
                    <div className={'group-operators'}>
                        <div className={'group-operator'}>
                            <span onClick={this.toggleHide}>
                                <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}/>
                            </span>
                        </div>
                        <div className={'group-operator'}>
                            <span onClick={this.toggleLock}>
                                <img src={lock ? lockImg : unlockImg} alt={lock ? '锁定' : '解锁'}/>
                            </span>
                        </div>
                    </div>
                </div>
                {showContent && <div className={'group-content'}>
                    {children}
                </div>}
            </div>
        );
    }
};