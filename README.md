# 简介

Light Chaser(LC) 是一款基于React生态的大屏数据可视化设计器。通过简单的拖拽，即可生成漂亮、美观的可视化数据大屏和看板。

她具有以下特点：

- 高性能：结合React和Mobx的特点以及LC本身的设计理念。 尽最大努力的避免组件的无效渲染。 使得LC的整体性能保持在了一个较好的水平。 在几百个复杂组件的场景下。 仍能做到流畅的渲染。
- 高扩展：LC提供一个统一接口。只需实现该接口。理论上可以接入任何react生态的组件。这使得LC的组件库可以无限扩展。
- 高可定制：同样依赖于设计的统一接口。 对于开发者自己实现的组件。它的配置项完全可以由开发者自定义。你可以使用LC提供的默认配置组件。也可以完全使用自己的实现。
- 前后端分离：本项目100%前后端分离，即使没有后端服务。LC设计器也可以像本地应用一样完美运行（目前仅支持本地运行，后续会支持部署到服务器）。

她支持：

1. 拖拽栅格化布局
2. 主题自定义（包括单个组件和全局组件）
3. 静态数据、API接口数据

# 主要技术栈

- React:^17.0.2
- Mobx:^6.7.0
- typescript:^4.4.4

详细依赖请查看package.json

# 如何运行

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
http://localhost:3000/list
```

5. 打包项目

```shell
yarn build
```

# 效果

![image.png](https://s2.loli.net/2023/06/24/EYPFl8QaxZb2GsC.png)

视频演示：https://v.douyin.com/y8g6VV3/

# 结语

如果觉得本项目不错，欢迎star

