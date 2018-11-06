<template>
  <div class="ct-scrollload" :class="{'ct-scrollload__self': !isWindow}" ref="scrollload">
    <slot v-if="!fail"></slot>
    <div class="ct-scrollload__loading" v-if="hasMore" ref="loading">
        <p class="ct-scrollload__loading-image"><b class="ct-scrollload__loading-line"></b></p>
    </div>
    <div class="ct-scrollload__fail" v-else-if="fail" @click="retry">{{failText}}</div>
    <div class="ct-scrollload__no-more" v-else-if="showHasMore && !hasMore">到最底了，别拉啦~</div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

const props = {
    // 是否正在加载
    loading: Boolean,
    // 是否加载失败
    fail: Boolean,
    // 加载失败文字
    failText: {
        type: String,
        default: '加载失败，点击重新加载'
    },
    // 是否还有更多数据
    hasMore: Boolean,
    // 全部加载完后，是否显示到底提示
    showHasMore: {
        type: Boolean,
        default: true
    },
    // 提前加载距离
    preLoadDist: {
        type: Number,
        default: 300
    },
    // 滚动函数的触发是否在window，默认为true，当为false时滚动函数在该组件自身触发（需要保证该组件有滚动条）
    isWindow: {
        type: Boolean,
        default: true
    }
};

export default {
    name: 'ct-scrollload',
    props,
    created() {
        this.scrollFunc = debounce(this.scrollFunc.bind(this), 100);

        this.$nextTick(() => {
            this.getScrollParent().addEventListener('scroll', this.scrollFunc);
        });

        this.getData();
    },
    methods: {
        getData() {
            this.$emit('getData');
        },
        retry() {
            this.getData();
        },
        scrollFunc() {
            let {loading, fail, hasMore} = this;

            if (!loading && !fail && hasMore && this.shouldLoadByDist()) {
                this.getData();
            }
        },
        shouldLoadByDist() {
            let preLoadDist = (parseFloat(this.preLoadDist) || 0);
            let loadingNode = this.$refs.loading;
            if (!loadingNode) {
                return false;
            }

            let winHeight = (document.documentElement || document.body).clientHeight;
            let loadingRect = loadingNode.getBoundingClientRect();
            let scrollloadRect = this.$refs.scrollload.getBoundingClientRect();

            // 如果是该组件自身触发，需要减掉距下的误差
            let distanceDiff = this.isWindow ? 0 : winHeight - scrollloadRect.bottom;

            let isBottom = loadingRect.top < winHeight + preLoadDist - distanceDiff;

            return isBottom;
        },
        getScrollParent() {
            return this.isWindow ? window : this.$el;
        }
    },
    beforeDestroy() {
        this.$el.removeEventListener('scroll', this.scrollFunc);
    }
};
</script>

<style lang="scss">
    .ct-scrollload {
        height: 100%;
        
        &.ct-scrollload__self {
            overflow: auto;
        }

        .share {
            height: 40px;
            line-height: 40px;
            text-align: center;
        }

        &__loading {
            @extend .share;
        }

        &__loading-image {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 23px;
            height: 23px;
            background-image: url('https://haitao.nos.netease.com/cd38149e-b70a-483b-b25f-31b071433fc6_34_20.png');
            background-size: 17px 10px;
            background-position: center center;
            background-repeat: no-repeat;
        }

        &__loading-line {
            position: absolute;
            top: 0;
            left: 0;
            background-position: center center;
            background-repeat: no-repeat;
            animation: ct-loading-rotate 1.2s linear infinite;
            width: 23px;
            height: 23px;
            background-image: url('https://haitao.nos.netease.com/d1dc6845-cf0b-4c44-a8cb-bea22025b73a_46_46.png');
            background-size: 23px 23px;
        }

        &__fail {
            @extend .share;
            cursor: pointer;
        }

        &__no-more {
            @extend .share;
        }
    }

    @keyframes ct-loading-rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>

