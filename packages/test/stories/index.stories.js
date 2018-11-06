import Component from '../index';
import {select} from '@storybook/addon-knobs';

// README
export { default as README } from '../README.md';

// chapter title
export const chapter = 'ct-test';

// case
export const cases = {
    'ct-test': function() {
        let cls = select('cls', {
            red: 'red',
            blue: 'blue'
        }, 'red');

        return {
            components: {
                [Component.name]: Component
            },
            template: `
            <ct-test name="challenget" cls="${cls}"></ct-test>
            `,
            methods: {
            }
        };
    }
};
