# ct-util

底层公共方法库

<!-- STORY -->

## Usage

```bash
npm i @kaola-kol/ct-util
```

```js
// some-component.vue

<script>
import ctUtil from '@kaola-kol/ct-util';

export default {
    created() {
        if (ctUtil.isGteKaolaVer(2.3) === 1) {

        }
    }
}
</script>
```

## Methods

### versionCompare

比较两个版本号大小

- 参数
    * `{String} left` 版本号1
    * `{String} right` 版本号2
- 返回值
    * `{Number|Boolean}`
        - 若left和right不是String，则返回false
        - 若left > right，则返回1
        - 若left = right，则返回0
        - 若left < right，则返回-1
- 用法

```js
ctUtil.versionCompare('1.1', '1.2') // -1
ctUtil.versionCompare('1.1', '1.1') //  0
ctUtil.versionCompare('1.2', '1.1') //  1
ctUtil.versionCompare('2.23.3', '2.22.3') // 1
```

### isKaolaApp

是否在kaola app内

- 返回值
    * `{Boolean}`
- 用法

```js
ctUtil.isKaolaApp()
```

### isGteKaolaVer

判断app版本是否大于等于某个版本

- 参数
    * `{String} version` 版本号
- 返回值
    * `{Number}`
        - 若不在app内，返回0
        - 若满足条件，则返回1
        - 否则返回-1
- 用法

```js
ctUtil.isGteKaolaVer('1.1')
```

### exec

通过jsBridge调用native方法

- 参数
    * `{String} method` 调用的Native方法名称
    * `{Object} args` 调用的Native方法的参数
    * `{Function} callback` exec回调，参数flag=1调用成功，0调用失败
    * `{Function} nativeSucCb` native成功回调
    * `{Function} nativeErrCb` native失败回调
- 用法

```js
ctUtil.exec({
   method: 'toast',
   args: {
       message: "this is a native toast"
   }
});
```

end of README
