import Component from '..';
import {shallowMount} from '@vue/test-utils';

describe('ct-coupon', () => {
    it('未加载时渲染占位图', () => {
        const wrapper = shallowMount(Component, {});
        expect(wrapper.find('.ct-coupon__default').exists()).toBe(true);
    });

    it('已加载数据时正常渲染', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                load: true
            }
        });
        expect(wrapper.find('.ct-coupon__load').exists()).toBe(true);
    });

    it('根据类型判断展示¥还是折', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                load: true,
                couponType: 1
            }
        });
        // 1 2 3价格
        expect(wrapper.find('.ct-coupon__price').exists()).toBe(true);
        wrapper.setProps({couponType: 2});
        expect(wrapper.find('.ct-coupon__price').exists()).toBe(true);
        wrapper.setProps({couponType: 3});
        expect(wrapper.find('.ct-coupon__price').exists()).toBe(true);
        // 4 5 6折
        wrapper.setProps({couponType: 4});
        expect(wrapper.find('.ct-coupon__discount').exists()).toBe(true);
        wrapper.setProps({couponType: 5});
        expect(wrapper.find('.ct-coupon__discount').exists()).toBe(true);
        wrapper.setProps({couponType: 6});
        expect(wrapper.find('.ct-coupon__discount').exists()).toBe(true);
    });

    it('如果有failMsg，则展示异常样式', () => {
        const failMsg = '数据异常';
        const wrapper = shallowMount(Component, {
            propsData: {
                failMsg,
            }
        });
        expect(wrapper.find('.ct-coupon__fail').exists()).toBe(true);
        expect(wrapper.find('.ct-coupon__fail').text()).toBe(failMsg);
    });

    it('正确返回保存数据', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                schemeId: 1,
            }
        });
        expect(wrapper.vm.getPostData().couponCell.schemeId).toBe(1);
    });

    it('正确更新数据', () => {
        const wrapper = shallowMount(Component, {
            propsData: {
                schemeId: 1,
            }
        });
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(undefined);
        expect(wrapper.vm.schemeIdInner).toBe(1);

        wrapper.vm.updateData({schemeId: 2});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(2);
        expect(wrapper.vm.schemeIdInner).toBe(2);

        // falsy值校验
        // 0
        wrapper.vm.updateData({schemeId: 0});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(0);
        expect(wrapper.vm.schemeIdInner).toBe(0);
        // false
        wrapper.vm.updateData({schemeId: false});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(false);
        expect(wrapper.vm.schemeIdInner).toBe(false);
        // ''
        wrapper.vm.updateData({schemeId: ''});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe('');
        expect(wrapper.vm.schemeIdInner).toBe('');
        // null
        wrapper.vm.updateData({schemeId: null});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(null);
        expect(wrapper.vm.schemeIdInner).toBe(null);
        // undefined
        wrapper.vm.updateData({schemeId: undefined});
        expect(wrapper.props().schemeId).toBe(1);
        expect(wrapper.vm.schemeIdOwn).toBe(undefined);
        expect(wrapper.vm.schemeIdInner).toBe(1);
    })
});
