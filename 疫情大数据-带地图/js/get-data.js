let dataCache

function getData() {
    $.ajax({
        url: 'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
        type: 'get',
        dataType: 'jsonp',  // 请求方式为jsonp
        crossDomain: true,
        success: function (data) {
            dataCache = data
            $("#econNum").html(data.data.econNum)
            $("#addecon-new").html(data.data.add_daily.addecon_new)

            $("#sustotal").html(data.data.sustotal)
            $("#wjw-addsus-new").html(data.data.add_daily.wjw_addsus_new)

            $("#jwsrNum").html(data.data.jwsrNum)
            $("#addjwsr").html(data.data.add_daily.addjwsr)

            $("#gntotal").html(data.data.gntotal)
            $("#addcon-new").html(data.data.add_daily.addcon_new)

            $("#curetotal").html(data.data.curetotal)
            $("#addcure-new").html(data.data.add_daily.addcure_new)

            $("#deathtotal").html(data.data.deathtotal)
            $("#adddeath-new").html(data.data.add_daily.adddeath_new)

            $("#mtime").html(data.data.mtime)

            cutMap(0)
        },
        data: {}
    })
}

function cutMap(index) {
    let dataMap = []
    for (let i = 0; i < dataCache.data.list.length; i++) {
        let o = dataCache.data.list[i]
        let dataItem = {
            name: o.name,
            value: o.value,
            econNum: o.econNum,
            itemStyle: {
                normal: {
                    areaColor: ""
                }
            }
        }
        let v
        if (index == 1) {
            v = o.value
        } else {
            v = o.econNum
        }
        if (v < 1) {
            dataItem.itemStyle.normal.areaColor = "#fff"
        } else if (v < 10) {
            dataItem.itemStyle.normal.areaColor = "#FFAA85"
        } else if (v < 100) {
            dataItem.itemStyle.normal.areaColor = "#FF7B69"
        } else if (v < 1000) {
            dataItem.itemStyle.normal.areaColor = "#CC2929"
        } else if (v < 10000) {
            dataItem.itemStyle.normal.areaColor = "#8C0D0D"
        } else if (v < 100000) {
            dataItem.itemStyle.normal.areaColor = "#660208"
        }
        dataMap[i] = dataItem
    }

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
    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('container'));
    //使用制定的配置项和数据显示图表
    myChart.setOption(option);
}

function getNews() {
    $.get("http://api.tianapi.com/txapi/ncov/index?key=8117b7b3b2e1ffacc3445653b7bb670d", function (data, status) {
        let $news = $("#softeem-news-timeline")
        $news.html("")
        for (let i = 0; i < data.newslist[0].news.length; i++) {
            let newsItem = data.newslist[0].news[i]
            let $li = $('<li class="layui-timeline-item"><i class="layui-icon layui-timeline-axis"></i><div class="layui-timeline-content layui-text"></div></li>')
            $li.children("div").append('<h3 class="layui-timeline-title">' + dateFormat("YYYY-mm-dd HH:MM", new Date(newsItem.pubDate)) + '</h3>')
            $li.children("div").append('<div class="news-item"><a href="' + newsItem.sourceUrl + '" target="_blank">'+ newsItem.title + '</a></div>')
            $news.append($li)
        }
    });
}

function getRumor() {
    $.get("http://api.tianapi.com/txapi/rumour/index?key=8117b7b3b2e1ffacc3445653b7bb670d", function (data, status) {
        let $rumor = $("#softeem-rumor-text-content")
        $rumor.html("")
        for (let i = 0; i < data.newslist.length; i++) {
            let rumorItem = data.newslist[i]
            let content = '<div class="softeem-rumor-content">' +
                '<div class="softeem-rumor-' + (rumorItem.markstyle == 'true' ? 'true' : 'false') + '">' + rumorItem.explain + '</div>' +
                '<div class="softeem-rumor-outer">' +
                '<div class="softeem-rumor-title">' + rumorItem.title + '</div>' +
                '<div class="softeem-rumor-date">' + rumorItem.date + '</div>' +
                '<div class="softeem-rumor-desc">' + rumorItem.desc + '</div>' +
                '</div>' +
                '<img class="softeem-rumor-imgsrc" src="' + rumorItem.imgsrc + '">' +
                '</div>'
            $rumor.append($(content))
        }
    });
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
    }
    ;
    return fmt;
}