import {number, text, boolean} from '@storybook/addon-knobs/vue';
import Component from '../index';

// README
export { default as README } from '../README.md';

// chapter title
export const chapter = 'ct-coupon';

// case
export const cases = {
    'ct-coupon': function() {
        return {
            components: {
                [Component.name]: Component
            },
            data() {
                return {
                    mock: {
                        load: boolean('load', true),
                        schemeId: number('schemeId', 123),
                        couponType: number('couponType', 1),
                        couponAmount: number('couponAmount', 200),
                        discount: number('discount', 3),
                        schemeName: text('schemeName', '美妆超级狂欢300-30'),
                        usageRule: text('usageRule', '满1299元使用'),
                        validity: text('validity', '06.01-07.20'),
                        buttonText: text('buttonText', '立即领券'),
                        failMsg: text('failMsg', '')
                    }
                };
            },
            template: `
            <ct-coupon v-bind="mock"></ct-coupon>
            `,
            methods: {
            }
        };
    }
};
