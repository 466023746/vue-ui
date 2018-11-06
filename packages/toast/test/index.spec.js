import Component from '../src';
import {shallowMount} from '@vue/test-utils';

describe('ct-toast', () => {
    it('正确渲染', (done) => {
        const msg = 'this is a toast';
        const wrapper = shallowMount(Component, {});

        wrapper.vm.show(msg);
        setTimeout(() => {
            expect(wrapper.find('.toast').text()).toBe(msg);
            done();
        }, 10);
    });
});
