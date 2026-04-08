/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */
import React, {Suspense, useRef} from "react";
import {Control} from "../../SchemaTypes";
import './ControlGroup.less';
import {FieldChangeData, LCGUI} from "../../LCGUI";
import Loading from "../loading/Loading";
import LCGUIUtil from "../../LCGUIUtil";
import ObjectUtil from "../../../utils/ObjectUtil";
import cloneDeep from "lodash/cloneDeep";
import {AddOne, DeleteFive, Down, Right} from "@icon-park/react";

export interface ControlGroupProps {
    label?: string;
    itemName?: string;
    template?: Control;
    defaultValue?: object[];
    onChange?: (value: unknown) => void;
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
            <div className={'control-group-header'} onClick={() => setToggle(!toggle)}>
                <div className={'cgh-label'}>
                    <span>{label}</span>
                </div>
                <div className={'cgh-operate'}>
          <span
              className={'operate-icon del-icon'}
              onClick={(e) => {e.stopPropagation(); delGroup()}}
              title="删除组"
          >
            <DeleteFive size={16}/>
          </span>
                    <span
                        className={'operate-icon add-icon'}
                        onClick={(e) => {e.stopPropagation(); addNewGroup()}}
                        title="添加组"
                    >
            <AddOne size={16}/>
          </span>
                    <span
                        className={'operate-icon toggle-icon'}
                        onClick={(e) => {e.stopPropagation(); setToggle(!toggle)}}
                        title={toggle ? "折叠" : "展开"}
                    >
            {toggle ? <Down size={16}/> : <Right size={16}/>}
          </span>
                </div>
            </div>
            {toggle && (
                <div className={'control-group-body'}>
                    <Suspense fallback={<Loading/>}>
                        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
                    </Suspense>
                </div>
            )}
        </div>
    )
}

export default ControlGroup;