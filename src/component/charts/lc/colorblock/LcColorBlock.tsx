import React, {Component} from 'react';
import EditTools from "../../../designer/EditTool";

interface LcColorBlockProps {
    elemId?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * lc颜色块组件
 */
class LcColorBlock extends Component<LcColorBlockProps> {
    render() {
        const {chartConfig, elemId} = this.props;
        const {baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
            </div>
        );
    }
}

export default LcColorBlock;