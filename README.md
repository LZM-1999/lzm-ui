
# lzm-ui使用说明
## 什么是lzm-ui？
 - zm-ui是基于echarts、elment-UI、Vue集成的组件库~
 - 封装了大部分应用场景的图表基础功能（axis、dataZoom、legend等图表功能的联动等），Api丰富、拓展性强、应用场景较全面、使用简单~
 - 具有工具栏式可控图表能力~
 - 欢迎使用和提供您的宝贵意见~

## 安装及引用
### 安装：
```powershell
	//在项目目录下打开终端，输入以下命令进行安装：
	npm install lzm-ui 
```
### 引用：
```javascript
	//项目的入口文件main.js中:
	import Vue from 'vue'
	import lzmUI from 'lzm-ui'
	Vue.use(lzmUI)
```


## 快速使用
### CODE：
```html
	<!--
	resData:type: Array (
		*说明：图表数据源；
		*数据源格式规范：
		[//所有数据
			[//线
		        {//点
		            "value": 144,
		            "time": "2022-08-21",
		            "manufacturer": "欧晶1"
		        },
		        {//点
		            "value": 244,
		            "time": "2022-12-31",
		            "manufacturer": "欧晶1"
		        }
		        ...
			]
     	]
    )
    mxinSpcChartTitle：type: String (图表数据源)；
    mxinSpcSeriesParamName：type: String (数值项依赖名(如上resData中：'manufacturer'))
    
	-->
	<SpcLineChart :resData="" :mxinSpcChartTitle="" :mxinSpcSeriesParamName=""/>
```
### 用例效果：
![用例效果](https://img-blog.csdnimg.cn/9474a66f49ee4a72b547f9d41f3a21e6.png)
