import minxSpcLineChart from "lzm-ui/src/components/minxSpcLineChart.vue";
// import mixinsSpc from 'lzm-ui/src/utils/mixins/mixinsSpc';

let MyPlugin={
    install : function (Vue, options) {
        // 1. 添加全局方法或 property
        // Vue.myGlobalMethod = function () {
        //     console.log('myGlobalMethod');
        // }
        // 2. 添加全局资源
        // Vue.directive('myDirective', {
        //     bind(el, binding, vnode, oldVnode) {
        //         console.log('myDirective');
        //     }
        // })
        // 3. 注入组件选项
        // Vue.mixin(mixinsSpc)
        // 4. 添加实例方法
        // Vue.prototype.$myMethod = function (methodOptions) {
        //     // 逻辑...
        //     console.log('$myMethod');
        // }
        // 4. 注册全局组件
        Vue.component('SpcLineChart', minxSpcLineChart)
    }
}

export default MyPlugin