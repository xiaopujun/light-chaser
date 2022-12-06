import React, {Component} from 'react';
import EditTools from "../../../edit-tool";


interface LcTextProps {
    elemId?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * lc文本组件
 */
class LcText extends Component<LcTextProps> {
    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        const {color = '#fff', fontSize = 12} = chartProps;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <div style={{
                    color,
                    fontSize: fontSize + 'px',
                }}>{chartProps?.value || '文本'}</div>
            </div>
        );
    }
}

export default LcText;