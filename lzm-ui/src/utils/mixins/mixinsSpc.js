import * as setOptionFunc from 'lzm-ui/src/utils/spc/chartsSetOption.js';
import * as chartstools from 'lzm-ui/src/utils/spc/chartsTools.js';

export default {
    name:'mixinsSpc',
    props: {
        mxinSpcChartTitle:{
            type: String,
            default:''
        },
        mxinSpcSeriesParamName:{//控制接口中根据哪个字段名进行配置数据
            type: String,
            require:true,
            default:''
        } ,

    },
    data() { return {
            mxinSpcOptions: {
                //echarts选项配置
                color: [],title: [],toolbox: [],legend: [],xAxis: [],yAxis: [],series: [],tooltip: [],dataZoom: [],grid: [],
                //其他配置
                dataZoomMap: [],
                isSpotAddEventClick: false, // 是否添加点击事件
                setTool: {
                    dataZoom_X: '',dataZoom_Y: '',
                    isMultiAxis_X: true,//设置chart组件Tool栏的‘单X轴’开关组件的状态
                    isMultiAxis_Y: true,//设置chart组件Tool栏的‘单Y轴’开关组件的状态
                }
            },
            //图表的单位数据源
            mxinSpcYUnits: [
                { name: '长晶速度',value: 'm/s'},{name: '温度',value: '℃'},{name: '重量',value: 'kg'},
            ],
            //图表的颜色数据源
            mxinSpcColors: ['rgba(100, 149, 237,1)', 'rgba(205, 102, 0,1)', 'rgba(205, 38, 38,1)', 'rgba(60, 179, 113,1)', 'rgba(54, 205, 85,1)', 'rgba(150, 202, 119,1)', 'rgba(25, 205, 103,1)', 'rgba(119, 204, 39,1)', 'rgba(0, 0, 0,1)', 'rgba(221, 210, 0,1)'],
            mxinSpcResData: [],//将接口数据保存，进行变量提升供应多处使用
            mxinSpcTitle:''
        }
    },
    watch: {
        mxinSpcOptions: {
            deep: true,
            handler() {
                this.setOption(this.mxinSpcOptions)
                this.isAddEventClick(this.mxinSpcOptions.isSpotAddEventClick)
            }
        },
        resData: {
            deep: true,
            handler() {
                this.mxinSpcResData=this.resData
                this.mixnSetChartData(this.mxinSpcResData, this.mxinSpcOptions, this.mxinSpcYUnits, this.mxinSpcColors, this.mxinSpcSeriesParamName,this.mxinSpcChartTitle)
            }
        }
    },
    methods: {
        mxinSpc_onLegendSelectchanged(param) {//点击-Legend栏（设置Legend与Y轴X轴的联动显示）
            this.mxinSpcResData = chartstools.getLegendToSetNewData(param,this.mxinSpcResData,this.mxinSpcSeriesParamName, this.mxinSpcChartTitle)
            this.mixnSetChartData(this.mxinSpcResData, this.mxinSpcOptions, this.mxinSpcYUnits, this.mxinSpcColors, this.mxinSpcSeriesParamName, this.mxinSpcChartTitle)
        },
        mxinSpc_onHandleTool(){//所有的工具栏操作都只要重新调用一次加载方法
            this.mixnSetChartData(this.mxinSpcResData, this.mxinSpcOptions, this.mxinSpcYUnits, this.mxinSpcColors, this.mxinSpcSeriesParamName)
        },
        // 初始加载图表
        mixnSetChartData(data, options, Y_Units = [], colors = [], seriesParamName,chartTitle) {
            //重置数据的axisShow属性值
            chartstools.setDataAxisShow(data) 
            //配置setTool
            options.dataZoomMap = chartstools.getDataZoomMap( data, seriesParamName )//设置chart组件Tool栏的‘配置*轴伸缩栏’的下拉框数据
            options.setTool.dataZoom_X = chartstools.filterDataZoomMap( options.dataZoomMap, options.setTool.dataZoom_X, options.setTool.isMultiAxis_X )
            options.setTool.dataZoom_Y = chartstools.filterDataZoomMap( options.dataZoomMap, options.setTool.dataZoom_Y, options.setTool.isMultiAxis_Y )
            //echarts选项配置
            options.color = setOptionFunc.setColor(colors)
            options.title = setOptionFunc.setTitle(chartTitle)
            options.legend = setOptionFunc.setLegend(data, seriesParamName)
            options.xAxis = setOptionFunc.setXAxis(options.setTool.isMultiAxis_X, data, colors, Y_Units, seriesParamName)
            options.yAxis = setOptionFunc.setYAxis(options.setTool.isMultiAxis_Y, data, colors, Y_Units, seriesParamName)
            options.series = setOptionFunc.setSeries(options.setTool.isMultiAxis_X, options.setTool.isMultiAxis_Y, data, seriesParamName)
            options.tooltip = setOptionFunc.setTooltip(data, seriesParamName)
            options.dataZoom = setOptionFunc.setDataZoom(options.setTool.dataZoom_X, options.setTool.dataZoom_Y,options.setTool.isMultiAxis_X,options.setTool.isMultiAxis_Y, colors)
            options.grid = setOptionFunc.setGrid(data,options.setTool.isMultiAxis_X,options.setTool.isMultiAxis_Y)
            //其他配置
            options.isSpotAddEventClick = false //设置chart组件是否开启图点的点击事件
        },
    }
}