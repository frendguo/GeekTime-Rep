# toy-React

模拟实现部分 React。主要用于理解 React 原理。

## JSX 解析部分

- 安装 `webpack`、配置 `webpack.config.js`
- 安装 `babel`，修改 `webpack.config.js`
- 安装并使用 `babel` 插件 `@babel/plugin-transform-react-jsx` 用来解析 JSX

## 自定义对象解析

- 通过对 插件 `@babel/plugin-transform-react-jsx` 的解析分析（可以通过写简单的例子或者看[文档](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)，分析出 React 是怎么解析节点元素的。包括：自定义元素（首字母大写）、原生 DOM 元素、嵌套元素、属性

- 根据解析的方式来实现 `toy-react.js`

- `toy-react.js` 主要包含三个类、两个方法：
  - `ElementWrapper`：用于对原生 DOM 元素的封装
  - `TextWrapper`：用于对文本元素的封装
  - `Component`：自定义组件的基础类

  - `createElement()`：创建元素。此名称为 JSX 解析后调用的方法。方法名称由插件 `@babel/plugin-transform-react-jsx` 的 `pragma` 定义。默认值为 React.createElement().

  - `domRender()`：用于将元素渲染到父节点上去。和 `ReactDOM.render()` 等效。

## 实现 this.setState()

- 分析 `this.setState()` 的主要功能点：
  - 修改 `state` 的值（对象合并）
  - 重新渲染

