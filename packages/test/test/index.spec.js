import Component from '..';
import { shallowMount } from '@vue/test-utils';

describe('ct-test', () => {
    it('renders component', () => {
        const label = 'ct-test lala';
        const wrapper = shallowMount(Component, {
        })
        expect(wrapper.text()).toBe(label)
    })
});
