import {action, makeObservable, observable, toJS} from "mobx";
import AbstractManager from "../../../designer/manager/core/AbstractManager.ts";
import { MonacoEditorDialogDataType } from "./MonacoEditorDialogDataType.tsx";
import { MonacoEditorProps } from "./MonacoEditor.tsx";

class MonacoEditorDialogManager extends AbstractManager<MonacoEditorDialogDataType> {
    constructor() {
        super();
        makeObservable(this, {
            props: observable,
            visible: observable,
            closeHandler: observable,
            setProps: action,
            setVisibility: action,
            setCloseHandler: action,
            resetCloseHandler: action,
            handleClose: action
        })

    }

    props: MonacoEditorProps = {};

    visible: boolean = false;

    closeHandler: (props: MonacoEditorProps)=>void = ()=>{};

    setVisibility = (visible: boolean) => {
        this.visible = visible;
        if (!visible){
            console.log()
        }
    };

    setValue = (value?: string) => this.props.value = value;

    setProps = (props: MonacoEditorProps) => this.props = props;

    setCloseHandler = (closeHandler:(props: MonacoEditorProps)=>void) => this.closeHandler = closeHandler;

    resetCloseHandler = () => this.closeHandler = ()=>{};

    handleClose = ():void => {
        this.closeHandler(toJS(this.props));
    }

    public init(data: MonacoEditorDialogDataType): void {
        this.props = data.props || {};
    }

    public getData(): MonacoEditorDialogDataType {
        return {props: this.props}
    }

    public destroy(): void {
        this.props = {}
    }
}

const monacoEditorDialogManager= new MonacoEditorDialogManager();
export default monacoEditorDialogManager;