import {BaseLayer} from "./BaseLayer";
import {Edit, Lock, PreviewClose, PreviewOpen, Unlock} from "@icon-park/react";

class LayerItem extends BaseLayer {

    render() {
        const {name = '', inputMode, lock = false, hide = false, selected = false} = this.state || {};
        return (
            <div className={`layer-item ${selected ? "layer-selected" :
                hide ? "layer-hide" : lock ? "layer-lock" : ""}`} onClick={this.onSelected}
                 onDoubleClick={this.activeComponentConfig}>
                <div className={'layer-name'}>
                    {inputMode ? <input type="text" defaultValue={name} autoFocus={true} onChange={this.changeLayerName}
                                        ref={ref => ref?.select()}
                                        onKeyDown={(e) => {
                                            if (e.code === "Enter")
                                                this.closeInput();
                                        }}
                                        onBlur={this.closeInput}/> : name}
                </div>
                <div className={'layer-operators'}>
                    <div className={'layer-operator'} onClick={this.openInput}>
                        <Edit size={14}/>
                    </div>
                    <div className={'layer-operator'} onClick={this.toggleHide}>
                        {hide ? <PreviewClose size={14}/> : <PreviewOpen size={14}/>}
                    </div>
                    <div className={'layer-operator'} onClick={this.toggleLock}>
                        {lock ? <Lock size={14}/> : <Unlock size={14}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default LayerItem;