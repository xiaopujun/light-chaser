import AntdCommonBarController from "../../antd-common/bar/AntdCommonBarController.ts";

export default class AntdPercentBarController extends AntdCommonBarController {

    changeData(data: any) {
        super.changeData(data);
        this.instance?.render();
    }
}