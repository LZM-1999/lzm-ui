import { setP, setUnit, markLineData } from 'lzm-ui/src/utils/spc/chartsTools.js';
//配置option项
export const setColor = (colorsData) => {
    return colorsData
}
export const setTitle = (titleData, fontSize = 14) => {
    return {
        text: titleData,
        left: 'center',
        top: 0,
        textStyle: {
            fontSize
        }
    }
}
export const setLegend = (resData, seriesParamName, fontSize = 14) => {
    let legend = {//存储所有配置的legend配置项
        data: [],
        selected: {},
    }
    resData.forEach((data_Item, data_index) => {
        legend.data.push(data_Item[0][seriesParamName])
        legend.selected[data_Item[0][seriesParamName]] = data_Item[0].axisShow
    })
    return {
        type: 'scroll',
        bottom: 46,
        textStyle: {
            fontSize
        },
        data: legend.data,
        selected: legend.selected
    }
}
export const setXAxis = (isMultiAxis_X, resData, colors, Y_Units, seriesParamName) => {
    let MultiAxis_X = []//存储所有配置的X轴配置项
    let MultiAxisX_PO = []//存储多X轴的PO
    resData.forEach((data_Item, data_index) => {
        if (data_index < resData.length) {
            MultiAxisX_PO.push({//初始化Y轴的PO
                position: '',
                pIndex: '',
                offset: ''
            })
            MultiAxis_X.push(//配置每个Y轴的数据结构
                {
                    show:data_Item[0].axisShow,
                    type: 'category',
                    name: data_Item[0][seriesParamName],
                    position: `${setP(MultiAxisX_PO, data_index, 'X',MultiAxis_X).position}`,
                    data: data_Item.map(item => item.time),
                    axisLine: {
                        onZero: false,
                        show: true,
                        lineStyle: {
                            color: colors[data_index]
                        }
                    },
                    offset: MultiAxisX_PO[data_index].offset,
                    axisLabel: {
                        show: true,
                        formatter: `{value} ${setUnit(Y_Units, data_Item[0])}`
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisPointer: {
                        show:data_Item[0].axisShow
                    },
                    nameLocation: 'start',
                    nameGap: 25
                },
            )
        }
    })
    return isMultiAxis_X ? MultiAxis_X : { //若单轴，则显示一个
        type: 'category',
        data: MultiAxis_X[0].data,
        axisLine: {
            onZero: false,
            show: true,
        },
        axisLabel: {
            show: true,
        },
        axisTick: {
            alignWithLabel: true
        },
        axisPointer: {},
        nameLocation: 'start',
        nameGap: 25
    }
}
export const setYAxis = (isMultiAxis_Y, resData, colors, Y_Units, seriesParamName) => {
    let MultiAxis_Y = []//存储所有配置的Y轴配置项
    let MultiAxisY_PO = []//存储多Y轴的PO
    resData.forEach((data_Item, data_index) => {
        if (data_index < resData.length) {
            MultiAxisY_PO.push({//初始化Y轴的PO
                position: '',
                pIndex: '',
                offset: ''
            })
            MultiAxis_Y.push(//配置每个Y轴的数据结构
                {
                    show:data_Item[0].axisShow,
                    type: 'value',
                    name: data_Item[0][seriesParamName],
                    position: `${setP(MultiAxisY_PO, data_index, 'Y',MultiAxis_Y).position}`,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[data_index]
                        }
                    },
                    offset: MultiAxisY_PO[data_index].offset,
                    axisLabel: {
                        show: true,
                        formatter: `{value} ${setUnit(Y_Units, data_Item[0])}`
                    },
                    silent: true,
                    minInterval: 1,
                    axisPointer: {},
                    nameLocation: 'start',
                    nameGap: 20
                },
            )
        }
    })
    return isMultiAxis_Y ? MultiAxis_Y :  {
        "type": "value",
        "position": "left",
        "axisLine": {
            "show": true,
        },
        "axisLabel": {
            "show": true,
            "formatter": "{value} "
        },
        "axisPointer": {
            "show": true
        },
        "nameLocation": "start",
        "show": true,
        "nameGap": 20
    }
}
export const setSeries = (isMultiAxis_X, isMultiAxis_Y, resData, seriesParamName) => {
    const chartSeries = [] //存储所有配置的series配置项
    let upData = '', lowData = '', clData = ''
    resData.forEach((data_Item, data_index) => {
        // 初始series数据项
        chartSeries.push(
            {
                type: 'line',
                name: data_Item[0][seriesParamName],
                yAxisIndex: isMultiAxis_Y ? data_index : undefined,
                xAxisIndex: isMultiAxis_X ? data_index : undefined,
                data: [],
            },
        )
        data_Item.forEach((item, index) => {
            var { value, median, time, manufacturer, standardSpeed, weight, up, low, cl, deviceType, loginName } = item
            upData = up
            lowData = low
            clData = cl
            //配置series项目
            chartSeries[data_index].data.push((value !==undefined && value !==null) ? value : median)
        })
    })
    return [
        ...chartSeries,
        {
            type: 'line',
            markLine: {
                silent: true,
                precision: 6,
                data: markLineData(upData, lowData, clData)// 配置上限,下限,CL
            }
        }
    ]
}
export const setTooltip = (resData) => {
    let tooltipInfo = []//存储所有配置的tooltip配置项
    resData.forEach((data_Item, data_index) => {
        data_Item.forEach((item, index) => {
            const { value, median, time, manufacturer, standardSpeed, weight, up, low, cl, deviceType, loginName } = item
            //配置tip数据
            let tip = ''
            if (deviceType) tip = '炉型: ' + deviceType;
            if (deviceType && loginName) tip += `<br/> 操作员: ${loginName}`
            tooltipInfo.push(tip)
        })
    })
    return {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        formatter: params => {
            const n = params[0].name
            const series = params.map(item => {
                return `${item.marker}${item.seriesName}: ${item.value}<br/>`
            }).join('')
            let tip2 = ''
            if (tooltipInfo) {
                const i = params[0].dataIndex
                tip2 = tooltipInfo[i] || ''
            }
            return `时间: ${n}<br/>${tip2 ? tip2 + '<br/>' : tip2}参数名：<br/>${series}`
        }
    }
}
export const setDataZoom = (dataZoom_X, dataZoom_Y, isMultiAxis_X, isMultiAxis_Y, colors) => {
    let dataZoom = { //配置多轴下的dataZoom
        xAxisIndex: [],
        yAxisIndex: [],
    }
    dataZoom_X.forEach((item) => {
        // 配置dataZoom
        dataZoom.xAxisIndex.push(item)
    })
    dataZoom_Y.forEach((item) => {
        // 配置dataZoom
        dataZoom.yAxisIndex.push(item)
    })
    return [
        {
            type: 'slider',
            show: true,
            start: 0,
            end: 100,
            handleStyle: (dataZoom.xAxisIndex.length == 1 && isMultiAxis_X) ? {color:colors[dataZoom.xAxisIndex[0]]}  : {},
            xAxisIndex: isMultiAxis_X ? dataZoom.xAxisIndex : 0
        },
        {
            type: 'slider',
            show: true,
            left: '0.5%',
            showDetail: false,
            start: 0,
            end: 100,
            handleStyle: (dataZoom.yAxisIndex.length == 1 && isMultiAxis_Y) ? {color:colors[dataZoom.yAxisIndex[0]]} : {},
            yAxisIndex: isMultiAxis_Y ? dataZoom.yAxisIndex : 0,
        }
    ]
}
export const setGrid = (data, isMultiAxis_X, isMultiAxis_Y) => {
    //配置grid
    let len = data.filter(item=>item[0].axisShow).length
    let top = 0
    let right = 0
    let left = 0
    //多X轴时
    if(isMultiAxis_X){
        top=(len <= 10 && len > 0) ? len*3 - ((data.length-len)*1.4*1.4) : 5 //固定算法
    }else{
        top=10 //固定值
    }
    //多Y轴时
    if(isMultiAxis_Y){
        right=(len <= 10 && len > 1) ? len*2.3 :  5 //固定算法
    }else{
        right=5 //固定值
    }
    //当第一个轴隐藏时，平衡上、左测的空间
    if(data[0][0].axisShow){
        left = 5
    }else{
        left = 7.6
        top=top+5
    }
    return {
        bottom: '15%',
        left:`${left}%`,
        top:`${top}%`,
        right:`${right}%`,
        containLabel: true
    }
}


