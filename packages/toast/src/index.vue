<template>
    <div :class="['ct-toast', !h5Interactive ? '' : 'f-noevents']" v-show="!isHide"
         @touchmove="this.preventMove($event)">
        <table border=0 cellpadding=0 cellspacing=0 width=100% height=100%>
            <tr>
                <td width=100% align=center :valign="valign||'center'">
                    <transition name="toast">
                        <template v-for="msg in messages">
                            <div v-if="msg.useHTMLMessage"
                                 :class="['toast', 'box', msg.type, msg.toastClass||'']"
                                 v-html="msg.message"
                                 :key="msg.message"></div>
                            <div v-else
                                 :class="['toast', 'box', msg.type, msg.toastClass||'']"
                                 :key="msg.message">
                                {{msg.message}}
                            </div>
                        </template>
                    </transition>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import _ from '@kaola-kol/ct-util';

export default {
    name: 'ct-toast',
    data() {
        return {
            messages: [],
            isHide: true,
            valign: 'center',
            duration: 2000,
            singleMsg: false,
            isNativeToast: true,
            nativeToastInteractive: true,
            h5Interactive: true
        };
    },
    created() {
        // 证明不是内嵌组件
        if (this.$root === this) {
            this.$nextTick(() => {
                document.body.appendChild(this.$el);
            });
        }
    },
    methods: {
        preventMove(evt) {
            evt.preventDefault();
        },
        /**
         * 增加一个提醒，添加到队伍前方
         * @param  {String|Object} message 消息或消息对象
         *      -type: error, info ,warning, success, 默认为info
         *      -title: 信息标题，默认为空
         *      -message: toast的内容
         *      -duration: 信息停留时间，-1 为无限. 默认2秒
         *      -singleMsg: 是否允许同时显示多条消息， true为同时只允许显示一条消息，默认值为false
         *      -isNativeToast: 是否调用native的toast方法，boolean值，默认为true
         *      -nativeToastInteractive: 是否允许后面界面交互，boolean值，默认为false
         *      -h5Interactive: (H5 toast)是否允许后面界面交互，boolean值，默认为false
         *      -useHTMLMessage: toast的内容使用HTML文本 ，boolean值，默认为undefined
         * @return {Function}              不等待定时器，删除掉此提醒
         */
        toast(message) {
            if (typeof message === 'string') {
                message = {
                    message
                };
            }
            Object.assign(message, {
                type: 'info',
                duration: this.duration,
                singleMsg: this.singleMsg,
                h5Interactive: this.h5Interactive
            });
            if (
                message.singleMsg &&
                (!this.isHide || this.messages.length > 0)
            ) {
                return;
            }
            this.isHide = false;
            this.h5Interactive = message.h5Interactive;
            this.valign = message.valign || 'center';

            setTimeout(
                () => {
                    this.messages.unshift(message);
                },
                10
            );
            let clearFn = this.clear.bind(this, message);
            setTimeout(
                clearFn,
                Number(message.duration) === -1 ? 2000 : message.duration
            );
            return clearFn;
        },
        /**
         * 与notify一致，但是会清理所有消息，用于唯一的消息提醒
         * @param  {String|Object} message 消息或消息对象
         * @return {Function}              不等待定时器，删除掉此提醒
         */
        show(message) {
            //app2.3的版本调用native的toast方法
            if (_.isGteKaolaVer(2.3) === 1) {
                if (message && !!message.isNativeToast) {
                    Object.assign(message, {
                        nativeToastInteractive: this.nativeToastInteractive
                    });
                    _.exec({
                        method: 'toast',
                        args: {
                            message: message.message,
                            duration: (message.duration || 2000) / 1000,
                            interactive: message.nativeToastInteractive
                        }
                    });
                    return;
                }
            }
            if (message && !message.singleMsg) {
                this.clearTotal();
            }
            return this.toast(message);
        },
        /**
         * 与notify一致，但是会清理所有消息，用于唯一的消息提醒
         * @param  {String|Object} message 消息或消息对象
         * @return {Function}              不等待定时器，删除掉此提醒
         */
        showError(message, options) {
            options = Object.assign(options || {}, {
                type: 'error'
            });
            return this.show(message, options);
        },
        clear(message) {
            let messages = this.messages,
                len = messages.length;

            for (; len--;) {
                if (message === messages[len]) {
                    messages[len].toastClass = 'toastFadeOut';
                    this.__clearIndex = len;
                }
            }
            setTimeout(
                () => {
                    this.messages.splice(this.__clearIndex, 1);
                    this.isHide = true; //动画触发，动画时间为 5秒
                    this.__clearIndex = undefined;
                },
                500
            );
        },
        clearTotal() {
            this.messages = [];
        }
    }
};
</script>

<style lang="scss">
    .ct-toast {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10001;
        top: 0;
        left: 0;
        bottom: 0;

        .box {
            background-color: #333;
            text-align: center;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
        }

        @-webkit-keyframes toastFadeIn{
            0%{
                opacity:0;
            }
            75%{
                opacity:1;
            }
        }
        @keyframes toastFadeIn{
            0%{
                opacity:0;
            }
            75%{
                opacity:1;
            }
        }

        .toast {
            background: rgba(0, 0, 0, .7);
            opacity: 1;
            min-width: 120px;
            border-radius: 7px;
            color: #fff;
            font-size: 15px;
            padding: 13px 13px;
            margin: 0 20px;
            display: inline-block;

            &-enter-active {
                -webkit-animation-name:toastFadeIn;
                animation-name:toastFadeIn;
                animation-duration: .2s;
            }
        }

        &.f-noevents {
            pointer-events: none;
        }
    }
</style>
