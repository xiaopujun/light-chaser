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