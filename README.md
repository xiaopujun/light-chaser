# LIGHT CHASER

[中文](README_ZH.md)

# Introduction

Light Chaser (LC) is a data visualization designer for large screens based on the React ecosystem. With simple
drag-and-drop functionality, you can create beautiful and visually appealing data dashboards and screens.

It features the following characteristics:

- High performance: By combining the strengths of React, Mobx, and LC's design principles, it minimizes unnecessary
  component rendering, ensuring optimal performance. Even in scenarios with hundreds of complex components, LC maintains
  smooth rendering.
- High extensibility: LC provides a unified interface, allowing integration with any React ecosystem component in
  theory. This allows for unlimited expansion of LC's component library.
- High customizability: Leveraging the unified interface design, developers can fully customize the configuration
  options for their own implemented components. You can use LC's default configuration components or develop your own
  entirely.
- Front-end and back-end separation: This project is 100% separated into front-end and back-end. Even without a backend
  service, the LC designer can run perfectly like a local application (currently only supports local running, with
  server deployment support planned for the future).

It supports:

1. Drag-and-drop grid layout
2. Custom themes (for individual components and globally)
3. Static data and API interface data

# Main Technology Stack

- React: ^17.0.2
- Mobx: ^6.7.0
- Typescript: ^4.4.4

Please refer to package.json for detailed dependencies.

# How to Run

1. Clone the project to your local machine:

```shell
git clone https://gitee.com/xiaopujun/light-chaser.git
```

2. Install project dependencies:

```shell
yarn install
```

3. Start the project:

```shell
yarn start
```

4. Access the project:

```shell
http://localhost:3000/list
```

5. Build the project:

```shell
yarn build
```

# Demo

![image.png](https://s2.loli.net/2023/06/24/EYPFl8QaxZb2GsC.png)

Video demonstration: https://v.douyin.com/y8g6VV3/

# Conclusion

If you find this project helpful, feel free to give it a star.