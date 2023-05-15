export default interface BaseStore {
    /**
     * 初始化
     */
    doInit: (data?: any) => void;
    /**
     * 销毁
     */
    doDestroy: () => void;
    /**
     * 获取数据
     */
    getData: () => any;
}

