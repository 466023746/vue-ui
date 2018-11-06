# ct-scrollload

滚动加载组件

<!-- STORY -->

## Usage

该组件为滚动加载组件，当组件滚动到底部，需要加载更多数据的时候，会触发getData事件，该事件没有参数。

> 该组件使用了scss编写css，在你项目中需要装sass解析依赖:
> `npm install sass-loader --save-dev`
> `npm install node-sass --save-dev`

```js
  // main.js
  import ctScrollload from '@kaola-kol/ct-scrollload';

  Vue.use(ctScrollload);

  new Vue({
    render: h => h(App)
  }).$mount('#app');
```

```html
<template>
    <ct-scrolload 
    :loading="loading" 
    :fail="fail" 
    :hasMore="hasMore"
    @getData="getData">
        <ul>
            <li v-for="(item,i) in list" :key="i">{{item}}</li>
        </ul>
    </ct-scrolload>
<template>

<script>
  export default {
    data () {
      return {
        loading: true,
        fail: false,
        hasMore: true,
        list: [1, 2, 3, 4]
      };
    },
    methods: {
        getData() {
            // 当组件滚动到底端时，触发该函数，加载数据
            // this.list.push(5, 6, 7, 8)...
        }
    }
  }
</script>
```
> 需要注意的是，该组件的滚动函数默认绑定在window，因此需要保证该整体窗口有滚动条。
> 如果想让该组件自身滚动时加载数据，则需要设置isWinodw属性为false，同时需要在组件外层添加一个限定高度的元素，使得scrolload可以滚动，代码如下：

```html
<template>
    <!-- 限制父元素的高度 -->
    <div style="height: 300px;">
        <ct-scrolload 
        :loading="loading" 
        :fail="fail" 
        :hasMore="hasMore"
        :isWindow="false"
        @getData="getData">
            <ul>
                <li v-for="(item,i) in list" :key="i">{{item}}</li>
            </ul>
        </ct-scrolload>
    </div>
<template>

<script>
  import ctScrollload from '@kaola-kol/ct-scrollload';
  export default {
    components: {
      ctScrollload,
    },
    data () {
      return {
        loading: true,
        fail: false,
        hasMore: true,
        list: [1, 2, 3, 4]
      };
    },
    methods: {
        getData() {
            // 当组件滚动到底端时，触发该函数，加载数据
            // this.list.push(5, 6, 7, 8)...
        }
    }
  }
</script>
```

## Properties

| name | required | type | default | description |
| ---- | -------- | ---- | ------- | ----------- |
| loading | true | boolean | - | 是否正在加载 |
| fail | true | boolean | - | 是否加载失败 |
| hasMore | true | boolean | - | 是否还有更多数据 |
| failText | false | text | '加载失败，点击重新加载' | 加载错误后展示的文案 |
| showHasMore | false | boolean | true | 是否显示'到最底了，别拉啦~'的提示文案 |
| preLoadDist | false | number | 300 | 提前加载距离 |
| isWindow | false | boolean | true | 滚动函数的触发是否在window，默认为true，当为false时滚动函数在该组件自身触发（需要保证该组件有滚动条） |

## Event

| 事件名称 | 回调参数 | 说明 |
| ---------- | --------- | ------------- |
| getData | 无 | 滚动到底部，需要加载更多数据时，会触发getData事件 |

end of README