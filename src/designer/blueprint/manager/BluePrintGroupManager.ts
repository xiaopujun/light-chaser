import {BluePrintManager} from "./BluePrintManager";
import {BluePrintGroupManagerDataType, DesignerMode} from "../../DesignerType";
import IdGenerate from "../../../utils/IdGenerate";
import {action, makeObservable, observable, runInAction} from "mobx";
import AbstractManager from "../../manager/core/AbstractManager";


class BluePrintGroupManager  extends AbstractManager<BluePrintGroupManagerDataType>{
    /**激活的蓝图组ID, 创建蓝图的时候自动生成*/
    activeBpgId: string;
    /**
     * 将原来的蓝图管理器，通过group的方式管理器来，别的地方引入的蓝图管理器，全部替换成group初始化的蓝图管理器
     */
    bluePrintManager: BluePrintManager;

    bluePrintManagerMap: Record<string, BluePrintManager> = {};

    constructor() {
        super();
        makeObservable(this,{
            bluePrintManager: observable,
            activeBpgId: observable,
            bluePrintManagerMap: observable,
            createBluePrintManager: action,
            changeBluePrintManager: action,
        });
        this.createBluePrintManager("初始化");
    }

    /**
     *
     * @param bpgName 蓝图组名称
     */
    createBluePrintManager(bpgName: string){
        this.activeBpgId = IdGenerate.generateId();
        this.bluePrintManager = new BluePrintManager(bpgName);
        (this.bluePrintManagerMap)[this.activeBpgId] = this.bluePrintManager;
        this.bluePrintManager.init({
            bpgName,
            bpAPMap: {},
            bpLines: {},
            bpAPLineMap: {},
            bpNodeConfigMap: {},
            bpNodeLayoutMap: {},
        }, DesignerMode.EDIT);
        return this.activeBpgId;
    }

    /**
     *
     * @param bpgName 蓝图组ID
     */
    changeBluePrintManager(bpgId: string){
        if(this.bluePrintManagerMap[bpgId]){
            this.activeBpgId = bpgId;
            this.bluePrintManager = this.bluePrintManagerMap[bpgId];
            return this.bluePrintManager;
        }
    }

    public init(data: BluePrintGroupManagerDataType, mode: DesignerMode): void {
        runInAction(() => {
            // 有数据的情况下，清空默认的蓝图管理
            if(data != undefined && (typeof data !== 'object' || Object.keys(data).length !== 0)){
                this.bluePrintManagerMap = {};
            }
            if (mode === DesignerMode.EDIT) {
                for (let dataKey in data) {
                    const bpgName = data[dataKey].bpgName;
                    const bluePrintManager = new BluePrintManager(bpgName);
                    console.log(data,dataKey, data[dataKey]);
                    bluePrintManager && bluePrintManager.init(data[dataKey], mode);
                    if(bpgName=="初始化"){
                        this.activeBpgId = dataKey;
                        this.bluePrintManager = bluePrintManager;
                    }
                    this.bluePrintManagerMap[dataKey] = bluePrintManager;
                }
            } else {

            }
        });
    }


    public getData(): BluePrintGroupManagerDataType {
        const data = {};
        for (let key in this.bluePrintManagerMap) {
            data[key] = this.bluePrintManagerMap[key].getData();
        }
        return data;
    }


}

const bluePrintGroupManager = new BluePrintGroupManager();
export default bluePrintGroupManager;
