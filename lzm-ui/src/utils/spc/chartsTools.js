//设置data数据的axisShow属性，用于关联legend栏状态和在其他地方方便知道当前legend状态；
export const setDataAxisShow = (data) => {
    return data.map(items=>{//初始时赋true，后续赋值用传入的新值
        return items.map(item=>{
            item.axisShow = (item.axisShow === undefined || item.axisShow === '' || item.axisShow === null) ? true : item.axisShow
            return item
        })
    })
}
//根据legend栏状态，控制data的axisShow属性值
export const getLegendToSetNewData = (param,resData,seriesParamName) => {
    let { selected }= param
    return resData.map((item)=>{
        return item.map((item2)=>{
            return {
                ...item2,
                axisShow:selected[item2[seriesParamName]]
            }
        })
    })
}
//设置多轴下的PO
export const setP = (t_MultiAxis_PO = [], Index, axisType = 'Y',MultiAxisData) => {//设置多轴下的position
    let falseNum = MultiAxisData.filter(item=>item.show===false).length//记录该轴之前有几条轴线是false不显示的
    let isFalse_firstAixs= Index > 0 ? MultiAxisData[0].show===false : false //记录第一个轴的显隐状态
    if (Index > 0) {//第二条线开始
        t_MultiAxis_PO[Index].position = axisType == 'Y' ? 'right' : 'top'
        t_MultiAxis_PO[Index].pIndex = Index - (isFalse_firstAixs ? 0 : 1) //当第一个轴没隐藏时，减去第一个轴，当第一个轴被隐藏时，不减去第一个轴
        if (axisType == 'Y') {
            t_MultiAxis_PO[Index].offset = (t_MultiAxis_PO[Index].pIndex-falseNum) * 65
        } else {
            t_MultiAxis_PO[Index].offset = (t_MultiAxis_PO[Index].pIndex-falseNum + 0.5) * 35
        }
    } else {
        t_MultiAxis_PO[Index].position = axisType == 'Y' ? 'left' : 'bottom'
        t_MultiAxis_PO[Index].pIndex = 0
        t_MultiAxis_PO[Index].offset = 0
    }
    return t_MultiAxis_PO[Index]
}
// 设置轴单位
export const setUnit = (t_Units = [], setUnitObj = {}, setUnitName = undefined) => {//t_Units:参数源；setUnitObj:读取单位的对象；setUnitName：对象中要读取的具体参数名；
    if (!t_Units || t_Units.length < 0 || JSON.stringify(setUnitObj) === '{}' || !setUnitName) return ''
    let res = t_Units.filter(item => {
        return item.name == setUnitObj[setUnitName]
    })[0]
    return res.value || ''
}
//设置图表上下限、cl箭头
export const markLineData = (min, max, cl) => {
    const arr = [
        {
            yAxis: min,
            label: { formatter: `${min} (下限)` },
            name: '(下限)',
            lineStyle: { color: 'rgb(255, 0, 0)', type: 'solid' }
        },
        {
            yAxis: max,
            label: { formatter: `${max} (上限)` },
            name: '(上限)',
            lineStyle: { color: 'rgb(255, 0, 0)', type: 'solid' }
        },
        {
            yAxis: cl,
            label: { formatter: `${cl} (CL)` },
            name: '(CL)',
            lineStyle: { color: 'rgb(255, 0, 0)', type: 'solid' }
        },
    ].filter(item => typeof item.yAxis === 'number')
    return arr
}
//获取伸缩栏下拉框数据
export const getDataZoomMap = (data,seriesParamName) => {
    return data.map((item, index) =>{
        return {
            name:item[0][seriesParamName],
            index:index,
            state:item[0].axisShow
        }
    }).filter(item=>item.state)
}
//伸缩栏下拉框保留legend中存在的项
export const filterDataZoomMap = (dataZoomMapData,dataZoomData,isMultiAxis)=>{
    if( !isMultiAxis){return []}
    if(dataZoomData){
        let values = []
        dataZoomMapData.forEach((item,index)=>{
            dataZoomData.forEach(item2 => {
                if(item2 === item.index ){
                    values.push(item2)
                }
            });
        })
        return values
    }else{
        // return dataZoomMapData.map(item=>item.index)
        return []
    }
}