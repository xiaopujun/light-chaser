import BaseInit from "../../interface/BaseInit";

export default class LcColorBlockInit implements BaseInit {
    getCompName(): string {
        return "颜色块";
    }

    getCompType(): string {
        return "LcColorBlock";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '颜色块',
                type: 'LcColorBlock'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {}
        };
    }

}
