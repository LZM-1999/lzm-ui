<!--
开发者：李忠美
范围：SPC所有模块
Tip:该图表逐渐需配合mixinsSPC文件一起使用
-->
<template>
    <div :style="{'width': '100%','height':chartHeight,'display': 'flex', 'flex-direction': 'column'}">
        <!-- 操作工具栏 -->
        <el-form ref="setTool" :model="mxinSpcOptions.setTool" :inline="true" style="margin: 10px 62px;" v-if="resData.length>0">
            <el-form-item label="配置X轴伸缩栏">
                <el-select v-model="mxinSpcOptions.setTool.dataZoom_X" multiple collapse-tags placeholder="暂无关联的X轴，请选择" @change="mxinSpc_onHandleTool" :disabled="!mxinSpcOptions.setTool.isMultiAxis_X">
                    <el-option v-for="(item, index) in mxinSpcOptions.dataZoomMap" :key="index" :value="item.index"
                        :label="item.name" />
                </el-select>
            </el-form-item>

            <el-form-item label="配置Y轴伸缩栏">
                <el-select v-model="mxinSpcOptions.setTool.dataZoom_Y" multiple collapse-tags placeholder="暂无关联的Y轴，请选择" @change="mxinSpc_onHandleTool" :disabled="!mxinSpcOptions.setTool.isMultiAxis_Y">
                    <el-option v-for="(item, index) in mxinSpcOptions.dataZoomMap" :key="index" :value="item.index"
                        :label="item.name" />
                </el-select>
            </el-form-item>

            <el-form-item label="">
                <el-switch @change="mxinSpc_onHandleTool" v-model="mxinSpcOptions.setTool.isMultiAxis_X" active-text="多X轴"
                    inactive-text="单X轴">
                </el-switch>
            </el-form-item>
            <el-form-item label="">
                <el-switch @change="mxinSpc_onHandleTool" v-model="mxinSpcOptions.setTool.isMultiAxis_Y" active-text="多Y轴"
                    inactive-text="单Y轴">
                </el-switch>
            </el-form-item>
        </el-form>
        <!-- 图表载体实例 -->
        <div ref="chartId" style="width: 100%; height: 100%;" />
    </div>
</template>

<script>
import * as echarts from 'echarts';
import resize from 'lzm-ui/src/utils/mixins/resize.js'
import mixinsSpc from 'lzm-ui/src/utils/mixins/mixinsSpc';

export default {
    name: 'MinxSpcLineChart',
    mixins: [resize,mixinsSpc],
    props: {
        resData: {
            type: Array,
            required: true,
            default:[]
        },
        chartHeight:{
            type: String,
            default () {
                return '700px'
            }
        }
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.initChart()
    },
    beforeDestroy() {
        this.clearResource()
    },
    methods: {
        //初始化
        initChart() {
            this.chart = echarts.init(this.$refs.chartId)//初始化chart
            this.chart.on('legendSelectchanged', params => {//初始化监听legend栏状态事件监听器
                this.mxinSpc_onLegendSelectchanged(params)
            })
        },
        //加载charts
        setOption(option, state = true) {
            this.chart.setOption(option, state)
            console.log(option, 'setOption');
        },
        //判断是否添加点击事件
        isAddEventClick(isAdd){
            if (isAdd){
                this.chart.on('click', event => {
                    this.$emit('chart-click', event)
                })
            }else{
                this.chart.off('click')
            } 
            this.__resizeHandler()
        },
        //清空资源
        clearResource(){
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        }
    }
}
</script>