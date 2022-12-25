import BaseInit from "../../interface/BaseInit";

export default class LcTextInit implements BaseInit {
    getCompName(): string {
        return "文本";
    }

    getCompType(): string {
        return "LcText";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '文本',
                type: 'LcText'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                value: ''
            }
        };
    }

}
