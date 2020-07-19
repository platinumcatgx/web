var dataCache; // 用于缓存请求的数据 
/**
 * 页面加载需要获取 外部接口数据
 */
function initData() {
    // jquery发送ajax请求
    $.ajax({
        type: 'get',
        url: NEWS_MAP,
        dataType: 'jsonp',  // 这个请求是跨域请求 （文件不在当前项目
        crossDomain: true,
        success: function (responseData) {
            //alert(responseData.data);
            // 将数据获取 并放在 页面标签上
            dataCache = responseData.data;
            //现有确诊
            $("#econNum").html(dataCache.econNum);
            $("#addecon-new").html(dataCache.add_daily.addecon_new);
            //现有疑似
            $("#sustotal").html(dataCache.sustotal);
            $("#wjw-addsus-new").html(dataCache.add_daily.wjw_addsus_new);
            //境外输入
            $("#jwsrNum").html(dataCache.jwsrNum);
            $("#addjwsr").html(dataCache.add_daily.addjwsr);
            //累计确诊
            $("#gntotal").html(dataCache.gntotal);
            $("#addcon_new").html(dataCache.add_daily.addcon_new);
            //累计治愈
            $("#curetotal").html(dataCache.curetotal);
            $("#addcure_new").html(dataCache.add_daily.addcure_new);
            //累计死亡
            $("#deathtotal").html(dataCache.deathtotal);
            $("#adddeath_new").html(dataCache.add_daily.adddeath_new);

            $("#mtime").html(dataCache.mtime);

            //调用地图
            cutMap(0);
        }
    });

}

/**
 * @param {Object} intde
 * 根据dataCache 封装地图参数
 */
function cutMap(index) {
    // 定义一个用于存储地图数据的参数
    // 地图的省份名称name  value  疫情数量
    var dataMap = [];
    for (var i = 0; i < dataCache.list.length; i++) {
        //1 、 定义每个省的 省份、累计确诊，现有确诊人数
        var o = dataCache.list[i];
        //2、 定义js的自定义对象 ，它的属性是自己定义的
        var obj = {
            name: o.name,
            value: o.value,  // 累计确诊
            econNum: o.econNum,
            itemStyle: {
                normal: {
                    areaColor: "" // 地图颜色
                }
            }
        }
        // alert(obj.name+"----"+obj.value+"---"+obj.econNum);
        //3、 根据数量显示地图板块的颜色
        //根据index下标 判断是确认人数的地图，还是累计人数的地图
        var v = 0; // 地图板块的数量
        if (index == 1) {  //累计确诊
            v = o.value;
        } else if (index == 0) {
            v = o.econNum; //现有确诊
        }
        //设置版块颜色
        if (v < 1) {
            obj.itemStyle.normal.areaColor = "#fff";
        } else if (v >= 1 && v <= 9) {
            obj.itemStyle.normal.areaColor = "#FFF4EF";
        } else if (v >= 10 && v <= 99) {
            obj.itemStyle.normal.areaColor = "#FFE6DA";
        } else if (v >= 100 && v <= 499) {
            obj.itemStyle.normal.areaColor = "#FDB19B";
        } else if (v >= 500 && v <= 999) {
            obj.itemStyle.normal.areaColor = "#E7856D";
        } else if (v >= 1000 && v <= 9999) {
            obj.itemStyle.normal.areaColor = "#DE512F";
        } else {
            obj.itemStyle.normal.areaColor = "#660208";
        }

        // 将obj 放入dataMap中
        dataMap[i] = obj;
    }


    // 通过echart插件，初始化地图信息
    var option = initOption(dataMap, index);


    // alert("echarts:"+echarts);
    // 将地图对象放入div容器中
    var myMap = echarts.init(document.getElementById("container"));
    //alert(myMap);
    // 将参数数据 放入myMap中
    myMap.setOption(option);
}


/*谣言鉴别*/
function getRumor() {
    //http://api.tianapi.com/txapi/rumour/index
    $.get(RUMOUR + APIKEY,
        function (responseText) {
            //获取谣言数据
            var newslist = responseText.newslist;
            var str = "";

            for (var i = 0; i < newslist.length; i++) {
                var tr = newslist[i].explain.length > 2 ? "确有" : "谣言"
                str += "<div class=\"softeem-rumor-item\">\n" +
                    "<div class=\"softeem-rumor-content-true\">" + tr + "</div>\n" +
                    "<div class=\"softeem-rumor-out\">\n" +
                    "<div class=\"softeem-runmor-title\">" + newslist[i].title + "</div>\n" +
                    "<div class=\"softeem-runmor-time\">2020-04-16</div>\n" +
                    "<div class=\"softeem-runmor-desc\">" + newslist[i].desc + "</div>\n" +
                    "</div>\n" +
                    "<img class=\"softeem-rumor-img\" src=\"" + newslist[i].imgsrc + "\"/> \n" +
                    "</div>";
            }
            $(".softeem-rumor-content").html(str);
        })
}

function f() {
    // var date = dateFormat("YYYY-mm-dd", new Date())
    $.get(NCOV + APIKEY, function (response) {
        var news = response.newslist[0].news;
        var str = ""
        for (var i = 0; i < news.length; i++) {
            str += "<li class=\"layui-timeline-item\">\n" +
                "<i class=\"layui-icon layui-timeline-axis\">&#xe63f;</i>\n" +
                " <div class=\"layui-timeline-content layui-text\">\n" +
                "  <h3 class=\"layui-timeline-title \">" + news[i].pubDateStr + "</h3>\n" +
                "   <p>\n" + news[i].title + "</p>\n" +
                "   <p>\n" + news[i].summary + "</p>\n" +
                "   <p>\n" + news[i].infoSource + "</p>\n" +
                " </div>\n" +
                "</li>"
        }
        $("#newsData").html(str)
    })
}