import Component from '..';
import { shallowMount } from '@vue/test-utils';

describe('ct-scrollload', () => {

    it('加载中显示loading图', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                loading: true,
                hasMore: true,
            }
        });
        expect(wrapper.find('.ct-scrollload__loading').exists()).toBe(true);
    });

    it('加载失败显示文案，点击重新拉取文案', () => {
        const failText = '加载失败，请点击重新加载';
        const wrapper = shallowMount(Component, {
            propsData: {
                fail: true,
                failText,
            }
        });
        const failDiv = wrapper.find('.ct-scrollload__fail');
        expect(failDiv.exists()).toBe(true);
        expect(failDiv.text()).toBe(failText);

        // 点击重新拉取文案
        failDiv.trigger('click');
        expect(wrapper.emitted().getData.length).toBeGreaterThan(1);
    });

    it('正确显示到底文案', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                hasMore: false,
                showHasMore: true
            }
        });

        // 显示到底文案
        expect(wrapper.find('.ct-scrollload__no-more').exists()).toBe(true);

        // 不显示到底文案
        wrapper.setProps({
            showHasMore: false
        });
        expect(wrapper.find('.ct-scrollload__no-more').exists()).toBe(false);
        wrapper.setProps({
            hasMore: true,
            showHasMore: true
        });
        expect(wrapper.find('.ct-scrollload__no-more').exists()).toBe(false);
    });

    it('正确更新数据', () => {
        const wrapper = shallowMount(Component, {});

        // 创建组件时加载数据
        expect(wrapper.emitted().getData).toBeTruthy();

    });
});