import React, {Component} from 'react';
import LCNumberInput from "../../base/LCNumberInput";

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
                <span className={'lc-input'} key={i + ''}>
                    <LCNumberInput id={i + ""} onChange={this.onChange}/>
                    <label>{unit}</label>
                </span>
            )
        }
        return (
            <div className={'config-item'}>
                <label className={'config-item-label'}>内边距：</label>
                <div className={'config-item-value lc-input-value'}>
                    {inputArr}
                </div>
            </div>
        );
    }
}
