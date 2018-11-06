import Toast from './src';
import Vue from 'vue';

const obj = (function() {
    let toast;
    let invoke = function(funcName, param) {
        if (!toast) {
            toast = new Vue(Toast);
            toast.$mount();
        }
        toast[funcName](param);
    };
    let curryInvoke = function(funcName) {
        return function(param) {
            invoke(funcName, param);
        };
    };

    return {
        toast: curryInvoke('toast'),
        show: curryInvoke('show'),
        showError: curryInvoke('showError'),
        clear: curryInvoke('clear'),
        clearTotal: curryInvoke('clearTotal')
    };
})();

const plugin = {};

plugin.install = (Vue) => {
    Vue.prototype.$toast = obj;
};

export {
    plugin as toast,
    obj as toastObj
};
