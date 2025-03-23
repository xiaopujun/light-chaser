/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

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