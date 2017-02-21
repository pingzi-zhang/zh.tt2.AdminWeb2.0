/**
 * Created by 11 on 2016/12/6.
 */
$(function () { 
    InitModel();
     //给收支加颜色
    //请求数据
    function InitModel() {
        var strActionName = "Fin_PlatTotel";
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
            	$("#loadImg").css("display","block");
            },
            success: function (objResult, textStatus) {
				if(objResult.Result == 1){
					 //将消费码传入input中
	               /* $(".search-number").attr("value", consume);*/
	
	                var Model = objResult.Model;
	                //创建表单,渲染页面
	                var $p = $(".money>ul>li>p");
	                $p.eq(0).html("￥" + Model.Income.toFixed(2));
	                $p.eq(1).html("￥" + Model.Extract.toFixed(2));
	                $p.eq(2).html("￥" + Model.Future.toFixed(2));
	                $p.eq(3).html("￥" + Model.Balance.toFixed(2));
	                $p.eq(4).html("￥" + Model.Pay.toFixed(2));
				}else{
					alert(objResult.Message);
				}
               
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                /*alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);*/
            }
        });
    }
    var pageIndex = 0;
    var pageSize = 10;
    var maxentries; //总条目数
    //获取记录总数
    var arrActionParam = {
        "Status":-99,
		"StartDate":"1990-01-01",
		"EndDate":"1990-01-01"
        "Skip":pageIndex*pageSize,
        "Take":pageSize
    };
    var strActionName = "Fin_GetCashPage";
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
        	maxentries = objResult.Totel;
        }
    })
    $(function () {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries: 10,//连续分页主体部分分页条目数
            current_page: pageIndex,//当前页索引
            num_edge_entries: 1//两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
        	InitList(index);
        }
        function InitList(pageIndex) {
            var arrActionParam = {
                "MerchantID": userMess.MerchantID,
                "Skip":pageIndex*pageSize,
			    "Take":pageSize
            };
            var strActionName = "Fin_GetMerFlowingPage";
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
                    /*console.log(objResult.Result);*/
                    var lists = objResult.List;
					if(objResult.Result == 1){
                        if(lists.length > 0){
                            //页面列表的渲染功能
                            //转换成日期时间
                            for(var i = 0; i < lists.length;i++){
                                var temp = lists[i].Create;
                                var dat = new Date(parseInt(temp.substring(6,temp.length-2)));
                                lists[i].Create = dat.getFullYear()+"/"+parseInt(dat.getMonth() + 1)+"/"+dat.getDate()+" "+dat.getHours()+":"+dat.getSeconds();
                            	//判断收支+-
                            	if(lists[i].Direction == "支"){
                            		lists[i].Amount = - lists[i].Amount;
                            	}
                            }
                            var html = template("template", {items: lists});
                            $(".table tbody").html(html);
                            //$("footer>p>span").html(objResult.Totel);

                            localStorage.setItem("Total",lists.length);
                            $(".page>p>span").html(lists.length);

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
                    /*alert(XMLHttpRequest.status);
                     alert(XMLHttpRequest.readyState);
                     alert(textStatus);*/
                }
            });
        }
    })
});