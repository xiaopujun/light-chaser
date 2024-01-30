import {EditFilled, EyeFilled, EyeInvisibleFilled, FolderOpenFilled, UnlockFilled, UsbFilled} from "@ant-design/icons";
import {BaseLayer} from "./BaseLayer";

export default class LayerGroupItem extends BaseLayer {

    render() {
        const {children} = this.props;
        const {hide, lock, showContent, selected, name, inputMode} = this.state;
        return (
            <div className={'layer-group'}>
                <div className={`group-header ${selected ? "layer-selected" : hide
                    ? "layer-hide" : lock ? "layer-lock" : ""}`}
                     onDoubleClick={this.openInput}
                     onClick={(e) => this.onSelected(e)}>
                    <div className={'group-left'}>
                        <div className={'group-icon'} onClick={() => this.setState({showContent: !showContent})}>
                            <FolderOpenFilled/></div>
                        <div className={'group-name'}>{inputMode ?
                            <input type="text" defaultValue={name} autoFocus={true} onChange={this.changeLayerName}
                                   ref={ref => ref?.select()}
                                   onKeyDown={(e) => {
                                       if (e.code === "Enter")
                                           this.closeInput();
                                   }}
                                   onBlur={this.closeInput}/> : name}
                        </div>
                    </div>
                    <div className={'group-operators'}>
                        <div className={'group-operator'} onClick={this.openInput}>
                            <EditFilled/>
                        </div>
                        <div className={'group-operator'} onClick={this.toggleHide}>
                            {hide ? <EyeInvisibleFilled/> : <EyeFilled/>}
                        </div>
                        <div className={'group-operator'} onClick={this.toggleLock}>
                            {lock ? <UsbFilled/> : <UnlockFilled/>}
                        </div>
                    </div>
                </div>
                {showContent && <div className={'group-content'}>
                    {children}
                </div>}
            </div>
        );
    }
}