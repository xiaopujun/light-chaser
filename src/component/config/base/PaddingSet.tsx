import React, {Component} from 'react';
import LCNumberInput from "../../base/LCNumberInput";
import './style/PaddingSet.less';
import LcUnderLineInput from "../../base/LcUnderLineInput";

interface PaddingSetProps {
    value?: string;
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
        const {value} = this.props;
        if (value == null) {
            this.state = {data: [0, 0, 0, 0]};
            return;
        }
        let paddingItem = value.split(' ');
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
            <div className={'lc-padding-config'}>
                <div className={'lc-padding-content'}>
                    <div className={'lc-padding-top'}>
                        <LcUnderLineInput type={'number'} inputStyle={{width: 20}}
                                          containStyle={{width: 20}}/><span>px</span>
                    </div>
                    <div className={'lc-padding-middle'}>
                        <div className={'lc-padding-left'}>
                            <LcUnderLineInput type={'number'} inputStyle={{width: 20}}
                                              containStyle={{width: 20}}/><span>px</span>
                        </div>
                        <div className={'lc-padding-center'}>alone</div>
                        <div className={'lc-padding-right'}>
                            <LcUnderLineInput type={'number'} inputStyle={{width: 20}}
                                              containStyle={{width: 20}}/><span>px</span>
                        </div>
                    </div>
                    <div className={'lc-padding-bottom'}>
                        <LcUnderLineInput type={'number'} inputStyle={{width: 20}}
                                          containStyle={{width: 20}}/><span>px</span>
                    </div>
                </div>

            </div>
        );
    }
}
