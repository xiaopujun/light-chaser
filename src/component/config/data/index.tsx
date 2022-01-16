import React, {Component} from 'react';
import {Collapse, Select, Slider, Table} from "antd";

const {Panel} = Collapse;
const {Option} = Select;

class ElemDataSet extends Component {
    render() {
        return (
            <div className={'elem-base-config'}>
                <Collapse className={'base-config-collapse'} bordered={false}>
                    <Table
                        columns={[
                            {
                                title: 'name',
                                dataIndex: 'name',
                                width: '30%',
                            },
                            {
                                title: 'age',
                                dataIndex: 'age',
                            },
                            {
                                title: 'address',
                                dataIndex: 'address',
                            },

                        ]}
                    />
                </Collapse>
            </div>
        );
    }
}

export default ElemDataSet;