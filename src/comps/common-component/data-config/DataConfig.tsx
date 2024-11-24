import {useEffect, useState} from 'react';
import './DataConfig.less';
import AbstractController from "../../../framework/core/AbstractController";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {ConfigType} from "../../../designer/right/ConfigContent";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {DataConfigType} from "../../../designer/DesignerType.ts";
import {StaticDataConfig} from "./static/StaticDataConfig.tsx";
import {ApiDataConfig} from "./api/ApiDataConfig.tsx";
import {DatabaseDataConfig} from "./database/DatabaseConfig.tsx";

type DataTypeItem = 'static' | 'api' | 'database' | 'excel';

type DataTypes = (DataTypeItem)[];

export interface DataConfigProps<T extends AbstractController = AbstractDesignerController> extends ConfigType<T> {
    // 限制数据源类型，默认全部。（针对如进度图类型的图表，其数据只是一个简单的数字，一般不通过excel导入）
    dataTypes?: DataTypes;
    // 接口数据转换函数，默认按照json格式转换（对于有自己特殊类型的图表，可以自定义转换函数，比如仪表盘，其数据是一个数字，而不是json）
    apiDataConvert?: (data: string) => any;
}

const DataConfig = (props: DataConfigProps) => {
    const {controller} = props;
    const dataSource = controller.getConfig()?.data as DataConfigType;
    const [sourceType, setSourceType] = useState<DataTypeItem>(dataSource.sourceType!);


    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {data} = fieldChangeData;
        setSourceType(data as DataTypeItem);
        controller.update({data: {sourceType: data}}, {reRender: false});
    }

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '10px'},
        children: [
            {
                key: 'sourceType',
                label: '数据源',
                type: 'select',
                reRender: true,
                value: sourceType || 'static',
                config: {
                    options: [
                        {value: 'static', label: '静态数据'},
                        {value: 'api', label: '接口(API)'},
                        {value: 'database', label: '数据库'}
                    ],
                    containerStyle: {
                        marginBottom: 10
                    }
                }
            }
        ]
    }

    useEffect(() => {
        /**
         * 监视配置面板宽度变化，以实时调整代码编辑器的宽度，达到代码编辑器宽度自适应的效果。后续如果有更好的解决方案，请修改此处代码。
         */
        const configPanelDom = document.querySelector(".lc-config-panel");
        if (configPanelDom) {
            // 创建一个 ResizeObserver 实例
            const resizeObserver = new ResizeObserver(() => {
                const dataConfigDom = document.querySelector('.data-config');
                if (!dataConfigDom)
                    return;
                const computedStyle = window.getComputedStyle(dataConfigDom);
                const contentWidth = dataConfigDom.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
                const editorContainerDomArr = configPanelDom.getElementsByClassName('monaco-editor-container');
                if (editorContainerDomArr.length > 0) {
                    for (let i = 0; i < editorContainerDomArr.length; i++) {
                        const editorDom = editorContainerDomArr[i] as HTMLElement;
                        if (editorDom)
                            editorDom.style.width = contentWidth + 'px';
                    }
                }
            });

            // 开始观察目标元素
            resizeObserver.observe(configPanelDom);

            return () => {
                resizeObserver.unobserve(configPanelDom);
                resizeObserver.disconnect();
            }
        }
    }, []);

    return (
        <div className={'data-config'}>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
            {sourceType === 'static' && <StaticDataConfig controller={controller} data={dataSource.staticData}/>}
            {sourceType === 'api' && <ApiDataConfig controller={controller} data={dataSource.apiData!}/>}
            {sourceType === 'database' && <DatabaseDataConfig controller={controller} data={dataSource.database!}/>}
        </div>
    );
}

export default DataConfig;





