import React, {Suspense, useRef} from "react";
import {Control} from "../../json-schema/SchemaTypes";
import {CaretDownFilled, CaretRightFilled, DeleteFilled, PlusCircleFilled} from "@ant-design/icons";
import './ControlGroup.less';
import {FieldChangeData, LCGUI} from "../../json-schema/LCGUI";
import Loading from "../loading/Loading";
import LCGUIUtil from "../../json-schema/LCGUIUtil";
import ObjectUtil from "../../utils/ObjectUtil";
import {cloneDeep} from "lodash";

export interface ControlGroupProps {
    label?: string;
    itemName?: string;
    template?: Control;
    defaultValue?: object[];
    onChange?: (value: any) => void;
}

const ControlGroup = (props: ControlGroupProps) => {
    const {label, defaultValue = [], template, itemName} = props;
    const [toggle, setToggle] = React.useState<boolean>(false);
    const templateData = LCGUIUtil.parseSchemaData(template!);
    const initSchema: Control = {children: []};
    defaultValue.forEach((data, index) => {
        initSchema.children?.push({
            type: 'accordion',
            key: index + '',
            label: (itemName || '系列') + (index + 1),
            children: [{...LCGUIUtil.schemaStructureAssignment(data, cloneDeep(template!))}]
        });
    });
    const dataRef = useRef(defaultValue);
    const [schema, setSchema] = React.useState<Control>(initSchema);

    const addNewGroup = () => {
        const {template} = props;
        if (!template) return;
        schema.children?.push({
            type: 'accordion',
            key: dataRef.current.length + '',
            label: (itemName || '系列') + (dataRef.current.length + 1),
            children: [template]
        });
        setSchema({...schema});
        dataRef.current = [...dataRef.current, {...templateData}];
        const {onChange} = props;
        onChange && onChange(dataRef.current);
    }

    const delGroup = () => {
        schema.children?.pop();
        setSchema({...schema});
        dataRef.current.pop();
        const {onChange} = props;
        onChange && onChange(dataRef.current);
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        const index = Number(Object.keys(dataFragment)[0]);
        dataRef.current[index] = ObjectUtil.merge(dataRef.current[index], dataFragment[index as keyof object]);
        const {onChange} = props;
        onChange && onChange(dataRef.current);
    }
    return (
        <div className="control-group">
            <div className={'control-group-header'}>
                <div className={'cgh-label'}><span>{label}</span></div>
                <div className={'cgh-operate'}>
                    <span className={'operate-icon'} onClick={delGroup}><DeleteFilled/></span>
                    <span className={'operate-icon'} onClick={addNewGroup}><PlusCircleFilled/></span>
                    <span className={'operate-icon toggle-icon'} onClick={() => setToggle(!toggle)}>
                        {toggle ?
                            <CaretDownFilled/> :
                            <CaretRightFilled/>}
                    </span>
                </div>
            </div>
            {toggle && <div className={'control-group-body'} style={{display: toggle ? 'block' : 'none'}}>
                <Suspense fallback={<Loading/>}>
                    <LCGUI schema={schema} onFieldChange={onFieldChange}/>
                </Suspense>
            </div>}
        </div>
    )
}

export default ControlGroup;