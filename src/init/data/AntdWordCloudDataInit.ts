import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
export const initAntdWordCloud = () => {
    return cloneDeep({
        baseStyle: {
            padding:'5px',
            bgColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {"value": 9, "name": "AntV"},
                {"value": 6, "name": "Layout"},
                {"value": 6, "name": "Quantitative"},
                {"value": 6, "name": "Relation"},
                {"value": 6, "name": "Statistics"},
                {"value": 6, "name": "可视化"},
                {"value": 6, "name": "数据"},
                {"value": 6, "name": "数据可视化"},
                {"value": 3, "name": "Rename"},
                {"value": 3, "name": "Reverse"},
                {"value": 3, "name": "sort"},
                {"value": 3, "name": "Subset"},
                {"value": 3, "name": "Partition"},
                {"value": 3, "name": "Imputation"},
                {"value": 3, "name": "Fold"},
                {"value": 3, "name": "Aggregate"},
                {"value": 3, "name": "Proportion"},
                {"value": 3, "name": "Histogram"},
                {"value": 3, "name": "Quantile"},
                {"value": 3, "name": "Treemap"},
            ],
            color: ['#00ff3c', '#ffaf12', '#ff6410', '#00ffd2'],
            wordField: 'name',
            weightField: 'value',
            colorField: 'name',
            autoFit: false,
            wordStyle: {
                fontFamily: 'Verdana',
                fontSize: [8, 32],
                rotation: 0,
            },
            random: Math.random
        }
    });
};

