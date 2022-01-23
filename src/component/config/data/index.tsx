import React, {Component} from 'react';
import {Collapse, Select, Slider, Table, Tag, Space} from "antd";

const {Panel} = Collapse;
const {Option} = Select;

class ElemDataSet extends Component {


    render() {




        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>

                </Collapse>
            </div>
        );
    }
}

export default ElemDataSet;