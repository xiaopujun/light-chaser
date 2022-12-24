import React, {Component} from 'react';
import './structure.less';


class LcDesignerStructure extends Component {
    render() {
        return (
            <div className={'lc-designer-structure'}>
                <div className={'structure-header'}></div>
                <div className={'structure-body'}>
                    <div className={'structure-body-left'}></div>
                    <div className={'structure-body-content'}></div>
                    <div className={'structure-body-right'}></div>
                </div>
                <div className={'structure-foot'}></div>
            </div>
        );
    }
}

export default LcDesignerStructure;