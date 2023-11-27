import {BaseLayer} from "./BaseLayer";
import Input from "../../../../ui/input/Input";
import {EditFilled, EyeFilled, EyeInvisibleFilled, UnlockFilled, UsbFilled} from "@ant-design/icons";

class LayerItem extends BaseLayer {

    render() {
        const {name = '', inputMode, lock = false, hide = false, selected = false} = this.state || {};
        return (
            <div className={`layer-item ${selected ? "layer-selected" :
                hide ? "layer-hide" : lock ? "layer-lock" : ""}`} onClick={this.onSelected}
                 onDoubleClick={this.openInput}>
                <div className={'layer-name'}>
                    {inputMode ? <Input type="text" defaultValue={name} autoFocus={true} onChange={this.changeLayerName}
                                        onKeyDown={(e) => {
                                            if (e.code === "Enter")
                                                this.closeInput();
                                        }}
                                        onBlur={this.closeInput}/> : name}
                </div>
                <div className={'layer-operators'}>
                    <div className={'layer-operator'} onClick={this.openInput}>
                        <EditFilled/>
                    </div>
                    <div className={'layer-operator'} onClick={this.toggleHide}>
                        {hide ? <EyeInvisibleFilled/> : <EyeFilled/>}
                    </div>
                    <div className={'layer-operator'} onClick={this.toggleLock}>
                        {lock ? <UsbFilled/> : <UnlockFilled/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default LayerItem;