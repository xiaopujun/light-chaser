import React, {Component} from 'react';
import LayoutTools from "./tools";

class LayoutDesignerLeft extends Component {
    render() {
        return (
            <div className={'layout-designer-left'}>
                <LayoutTools/>
            </div>
        );
    }
}

export default LayoutDesignerLeft;