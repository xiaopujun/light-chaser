import fs from 'fs';
import path from 'path';
import React from 'react';

// 定义组件文件名命名规则
const COMPONENT_FILE_PATTERN = /^([A-Z][a-z]+)+\.(jsx?|tsx?)$/;

// 读取目标文件夹，找到所有组件文件
const componentFiles = fs.readdirSync('/src/designer/header').filter((filename) => COMPONENT_FILE_PATTERN.test(filename));


// 将文件路径和组件映射关系存储在对象中
const componentMap: any = {};
componentFiles.forEach((filename) => {
    const componentName = path.basename(filename, path.extname(filename));
    const componentPath = `./${filename}`;
    const component = require(componentPath).default;
    componentMap[componentName] = component;
});

// 帮助函数：根据路径动态加载组件
export function loadComponent(componentPath: string) {
    const componentName = path.basename(componentPath, path.extname(componentPath));
    const component = componentMap[componentName];
    return component;
}

// 在 React 组件中使用帮助函数加载组件
// function MyComponent(props) {
//     const {componentPath} = props;
//     const Component = loadComponent(componentPath);
//     return <Component/>;
// }
