[中文](README_ZH.md)

<h2 align="middle"> LIGHT CHASER</h2>

<p align="middle">
    <img alt="" src="https://img.shields.io/badge/version-v0.0.3-blue">
    <img alt="" src="https://img.shields.io/badge/language-typescript-blue">
    <img alt="" src="https://img.shields.io/badge/license-MIT-08CE5D?logoColor=08CE5D">
    <img alt="" src="https://img.shields.io/badge/framework-React-61daeb?logoColor=08CE5D">
</p>

<p align="middle">LIGHT CHASER IS A DRAG-AND-DROP WEB DATA VISUALIZATION DESIGNER</p>
<p align="middle">
    <a href="https://xiaopujun.github.io/light-chaser-app/#/" target="_blank">Demo</a> 
    / 
    <a href="https://www.bilibili.com/video/BV1v8411z78f/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac" target="_blank">Video</a>
</p>

# 1. Introduction

Light Chaser (LC) is a data visualization designer for large screens based on the React ecosystem. With simple
drag-and-drop functionality, it allows users to generate beautiful and visually appealing data dashboards and boards.

It has the following features:

- High Performance: By combining the features of React, Mobx, and LC's own design philosophy, efforts have been made to
  avoid unnecessary rendering of components. This ensures that LC maintains a good overall performance even in scenarios
  with hundreds of complex components, achieving smooth rendering.
- High Extensibility: LC provides a unified interface, allowing integration with any React ecosystem components in
  theory. This allows for limitless expansion of the component library in LC.
- High Customization: Similar to the dependency on a unified interface, for components implemented by developers
  themselves, the configuration options can be fully customized. You can use the default configuration components
  provided by LC or completely use your own implementation.
- Frontend-Backend Separation: This project is 100% separated between the frontend and backend. Even without a backend
  service, the LC designer can run perfectly like a local application (currently only supports local execution, with
  future support for deployment to servers).
- Quick Theme Switching: LC provides a theme switching feature, allowing you to switch themes globally or at the
  component level. This enables you to quickly switch themes and generate screens with different styles.
- Keyboard Shortcuts: LC provides a rich set of keyboard shortcuts for quick operations, enhancing your work efficiency.
- Drag-and-Drop Grid Layout: LC offers drag-and-drop grid layout functionality, allowing you to quickly complete layouts
  by dragging components, thereby generating large screens efficiently.

# 2. Showcase

![image.png](https://s2.loli.net/2023/08/30/SnIYcomQWxaGyfj.png)

# 3. How to Run

1. Clone the project to your local machine

```shell
git clone https://gitee.com/xiaopujun/light-chaser.git
```

2. Install project dependencies

```shell
yarn install
```

3. Start the project

```shell
yarn start
```

4. Access the project

```shell
http://localhost:3000
```

5. Build the project

```shell
yarn build
```

# 4. How to Use

| Operation/Shortcut | Description |
| --- | --- |
| Double-click on the left component | Add component to canvas |
| Right-click and hold mouse | Drag canvas |
| alt + Scroll wheel | Zoom canvas |
| ctrl + v | Copy component |
| ctrl + l | Lock component |
| ctrl + Up arrow | Bring component to front |
| ctrl + Down arrow | Send component to back |
| delete | Delete component |
| up | Move component up |
| down | Move component down |
| left | Move component left |
| right | Move component right |
| ctrl + shift + up | Enlarge component upward |
| ctrl + shift + down | Enlarge component downward |
| ctrl + shift + left | Enlarge component to the left |
| ctrl + shift + right | Enlarge component to the right |
| ctrl + alt + up | Shrink component upward |
| ctrl + alt + down | Shrink component downward |
| ctrl + alt + left | Shrink component to the left |
| ctrl + alt + right | Shrink component to the right |
| ctrl + z | Undo |
| ctrl + shift + z | Redo |

# 5. Directory Structure

```text
src
├─comps Component List (All draggable components are implemented in this directory)
│  ├─antd Ant Design components implementation
│  ├─common-fragment Common code snippets
│  └─lc Light Chaser built-in components implementation
├─designer Designer
│  ├─canvas Canvas
│  ├─common Common code
│  ├─footer Designer footer
│  ├─header Designer header
│  ├─left Designer left panel
│  ├─operate-provider Designer event operations
│  ├─right Designer right panel
│  ├─store Designer state management
│  ├─structure Designer page framework structure
│  └─view 
├─framework Framework design
│  └─core Automatic component definition scanning
├─icon 
├─lib Custom component library
├─list List page (Home page)
└─utils Utility classes
```

# 6. How to Quickly Integrate Your Own Components

Integrating your own component into LC is incredibly simple. You just need to follow a few steps!

1. Locate the `src/comps` directory and create a new folder for your custom component.
2. Let's assume your custom component's name is: MyComp.
3. Create a new TypeScript file named `MyComp.ts` within this folder. In this file, define a class that inherits
   from `AbstractCustomComponentDefinition` and implement its methods.
4. Create another TypeScript file named `MyCompDefinition.ts` within the same folder. In this file, define a class that
   inherits from `AbstractDesignerComponent` and implement its methods.

That's it! The rest is handled by the automatic scanner, which will scan your components and register them in LC.

For a code example, you can refer to the implementation in `src/comps/antd/pie`.

# 7. Conclusion

If you find this project helpful, please consider giving it a star.
