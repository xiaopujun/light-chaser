import React, {Component} from 'react';
import LCNumberInput from "../../base/LCNumberInput";
import './style/PaddingSet.less';

interface PaddingSetProps {
    data?: Array<number>;
    count?: number;
    onChange?: (data: string) => void;
    unit?: string;
}

export default class PaddingSet extends Component<PaddingSetProps> {

    state: any = {
        data: []
    }

    onChange = (value: number, id: string) => {
        let {data} = this.state;
        const {onChange} = this.props;
        data[id] = value;
        this.setState({data});
        let paddingSet = "";
        for (let i = 0; i < data.length; i++)
            paddingSet += data[i] + 'px ';
        paddingSet = paddingSet.trim();
        console.log(paddingSet)
        onChange && onChange(paddingSet);
    }

    render() {
        const {count = 4, unit = 'px'} = this.props!;
        let inputArr = [];
        for (let i = 0; i < count; i++) {
            inputArr.push(
                <span className={'lc-input-container'} key={i + ''}>
                    <LCNumberInput id={i + ""} onChange={this.onChange}/>
                    <label>&nbsp;{unit}</label>
                </span>
            )
        }
        return (
            <div className={'lc-config-item lc-padding-config'}>
                <label className={'lc-config-item-label'}>内边距：</label>
                <div className={'lc-config-item-value'}>
                    {inputArr}
                </div>
            </div>
        );
    }
}
