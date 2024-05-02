import './DemoMain.less';
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";
import {useEffect} from "react";

export default function Demo() {
    let map: any = null;

    useEffect(() => {
        window._AMapSecurityConfig = {
            securityJsCode: "d107583173717687ccaa0276e8d97807",
        };
        AMapLoader.load({
            key: "f8b6f8c38839995b24e96dbe217c344a", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
        }).then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 11, // 初始化地图级别
                center: [116.397428, 39.90923], // 初始化地图中心点位置
            });
            const infoWindow = new AMap.InfoWindow({
                //创建信息窗体
                isCustom: true, //使用自定义窗体
                content: "<div style='width: 100px;height: 100px;background-color: black'>HELLO,AMAP!</div>", //信息窗体的内容可以是任意html片段
                offset: new AMap.Pixel(16, -45),
            });
            const onMarkerClick = function (e: any) {
                infoWindow.open(map, e.target.getPosition()); //打开信息窗体
                //e.target就是被点击的Marker
            };
            const marker = new AMap.Marker({
                position: [116.39, 39.9], //位置
            });
            marker.on("click", onMarkerClick); //绑定click事件
            const lineArr = [
                [116.368904, 39.913423],
                [116.382122, 39.901176],
                [116.387271, 39.912501],
                [116.398258, 39.904600]
            ];
            const polyline = new AMap.Polyline({
                path: lineArr, //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeWeight: 5, //线宽
                strokeStyle: "solid", //线样式
            });
            map.add(polyline);
            map.add(marker); //添加到地图

        }).catch((e) => {
            console.log(e);
        });

        return () => {
            map?.destroy();
        };
    }, []);

    return (
        <div id="container" style={{height: 800, width: 800}}/>
    );
}
