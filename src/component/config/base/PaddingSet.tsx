import React, {Component} from 'react';
import LCNumberInput from "../../base/LCNumberInput";
import './style/PaddingSet.less';
import {init} from "http-proxy-middleware/dist/_handlers";
import {bindReporter} from "web-vitals/dist/modules/lib/bindReporter";

interface PaddingSetProps {
    data?: string;
    count?: number;
    onChange?: (data: string) => void;
    unit?: string;
}

export default class PaddingSet extends Component<PaddingSetProps> {

    state: any = {
        data: []
    }

    constructor(props: PaddingSetProps) {
        super(props);
        const {data} = this.props;
        if (data == null) {
            this.state = {data: [0, 0, 0, 0]};
            return;
        }
        let paddingItem = data.split(' ');
        let initArr = [];
        for (let i = 0; i < paddingItem.length; i++)
            initArr.push(parseInt(paddingItem[i].replace('px', '')));
        this.state = {data: initArr};
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
        const {unit = 'px'} = this.props!;
        const {data} = this.state;
        let itemArr = [];
        for (let i = 0; i < data.length; i++) {
            itemArr.push(
                <span className={'lc-input-container'} key={i + ''}>
                    <LCNumberInput id={i + ""} value={data[i]} onChange={this.onChange}/>
                    <label>&nbsp;{unit}</label>
                </span>
            )
        }
        return (
            <div className={'lc-config-item lc-padding-config'}>
                <label className={'lc-config-item-label'}>内边距：</label>
                <div className={'lc-config-item-value'}>
                    {itemArr}
                </div>
            </div>
        );
    }
}
