<h2 align="middle"> LIGHT CHASER</h2>

<p align="middle">
    <img alt="" src="https://img.shields.io/badge/version-v0.0.3-blue">
    <img alt="" src="https://img.shields.io/badge/language-typescript-blue">
    <img alt="" src="https://img.shields.io/badge/license-MIT-08CE5D?logoColor=08CE5D">
    <img alt="" src="https://img.shields.io/badge/framework-React-61daeb?logoColor=08CE5D">
</p>

<p align="middle">light chaser（追光者） 一个拖拽式的数据可视化设计工具</p>

# 一、简介

light chaser是一个数据可视化设计器工具。通过拖、拉、拽、快捷键的方式可快速构建出一个数据可视化页面。不论是数据大屏、数据报表它都可以轻松完成。

同时它也是一个在不断完善的项目。

如果你需要一个开源、免费的数据可视化设计工具，那你可以尝试选择它.

如果你希望它做的更好，请参与，完善它！

现在你可以在线体验它：
[在线体验请点](https://xiaopujun.github.io/light-chaser-app/#/)

要更直观的了解它：
[实机演示](https://www.bilibili.com/video/BV1Uh4y1v7sv/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac)

# 二、他能做

![image.png](https://s2.loli.net/2023/09/13/AqOQ54ULhnEJagP.png)

![01.png](https://s2.loli.net/2023/09/13/KetpTjqzVUyhAG5.png)

# 三、如何运行

```shell
# 1. 克隆项目
git clone https://gitee.com/xiaopujun/light-chaser.git

# 2. 安装依赖
yarn install

# 3. 启动项目 
yarn start

# 4. 访问
http://localhost:3000

# 5. 编译打包
yarn build
```

# 四、如何使用

[使用教程](https://www.bilibili.com/video/BV1Fk4y1w7rd/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac)

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

