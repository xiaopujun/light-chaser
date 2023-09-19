import {ImgUtil} from "../../utils/ImgUtil";


const canvasWorkerCode = () => {
    /* eslint-disable-next-line no-restricted-globals */
    self.onmessage = function (e) {
        let workerResult = 'Received from main: ' + (e.data);
        const {imgDom, screenShotId, options} = e.data;
        console.log('dom', imgDom);
        ImgUtil.htmlToImgWithId(imgDom, screenShotId, options).then(() => console.log('异步更新截图成功'));
        /* eslint-disable-next-line no-restricted-globals */
        self.postMessage(workerResult);
    }
};

// 把脚本代码转为string
let code = canvasWorkerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

export default worker_script;
