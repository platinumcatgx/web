 /**
  * @param {Object} dataMap初始化 地图配置参数
  */
 function initOption(dataMap,index){
  let option = {
        tooltip: {
            formatter: function (params) {
                let info = '<p style="font-size:14px">地区：' + params.name + '</p><p style="font-size:14px">确诊：' + (index == 1 ? params.data.value : params.data.econNum) + '</p>'
                return info;
            },
            backgroundColor: "rgba(0,0,0,.5)",//提示标签背景颜色
            textStyle: {color: "#fff", padding: '0px'} //提示标签字体颜色
        },
        series: [
            {
                name: '中国',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true,//显示省份标签
                    },
                    emphasis: {
                        show: true,//对应的鼠标悬浮效果
                        // textStyle: {color: "#fff"}
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5,//区域边框宽度
                        borderColor: '#009fe8',//区域边框颜色
                        areaColor: "#fff",//区域颜色
                    },
                    emphasis: {
                        borderWidth: .5,
                        borderColor: '#4b0082',
                        areaColor: "#C7FFFD",
                    }
                },
                data: dataMap
            }
        ]
    };
	
	return option;
}