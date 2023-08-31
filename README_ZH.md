<h2 align="middle"> LIGHT CHASER</h2>

<p align="middle">
    <img alt="" src="https://img.shields.io/badge/version-v0.0.3-blue">
    <img alt="" src="https://img.shields.io/badge/language-typescript-blue">
    <img alt="" src="https://img.shields.io/badge/license-MIT-08CE5D?logoColor=08CE5D">
    <img alt="" src="https://img.shields.io/badge/framework-React-61daeb?logoColor=08CE5D">
</p>

<p align="middle">light chaser 是一个可拖拽式的WEB数据可视化设计器</p>
<p align="middle">
    <a href="https://xiaopujun.github.io/light-chaser-app/#/" target="_blank">Demo</a> / <a href="https://www.bilibili.com/video/BV1v8411z78f/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac" target="_blank">视频</a>
</p>

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

![image.png](https://s2.loli.net/2023/08/30/SnIYcomQWxaGyfj.png)

# 三、如何运行

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

# 四、如何使用

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
|up| 组件上移|
|down| 组件下移|
|left| 组件左移|
|right| 组件右移|
|ctrl + shift + up| 组件向上放大|
|ctrl + shift + down| 组件向下放大|
|ctrl + shift + left| 组件向左放大|
|ctrl + shift + right| 组件向右放大|
|ctrl + alt + up| 组件向上缩小|
|ctrl + alt + down| 组件向下缩小|
|ctrl + alt + left| 组件向左缩小|
|ctrl + alt + fight| 组件向右缩小|
|ctrl + z| 撤销|
|ctrl + shift + z| 重做|

# 五、目录结构

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

# 六、如何快速接入自己的组件

在LC中接入自己的组件非常简单。你仅需要做一件事！！！

1. 找到src/comps目录，新建一个你自定义组件的文件夹
2. 假设我的自定义组件名为：MyComp
3. 新建ts文件，命名为：MyComp.ts，在该文件中新建一个class，并继承AbstractCustomComponentDefinition。实现其中的方法。
4. 新建ts文件，命名为：MyCompDefinition.ts，在该文件中新建一个class，并继承AbstractDesignerComponent。实现其中的方法。

到此就结束了！！！剩下的交给自动扫描器，他会自动扫描你的组件，并将其注册到LC中。

代码示例可参考：src/comps/antd/pie 中的实现

# 七、 结语

如果觉得本项目不错，欢迎star

