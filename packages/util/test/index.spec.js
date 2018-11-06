import _ from '..';

describe('ct-util', () => {
    describe('versionCompare', () => {
        it('正确返回结果', () => {
            expect(_.versionCompare('2.23.3')).toBe(false);
            expect(_.versionCompare('2.23.3', 2)).toBe(false);
            expect(_.versionCompare('1.1', '1.2')).toBe(-1);
            expect(_.versionCompare('1.1', '1.1')).toBe(0);
            expect(_.versionCompare('1.2', '1.1')).toBe(1);
            expect(_.versionCompare('2.23.3', '2.22.3')).toBe(1);
        });
    });

    describe('isKaolaApp', () => {
       it('正确返回结果', () => {
           let originUa = window.navigator.userAgent;
           expect(_.isKaolaApp()).toBe(false);

           setUserAgent(window, originUa + 'kaolaApp');
           expect(_.isKaolaApp()).toBe(true);
           setUserAgent(window, originUa);

           setUserAgent(window, originUa + 'kaolaAppSpring');
           expect(_.isKaolaApp()).toBe(true);
           setUserAgent(window, originUa);
       });
    });

    describe('isGteKaolaVer', () => {
        it('正确返回结果', () => {
            expect(_.isGteKaolaVer('3.4.1')).toBe(0);
        });
    });

    describe('exec', () => {
       it('正确处理逻辑判断', () => {
           let callback = jest.fn();
           _.exec({callback});
           expect(callback.mock.calls[0][0]).toBe(-1);

           callback = jest.fn();
           _.exec({callback, method: 'some method'});
           expect(callback.mock.calls[0][0]).toBe(0);

           callback = jest.fn();
           let invoke = jest.fn();
           window.WeixinJSBridge = {invoke};
           _.exec({callback, method: 'some method'});
           expect(callback.mock.calls[0][0]).toBe(1);
           expect(invoke.mock.calls.length).toBe(1);
           window.WeixinJSBridge = undefined;
       });
    });
});

function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent!= userAgent) {
        var userAgentProp = { get: function () { return userAgent; } };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}
