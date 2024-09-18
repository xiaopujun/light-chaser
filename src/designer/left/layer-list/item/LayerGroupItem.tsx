import {BaseLayer} from "./BaseLayer";
import {Edit, FolderClose, FolderOpen, Lock, PreviewClose, PreviewOpen, Unlock} from "@icon-park/react";

export default class LayerGroupItem extends BaseLayer {

    render() {
        const {children} = this.props;
        const {hide, lock, showContent, selected, name, inputMode} = this.state;
        return (
            <div className={'layer-group'}>
                <div className={`group-header ${selected ? "layer-selected" : hide
                    ? "layer-hide" : lock ? "layer-lock" : ""}`}
                     onDoubleClick={this.activeComponentConfig}
                     onClick={(e) => this.onSelected(e)}>
                    <div className={'group-left'}>
                        <div className={'group-icon'} onClick={() => this.setState({showContent: !showContent})}>
                            {showContent ? <FolderOpen size={14}/> : <FolderClose size={14}/>}
                        </div>
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
                            <Edit size={14}/>
                        </div>
                        <div className={'group-operator'} onClick={this.toggleHide}>
                            {hide ? <PreviewClose size={14}/> : <PreviewOpen size={14}/>}
                        </div>
                        <div className={'group-operator'} onClick={this.toggleLock}>
                            {lock ? <Lock size={14}/> : <Unlock size={14}/>}
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