# ct-toast

消息提示组件

<!-- STORY -->

## Usage

```bash
npm i @kaola-kol/ct-toast
```

```js
// main.js

import ctToast from '@kaola-kol/ct-toast';
Vue.use(ctToast);

// some-component.vue

<script>
export default {
    created() {
        this.$toast.show("this is a toast");
    }
}
</script>
```

## Methods

### toast

- 参数
    * `{String|Object} message` 消息或消息对象
        - `type`：error，info，warning，success，默认为info
        - `title`：信息标题，默认为空
        - `message`：toast的内容
        - `duration`：信息停留时间，-1为无限，默认2秒
        - `singleMsg`：是否允许同时显示多条消息，true为同时只允许显示一条消息，默认值为false
        - `isNativeToast`：是否调用native的toast方法，boolean值，默认为true
        - `nativeToastInteractive`：是否允许后面界面交互，boolean值，默认为false
        - `h5Interactive`：(H5 toast)是否允许后面界面交互，boolean值，默认为false
        - `useHTMLMessage`：toast的内容使用HTML文本，boolean值，默认为undefined
- 返回值
    * `{Function}` 不等待定时器，删除掉此提醒
- 用法

```js
this.$toast.toast("this is a toast");

this.$toast.toast({
    message: "this is a toast"
});
```

### show

与toast的区别是，会清理所有消息，用于唯一的消息提醒

- 参数
    * `{String|Object} message` 消息或消息对象
- 返回值
    * `{Function}` 不等待定时器，删除掉此提醒
- 用法

```js
this.$toast.show("this is a toast");
```

end of README
