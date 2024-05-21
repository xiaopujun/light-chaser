import {BaseLayer} from "./BaseLayer";
import {Edit, FolderClose, Lock, PreviewClose, PreviewOpen, Unlock} from "@icon-park/react";

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
                            <FolderClose size={12}/></div>
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
                            <Edit/>
                        </div>
                        <div className={'group-operator'} onClick={this.toggleHide}>
                            {hide ? <PreviewClose/> : <PreviewOpen/>}
                        </div>
                        <div className={'group-operator'} onClick={this.toggleLock}>
                            {lock ? <Lock/> : <Unlock/>}
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