## QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

* ### 目前还是试水阶段, 虽然源码中有许多组件, 但是没有都按目前的规范进行调整, 所以目前不建议使用示例外的组件
* ### 目前组件的规范可以运行示例项目中QS组件须知页面查看
* ### 若是你有什么问题或者有更好的方式可以与作者联系, 因为后续的组件都会以确定的规范去调整, 所以早一点确定好后面就少改一些

## 使用步骤

## Step 1:
* ### 从插件市场将QS-UI导入至hbx

## Step 2:
* ### 将QS-UI文件夹下的QS-UI-CONFIG文件夹复制至项目`@/`根目录下, 该操作为必须, 因QS-UI将许多的配置依赖都内聚在QS-UI-CONFIG

## Step 3:
* ### main.js
```javascript
//main.js
import QSUI from '@/uni_modules/QS-UI/index.js';
Vue.use(QSUI);
```

## QS-UI-CONFIG 配置说明

```
|-- QS-UI-CONFIG
    |-- components	//各组件特有配置
    |-- config
    |   |-- $qs.js	//自定义拓展uni.$qs下的属性或方法, 若属性名同内置名称则会被内置属性覆盖
    |   |-- apis.js	//接口管理, 看自己需求可以不用, 但是统一方便管理
    |   |-- index.js	//核心配置文件
    |   |-- navigate.js	//路由配置
    |   |-- Pages.js	//页面信息配置
    |   |-- QSDebounceKeys.js	//防抖配置
    |   |-- request.js	//请求接口配置
    |   |-- values.js	//各种值配置, 方便冲突时更改名称或者配置自己喜欢的名字
    |   |-- lang	//多语言配置
    |       |-- index.js
    |       |-- langChange.js	//语言变更时回调
    |       |-- languages.js
    |       |-- modules	//语言包
    |           |-- en.js
    |           |-- zh_CN.js
    |-- css	//css配置
    |   |-- theme.js	//主题颜色配置, 将会导出赋值在vuex中
    |   |-- theme.scss	//本身是都写在这里面的后来发现app v3 不支持scss导出, 所以都放在theme.js 中, 目前该文件里是hover样式
    |-- js	//js配置
        |-- pageDemand.js	//分页js配置
    |-- index.js	//将配置项统一导出

```
