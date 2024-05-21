import './DemoMain.less';
import "@amap/amap-jsapi-types";
// import * as AntdG2Plot from "@antv/g2plot";

export default function Demo() {

    // console.log(AntdG2Plot);


    setTimeout(() => {
        import("@antv/g2plot").then((AntdG2Plot) => {
            console.log(AntdG2Plot);
        })
    }, 3000);

    return (
        <div>
            test
        </div>
    );
}
