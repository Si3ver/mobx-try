# MobX

[中文文档](https://cn.mobx.js.org/)
[babel@7.9](https://babeljs.io/docs/en/usage)

+ 响应式

## MobX 常用 API

**1. 可观察的数据 observable**


+ `observable`、`@observable`
+ `observable.box`、`isArrayLike`

**2. 对可观察数据做出反应**

+ `computed` 组合多个可观察数据
+ `autorun` 可观察数据的依赖数据修改后，自动执行内部代码
+ `when` 带条件判断的 autorun, 并且条件判断参数必须是可观察数据
+ `reaction` 分离可观察数据声明，以副作用的方式对autorun进行了补充

**3. 修改可观察数据**

+ `action` 便于复用
+ `runInAction` 命令式地运行一个 action

## mobx-react

+ `observer` 装饰 React 组件
