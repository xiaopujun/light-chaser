import React, {Component} from 'react';
import {Collapse, Select, Button, Switch} from "antd";


class ElemDataSet extends Component {


    render() {

        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <div>
                        <Button type={'primary'}>点击录入数据</Button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default ElemDataSet;