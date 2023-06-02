import React, {Component} from 'react';
import DataConfig from "../../../lib/common-fragment/data-config/DataConfig";
import {ConfigType} from "../../../framework/types/ConfigType";

class AntdBaseBarDataConfig extends Component<ConfigType> {

    onSave = (dataConfig: any) => {
        const {updateConfig} = this.props;
        let config: any = {data: dataConfig};
        if ('staticData' in dataConfig)
            config['style'] = {
                chartStyle: {
                    data: dataConfig.staticData.data
                }
            }
        updateConfig && updateConfig(config);
    };

    render() {
        const {config} = this.props;
        return (
            <DataConfig config={config} onSave={this.onSave} verifyCallback={{}}/>
        );
    }
}

export default AntdBaseBarDataConfig;