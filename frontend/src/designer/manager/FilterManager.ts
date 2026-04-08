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

import {action, makeObservable, observable, toJS} from "mobx";
import AbstractManager from "./core/AbstractManager.ts";
import {FilterManagerDataType} from "../DesignerType.ts";
import idGenerate from "../../utils/IdGenerate.ts";

export interface IFilter {
    id: string;
    name: string;
    func: string;
}

class FilterManager extends AbstractManager<FilterManagerDataType> {
    constructor() {
        super();
        makeObservable(this, {
            filters: observable,
            visible: observable,
            addFilter: action,
            delFilter: action,
            updateFilter: action,
            setVisibility: action,
        })

    }

    filters: Record<string, IFilter> = {};

    editFilter: IFilter = {id: '', name: '', func: ''};

    visible: boolean = false;

    setEditFilter = (filter: IFilter) => this.editFilter = filter;

    setVisibility = (visible: boolean) => {
        this.visible = visible;
        if (!visible)
            this.editFilter = {id: '', name: '', func: ''};
    };

    addFilter = (filter: IFilter) => {
        filter.id = idGenerate.generateId();
        this.filters[filter.id] = filter
    };

    delFilter = (id: string) => delete this.filters[id];

    updateFilter = (filter: IFilter) => this.filters[filter.id] = filter;


    public init(data: FilterManagerDataType): void {
        this.filters = data.filters || {};
    }

    public getData(): FilterManagerDataType {
        return {filters: toJS(this.filters)}
    }

    public destroy(): void {
        this.filters = {}
    }
}

const filterManager = new FilterManager();
export default filterManager;