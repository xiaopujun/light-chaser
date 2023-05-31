import React, {Component} from 'react';
import DataConfig from "../../../lib/common-fragment/data-config/DataConfig";
import {ConfigType} from "../../../framework/types/ConfigType";

class AntdBaseBarDataConfig extends Component<ConfigType> {

    onChange = (key: string, value: any) => {
        const {updateConfig} = this.props;
        switch (key) {
            case 'static-data':
                updateConfig && updateConfig({
                    data: {
                        staticData: {
                            data: [...value],
                        }
                    },
                    style: {
                        chartStyle: {
                            data: value
                        }
                    }
                })
        }
    }

    render() {
        const {config} = this.props;
        return (
            <DataConfig config={config} onChange={this.onChange}/>
        );
    }
}

export default AntdBaseBarDataConfig;