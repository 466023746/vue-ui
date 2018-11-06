<template>
    <div data-cell="coupon">
        <section class="ct-coupon j-uneditable" contenteditable="false" data-type="coupon" :data-id="schemeId">
            <div class="ct-coupon__default" v-if="!loadInner">
                <img class="ct-coupon__default-img" src="//haitao.nos.netease.com/77b41f55-e1c9-40a4-8bab-1c34bf8f9922_350_108.png" alt="">
            </div>

            <div class="ct-coupon__fail" v-if="failMsgInner">{{failMsgInner}}</div>

            <i class="ct-font icn-guanbi icn-guanbi--editor j-editor-remove"></i>

            <div class="ct-coupon__load" v-if="loadInner">
                <i class="ct-coupon__left-circle"></i>
                <i class="ct-coupon__right-circle"></i>

                <main class="ct-coupon__main">
                    <div class="ct-coupon__main-left">
                        <div class="ct-coupon__price" v-if="couponAmountShow">
                            <em class="ct-coupon__price-unit">¥</em>{{couponAmountInner}}
                        </div>
                        <div class="ct-coupon__discount" v-else>
                            {{discountInner}}<em class="ct-coupon__discount-unit">折</em>
                        </div>
                        <div class="ct-coupon__rule" v-if="usageRuleInner" :title="usageRuleInner">{{usageRuleInner}}</div>
                    </div>

                    <div class="ct-coupon__main-right">
                        <div class="ct-coupon__name" :title="schemeNameInner">{{schemeNameInner}}</div>
                        <div class="ct-coupon__btn-area">
                            <button class="ct-coupon__btn">{{buttonTextInner}}</button>
                        </div>
                    </div>
                </main>

                <footer class="ct-coupon__footer">
                    {{validityInner}}
                </footer>
            </div>
        </section>
    </div>
</template>

<script>
import '@kaola-kol/ct-iconfont';

function isUndefined(obj) {
    return obj === undefined;
}

function generateComputed(props, obj) {
    let result = {};

    for (let key in props) {
        result[`${key}Inner`] = function() {
            if (!isUndefined(this[`${key}Own`])) {
                return this[`${key}Own`];
            }
            return this[`${key}`];
        };
    }

    Object.assign(result, obj);

    return result;
}

const props = {
    // 是否已经加载
    load: Boolean,
    // 优惠券id
    schemeId: Number,
    // 优惠金额
    couponAmount: Number,
    // 折扣
    discount: Number,
    // 优惠类型
    couponType: Number,
    // 名称
    schemeName: String,
    // 使用规则
    usageRule: String,
    // 有效期
    validity: String,
    // 按钮文案
    buttonText: String,
    // 异常
    failMsg: String
};

export default {
    name: 'ct-coupon',
    props,
    data() {
        let obj = {};

        for (let key in this.$props) {
            obj[`${key}Own`] = undefined;
        }

        return obj;
    },
    computed: generateComputed(props, {
        couponAmountShow() {
            return [1, 2, 3].indexOf(this.couponTypeInner) > -1;
        }
    }),
    methods: {
        getPostData() {
            let tmp = {
                cellType: 7,
                tag: 'section',
                resourceType: 'coupon',
                couponCell: {
                    schemeId: this.schemeId
                }
            };
            return tmp;
        },
        updateData(obj = {}) {
            for (let key in obj) {
                this[`${key}Own`] = obj[key];
            }
        }
    }
};
</script>

<style lang="scss">
    .ct-coupon {
        position: relative;
        line-height: 1.5;

        &:hover {

            .icn-guanbi {
                display: block;
            }
        }

        &__default {
            line-height: 0;
        }

        &__default-img {
            width: 100%;
        }

        &__load {
            height: 108px;
            box-sizing: border-box;
            padding: 10px 15px 0;
            background: linear-gradient(-90deg, #ff0000, #ff3163);
            border-radius: 4px;
        }

        .circle-share {
            position: absolute;
            width: 9px;
            height: 18px;
            top: 35.5px;
            background: #fff;
        }

        &__left-circle {
            @extend .circle-share;
            left: 0;
            border-top-right-radius: 100% 50%;
            border-bottom-right-radius: 100% 50%;
        }

        &__right-circle {
            @extend .circle-share;
            right: 0;
            border-top-left-radius: 100% 50%;
            border-bottom-left-radius: 100% 50%;
        }

        .icn-guanbi {
            display: none;
        }

        &__fail {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .6);
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 15px 30px;
            font-size: 14px;
            color: #fff;
            line-height: 1.5;
        }

        &__main {
            display: flex;
            height: 69px;
            background: #fff;
            border-radius: 4px;
        }

        &__main-left {
            box-sizing: border-box;
            flex-shrink: 0;
            width: 106px;
            margin: 5px 0;
            padding: 0 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right: 1px dashed #ccc;
        }

        .price-share {
            font-size: 28px;
            font-weight: bold;
            color: #ff0000;
            line-height: 1;
            white-space: nowrap;
        }

        .unit-share {
            font-size: 18px;
            font-style: normal;
        }

        &__price {
            @extend .price-share;
        }

        &__price-unit {
            @extend .unit-share;
            margin-right: 2px;
        }

        &__discount {
            @extend .price-share;
        }

        &__discount-unit {
            @extend .unit-share;
            margin-left: 2px;
        }

        &__rule {
            max-width: 100%;
            margin-top: 3px;
            font-size: 12px;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            word-break: break-all;
            text-overflow: ellipsis;
        }

        &__main-right {
            padding: 0 12px;
            flex-grow: 1;
            display: flex;
            align-items: center;
        }

        &__name {
            flex-grow: 1;
            margin-right: 10px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #666;
            line-height: 20px;
            text-align: left;
        }

        &__btn-area {
            flex-shrink: 0;
        }

        &__btn {
            width: 80px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: linear-gradient(-90deg, #ff0000, #ff3163);
            border: 0;
            outline: 0;
            border-radius: 15px;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.14);
            font-size: 14px;
            color: #fff;
            cursor: pointer;
        }

        &__footer {
            margin-top: 9px;
            font-size: 12px;
            color: #fff;
            text-align: left;
            line-height: 1;
        }
    }
</style>

