import lockImg from '../icon/lock.svg';
import previewClose from '../icon/preview-close.svg';
import previewOpen from '../icon/preview-open.svg';
import unlockImg from '../icon/unlock.svg';
import {BaseLayer} from "./BaseLayer";

class LayerItem extends BaseLayer {

    render() {
        const {name = '', lock = false, hide = false, selected = false} = this.state || {};
        return (
            <div className={`layer-item ${selected ? "layer-selected" :
                hide ? "layer-hide" : lock ? "layer-lock" : ""}`} onClick={this.onSelected}>
                <div className={'layer-name'}>{name}</div>
                <div className={'layer-operators'}>
                    <div className={'layer-operator'}>
                        <span onClick={this.toggleHide}>
                            <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}/>
                        </span>
                    </div>
                    <div className={'layer-operator'}>
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