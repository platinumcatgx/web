var dataCache; // 用于缓存请求的数据
/**
 * 页面加载需要获取 外部接口数据
 */
function initData(){
    // jquery发送ajax请求
    $.ajax({
        type:'get',
        url:'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
        dataType:'jsonp',  // 这个请求是跨域请求 （文件不在当前项目
        crossDomain:true,
        success:function(responseData){
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

        }
    });

}