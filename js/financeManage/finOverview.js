/**
 * Created by 11 on 2016/12/6.
 */
$(function () { 
	window.parent.document.title=document.title;
    InitModel();
    //请求数据
    function InitModel() {
    	var arrActionParam = {
    	};
        var strActionName = "Fin_GetPlatTotel";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = {strRequest: strRequest};
        $.ajax({
            url: jsgDataUrl + jsgDataGate,
            type: "POST",
            dataType: "json",
            //cache: true,
            data: datSubmit,
            async: true,
            //timeout: 60000,
            beforeSend: function () {
            	$("#no-tit").css("display","none");
        		$("#loadImg").css("display","block");
            },
            success: function (objResult, textStatus) {
				if(objResult.Result == 1){
	                var Model = objResult.Model;
	                //创建表单,渲染页面
	                var $p = $(".money>ul>li>p");
	                $p.eq(0).html("￥" + Model.Income.toFixed(2));
	                $p.eq(1).html("￥" + Model.Inflow.toFixed(2));
	                $p.eq(2).html("￥" + Model.Outflow.toFixed(2));
	                $p.eq(3).html("￥" + Model.Balance.toFixed(2));
				}else{
					alert(objResult.Message);
				}
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	console.log(XMLHttpRequest);
                /*alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);*/
            }
        });
    }
    var pageIndex = 0;
    var pageSize = 9;
    var maxentries; //总条目数
    //获取记录总数
    var arrActionParam = {
        "Skip":pageIndex*pageSize,
        "Take":pageSize
    };
    var strActionName = "Fin_GetPaltFlowingPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = {strRequest: strRequest};
    $.ajax({
        url: jsgDataUrl + jsgDataGate,
        type: "POST",
        dataType: "json",
        //cache: true,
        data: datSubmit,
        async: false,
        //timeout: 60000,
        beforeSend: function () {
        }, 
        success: function (objResult, textStatus) {
        	maxentries = objResult.Total;
        	console.log("总数",maxentries);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	console.log(XMLHttpRequest);
            //alert(XMLHttpRequest.status);
           // alert(XMLHttpRequest.readyState);
            //alert(textStatus);
        }
    })
    $(function () {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries: 9,//连续分页主体部分分页条目数
            current_page: pageIndex,//当前页索引
            num_edge_entries: 1//两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
        	InitList(index);
        }
        function InitList(pageIndex) {
            var arrActionParam = {
               "Skip":pageIndex*pageSize,
		        "Take":pageSize
		    };
		    var strActionName = "Fin_GetPaltFlowingPage";
            var strActionParam = JSON.stringify(arrActionParam);
            var strRequest = GetVisitData(strActionName, strActionParam);
            var datSubmit = {strRequest: strRequest};
            $.ajax({
                url: jsgDataUrl + jsgDataGate,
                type: "POST",
                dataType: "json",
                //cache: true,
                data: datSubmit,
                async: true,
                //timeout: 60000,
                beforeSend: function () {
                },
                success: function (objResult, textStatus) {
                	$("#loadImg").css("display","none");
                    //console.log(objResult.Result);
                    var lists = objResult.List;
					if(objResult.Result == 1){
                        if(lists.length > 0){
                            //页面列表的渲染功能
                            var html = template("template", {items: lists});
                            $(".table tbody").html(html);

                            localStorage.setItem("Total",lists.length);
                            $(".page>p>span").html(maxentries);

                            $("footer").css("display","block");
                            $(".content").css("display","none");
                        }else{
                            $("footer").css("display","none");
                            $(".content").css("display","block");
                        }
                        var moneyTd = $(".table tr td:nth-of-type(2)");
                        for(var i = 0;i < moneyTd.length;i++){
                        	if(moneyTd.eq(i).html().substring(0,1) == "-"){
                        		moneyTd.eq(i).addClass("outcome");
                        	}else{
                        		moneyTd.eq(i).addClass("income");
                        		moneyTd.eq(i).html("+"+moneyTd.eq(i).html());
                        	}
                        }
					}else{
						alert(objResult.Message)
					}
                },
                complete: function (XMLHttpRequest, textStatus) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                     alert(XMLHttpRequest.readyState);
                     alert(textStatus);
                }
            });
        }
    })
});