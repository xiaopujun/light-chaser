import React, {Component} from 'react';
import CfgItem, {CfgItemProps} from "./CfgItem";

interface CfgGroupProps {
    items?: Array<CfgItemProps>;
}

class CfgGroup extends Component<CfgGroupProps> {
    render() {
        const {items = []} = this.props;
        return (
            <>
                {items.map((item: CfgItemProps, index: number) => {
                    return <CfgItem key={index + ''} {...item}/>
                })}
            </>
        );
    }
}

export default CfgGroup;