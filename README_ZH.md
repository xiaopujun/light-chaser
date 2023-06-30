# 一、简介

Light Chaser(LC) 是一款基于React生态的大屏数据可视化设计器。通过简单的拖拽，即可生成漂亮、美观的可视化数据大屏和看板。

她具有以下特点：

- 高性能：结合React和Mobx的特点以及LC本身的设计理念。 尽最大努力的避免组件的无效渲染。 使得LC的整体性能保持在了一个较好的水平。 在几百个复杂组件的场景下。 仍能做到流畅的渲染。
- 高扩展：LC提供一个统一接口。只需实现该接口。理论上可以接入任何react生态的组件。这使得LC的组件库可以无限扩展。
- 高可定制：同样依赖于设计的统一接口。 对于开发者自己实现的组件。它的配置项完全可以由开发者自定义。你可以使用LC提供的默认配置组件。也可以完全使用自己的实现。
- 前后端分离：本项目100%前后端分离，即使没有后端服务。LC设计器也可以像本地应用一样完美运行（目前仅支持本地运行，后续会支持部署到服务器）。
- 主题快速切换：LC提供了主题切换功能。你可以在全局切换主题。也可以在组件级别切换主题。这使得你可以快速的切换主题。从而快速的生成不同风格的大屏。
- 快捷键操作：LC提供了丰富的快捷键操作。你可以通过快捷键快速的完成一些操作。从而提高你的工作效率。
- 拖拽栅格化布局：LC提供了拖拽栅格化布局功能。你可以通过拖拽的方式快速的完成布局。从而快速的生成大屏。

# 二、效果展示

![2023-06-29 21-10-19 -original-horizontal.gif](https://s2.loli.net/2023/06/29/AweO65TG3nuNCLE.gif)

![3 -original-horizontal.gif](https://s2.loli.net/2023/06/29/o32EUgvwCuDPLzk.gif)

视频演示：https://v.douyin.com/y8g6VV3/

# 三、主要技术栈

| 技术栈 | 版本 | 说明|
| ---- | ---- | ---- |
| typescript | ^4.4.4 ||
| React | ^17.0.2 ||
| Mobx | ^6.7.0 |状态管理|
| antd | ^4.17.3 ||
| @ant-design/charts |^1.4.2|图表组件库|
| @scena/react-ruler |^0.17.1|标尺组件|
| react-moveable |^0.51.0|组件拖拽框架|
| codemirror |^5.65.13|代码编辑器|

详细依赖请查看package.json

# 四、如何运行

1. 克隆项目到本地

```shell
git clone https://gitee.com/xiaopujun/light-chaser.git
```

2. 安装项目依赖

```shell
yarn install
```

3. 启动项目

```shell
yarn start
```

4. 访问项目

```shell
http://localhost:3000
```

5. 打包项目

```shell
yarn build
```

# 五、如何使用

|操作方式/快捷键|说明|
|--- | ---|
|双击左侧组件| 添加组件到画布|
|鼠标右键长按 | 拖拽画布|
|alt + 滑轮 | 缩放画布|
|ctrl + v| 复制组件|
|ctrl + l| 锁定组件|
|ctrl + 方向上键| 置顶组件|
|ctrl + 方向下键| 置底组件|
|delete| 删除组件|

# 六、目录结构

```text
src
├─comps 设计器组件列表（所有可拖拽的组件均在该目录下实现）
│  ├─antd antd组件实现
│  ├─common-fragment 公共代码片段
│  └─lc 设计器自带组件实现
├─designer 设计器
│  ├─canvas 画布
│  ├─common 公共代码
│  ├─footer 设计器底部
│  ├─header 设计器头部
│  ├─left 设计器左侧
│  ├─operate-provider 设计器事件操作
│  ├─right 设计器右侧
│  ├─store 设计器状态管理
│  ├─structure 设计器页面框架结构
│  └─view 
├─framework 框架设计
│  └─core 自动扫描组件定义
├─icon 
├─lib 自己实现的组件库
├─list 列表页（首页）
└─utils 工具类
```

# 七、如何快速接入自己的组件

在LC中接入自己的组件非常简单。你仅需要做一件事！！！

1. 找到src/comps目录，新建一个你自定义组件的文件夹
2. 假设我的自定义组件名为：MyComp
3. 新建一个ts文件，命名为：MyCompCore.ts，在该文件中新建一个class，并继承AbstractCustomComponentDefinition。实现其中的方法。

到此就结束了！！！剩下的交给自动扫描器，他会自动扫描你的组件，并将其注册到LC中。

> AbstractCustomComponentDefinition定义如下

```typescript
export abstract class AbstractCustomComponentDefinition {

    /**
     * 返回组件基础信息，用于在组件列表中展示
     */
    abstract getBaseInfo(): BaseInfoType | null;

    /**
     * 返回React组件的类模板，在设计器拖拽创建组件实例时会使用到
     */
    abstract getComponent(): React.Component | React.FC | any;

    /**
     * 返回对应组件的默认配置，在拖拽生成组件实例后需要展示默认效果
     */
    abstract getInitConfig(): ElemConfig | Object | null

    /**
     * 返回组件图片缩略图，在组件列表中展示时使用。图片不要超过300kb,否则会影响设计器的加载速度
     */
    abstract getChartImg(): any;

    /**
     * 返回右侧菜单列表，双击组件时需要展示菜单列表
     */
    abstract getMenuList(): Array<MenuInfo>;

    /**
     * 返回右侧菜单对应的具体配置内容。这个返回结果是一个映射关系。以对象形式返回
     */
    abstract getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any };

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     * @param sourceStyle 组件原样式
     */
    abstract updateTheme(newTheme: ThemeItemType, sourceStyle: any): void;
}
```

## 7.1 代码示例

比如我要接入一个antd的条形图组件，那么我仅需提供如下实现即可。

```typescript
import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import barImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseBarStyleConfig = React.lazy(() => import('./AntdBaseBarConfig').then(module => ({default: module.AntdBaseBarStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdBaseBar = React.lazy(() => import("./AntdBaseBar"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdBaseBarCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础条形图",
            key: 'AntdBaseBar',
            typeName: "条形图",
            typeKey: "bar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return barImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseBar;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础条形图',
                type: 'AntdBaseBar',
                des: '基于antd实现的基础条形图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
                        {
                            name: "1951 年",
                            value: 48
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 22
                        }
                    ],
                    xField: "value",
                    yField: "name",
                    seriesField: "name",
                    xAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00ffbbff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#00baffff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#1a98b5ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 3
                        },
                        position: "right",
                        title: null
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00dbffff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#21f2f5ff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#03b7a3ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 2
                        },
                        position: "bottom",
                        title: null
                    },
                    color: "#00ffea",
                    legend: {
                        position: "right-top",
                        layout: "vertical",
                        itemName: {
                            style: {
                                fill: "#00f0ffff",
                                fontSize: 12
                            }
                        }
                    },
                    maxBarWidth: 14,
                }
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                            name: "1951 年",
                            value: 38
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 61
                        }
                    ]
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any } {
        return {
            'info': BaseInfo,
            'style': AntdBaseBarStyleConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseBarCore;
```

# 8、 结语

如果觉得本项目不错，欢迎star

