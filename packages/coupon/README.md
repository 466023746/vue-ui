# ct-coupon

优惠券组件

<!-- STORY -->

## Usage

```bash
npm i @kaola-kol/ct-coupon
```

```js
// main.js

import ctCoupon from '@kaola-kol/ct-coupon';
Vue.use(ctCoupon);

// some-component.vue

<template>
<ct-coupon></ct-coupon>
</template>
```

## Properties

| name | required | type | default | description |
| ---- | -------- | ---- | ------- | ----------- |
| load | false | boolean | false | 是否已加载数据，未加载时显示占位图 |
| schemeId | false | number | - | 优惠券id |
| couponAmount | false | string | - | 优惠金额 |
| discount | false | number | - | 折扣 |
| couponType | false | number | - | 优惠类型 |
| schemeName | false | string | - | 优惠名称 |
| usageRule | false | string | - | 使用规则 |
| validity | false | string | - | 有效期 |
| buttonText | false | string | - | 按钮文案 |
| failMsg | false | string | - | 异常信息 |

end of README
