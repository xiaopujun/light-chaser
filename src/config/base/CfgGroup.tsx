import React, {Component} from 'react';
import {CfgItemProps} from '../../types/ConfigItemTypes';
import CfgItem from "./CfgItem";

interface CfgGroupProps {
    items?: Array<CfgItemProps>;
}

class CfgGroup extends Component<CfgGroupProps> {
    render() {
        const {items = []} = this.props;
        return (
            <>
                {items.map((item: CfgItemProps, index: number) => {
                    const {visible = true} = item;
                    if (visible)
                        return <CfgItem key={index + ''} {...item}/>
                    else
                        return;
                })}
            </>
        );
    }
}

export default CfgGroup;