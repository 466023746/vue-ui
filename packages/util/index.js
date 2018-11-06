let _ = {};

_.versionCompare = function(left, right) {
    if (typeof left + typeof right !== 'stringstring') {
        return false;
    }

    let a = left.split('.'),
        b = right.split('.'),
        i = 0,
        len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }

    return 0;
};

_.isKaolaApp = function() {
    let UA = window.navigator.userAgent,
        reg = /kaolaApp/,
        regSp = /kaolaAppSpring/;
    return reg.test(UA) || regSp.test(UA);
};

_.isGteKaolaVer = (function() {
    let isApp, curVer, isLowerVer = false;
    if (_.isKaolaApp()) {
        let UA = window.navigator.userAgent;
        let index = UA.indexOf('kaolaApp/');
        let spIndex = UA.indexOf('kaolaAppSpring/');
        isApp = true;
        if (index < 0 && spIndex < 0) {
            isLowerVer = true;
        } else {
            if (index >= 0) {
                curVer = UA.slice(index + 9);
            } else {
                curVer = UA.slice(spIndex + 15);
            }
            curVer = curVer.match(/\d+\.\d+\.\d+/m)[0];
        }
    } else {
        isApp = false;
    }
    return function(testVer) {
        let res = _.versionCompare(curVer, `${testVer}`);
        return isApp ? isLowerVer ? -1 : (res === 1 || res === 0) ? 1 : -1 : 0;
    };
}());

_.exec = function(_option) {
    let method = _option.method,
        args = _option.args || {},
        callback = _option.callback || function() {},
        nativeSucCb = _option.nativeSucCb || function() {},
        nativeErrCb = _option.nativeErrCb || function() {};
    if (!method) {
        callback(-1);
        return;
    }
    if (window.WeixinJSBridge) {
        /*eslint-disable*/
        WeixinJSBridge.invoke(method, args, nativeSucCb, nativeErrCb);
        /*eslint-enable*/
        callback(1);
    } else {
        callback(0);
    }
};

export default _;
