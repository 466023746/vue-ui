import { boolean, text, number} from '@storybook/addon-knobs/vue';
import Component from '../index';
import { action } from '@storybook/addon-actions';

// README
export { default as README } from '../README.md';

// chapter title
export const chapter = 'ct-scrollload';

// case
export const cases = {
    'ct-scrollload': function() {
        return {
            components: {
                [Component.name]: Component
            },
            data() {
                return {
                    mock: {
                        loading: boolean('loading', false),
                        fail: boolean('fail', false),
                        failText: text('failText', '加载失败，点击重新加载'),
                        hasMore: boolean('hasMore', true),
                        showHasMore: boolean('showHasMore', true),
                        preLoadDist: number('preLoadDist', 200),
                        isWindow: boolean('isWindow', true)
                    }
                };
            },
            template: `
            <ct-scrollload v-bind="mock" @getData="getData">
                <ul>
                    <li style="height:100px">1</li>
                    <li style="height:100px">2</li>
                    <li style="height:100px">3</li>
                    <li style="height:100px">1</li>
                    <li style="height:100px">2</li>
                    <li style="height:100px">1</li>
                    <li style="height:100px">2</li>
                    <li style="height:100px">1</li>
                    <li style="height:100px">2</li>
                    <li style="height:100px">1</li>
                    <li style="height:100px">2</li>
                    <li>3</li>
                </ul>
            </ct-scrollload>
            `,
            methods: {
                getData: action('get Data')
            }
        };
    },
    'ct-scrollload-self': function() {
        return {
            components: {
                [Component.name]: Component
            },
            data() {
                return {
                    mock: {
                        loading: boolean('loading', false),
                        fail: boolean('fail', false),
                        failText: text('failText', '加载失败，点击重新加载'),
                        hasMore: boolean('hasMore', true),
                        showHasMore: boolean('showHasMore', true),
                        preLoadDist: number('preLoadDist', 200),
                        isWindow: boolean('isWindow', false)
                    }
                };
            },
            template: `
            <div style="height: 400px;">
                <ct-scrollload v-bind="mock" @getData="getData">
                    <ul>
                        <li style="height:100px">1</li>
                        <li style="height:100px">2</li>
                        <li style="height:100px">3</li>
                        <li style="height:100px">1</li>
                        <li style="height:100px">2</li>
                        <li style="height:100px">1</li>
                        <li style="height:100px">2</li>
                        <li style="height:100px">1</li>
                        <li style="height:100px">2</li>
                        <li style="height:100px">1</li>
                        <li style="height:100px">2</li>
                        <li>3</li>
                    </ul>
                </ct-scrollload>
            </div>
            `,
            methods: {
                getData: action('get Data')
            }
        };
    }
};
