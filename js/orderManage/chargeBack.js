$(function () {
	window.parent.document.title=document.title;
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    //时间选择控件初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpend",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    var userID=localStorage.userID;
	var arrActionParam = {
        "OrderID":"",
		"Start":"1900-01-01",
		"End":"2017-01-01",
        "Status":-99,
		"Skip":0,
		"Take":9
    };
    console.log(arrActionParam);
    var strActionName="Order_GetPumpCancelOrderPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    // console.log(strRequest);
    var datSubmit = { strRequest: strRequest };
    // console.log(datSubmit);
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
        success: function (objResult,textStatus) {
            //alert(objResult.Result);
            //console.log(objResult);
            var pageIndex = 0;
            var pageSize = 9;
            var maxentries = objResult.Total; //总条目数
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

                //请求数据
                function InitList(PageIndex) {
                    var userID=localStorage.userID;
					var arrActionParam = {
				        "OrderID":"",
						"Start":"1900-01-01",
						"End":"2017-01-01",
				        "Status":-99,
						"Skip":0,
						"Take":9
				    };
				    var strActionName="Order_GetPumpCancelOrderPage";
                    var strActionParam = JSON.stringify(arrActionParam);
                    var strRequest = GetVisitData(strActionName, strActionParam);
                    // console.log(strRequest);
                    var datSubmit = {strRequest: strRequest};
                    // console.log(datSubmit);
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
                            if(objResult.Result == 1){
                                var lists = objResult.List;
                                if(lists.length > 0){
                                    $(".page>p>span").html(objResult.Total);
                                    $(".page").css("display","inline-block");
                                    $(".no-tit").css('display','none');
                                    //渲染页面
                                    var html=template("template",{items:lists});
                                    $(".table tbody").html(html);
                                    $(".table tbody .audit").bind("click",function(){
                                    	var _index = $(this).parent().parent().attr("id");
		                                window.location.href = "ArtificialBackDetail.html?findID="+_index+"";
                                    })
                                }else{
                                    $(".no-tit").css('display','block');
                                    $(".page").css("display","none");
                                }
                            }else{
                                alert(objResult.Message);                     }
                        },
                        complete: function (XMLHttpRequest, textStatus) {
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            // alert(XMLHttpRequest.status);
                            // alert(XMLHttpRequest.readyState);
                            // alert(textStatus);
                        }
                    });
                    
					//查询功能
                    $("#search").click(function () {
                    	$(this).html("正在查询");
                        var status= $(".searchVariety option:selected").text();
					    switch (status){
					            case "全部":
					                Industry="-99";
					                break;
					            case "未提交":
					                Industry="0";
					                break;
					            case "已提交":
					                Industry="1";
					                break;
					            case "已上架":
					                Industry="2";
					                break;
					             case "已下架":
					                Industry="-2";
					                break;
					            case "未通过":
					                Industry="-1";
					                break;
					    }
                        var orderCode= $("#searchCode").val().trim();
                        var name= $(".searchName").val().trim();
                        var start= $("#inpstart").val().trim();
				        var end= $("#inpend").val().trim();
				        if (start=="") {
				            start="1900-01-01"
				            end="1900-01-01"
				        }
                        var arrActionParam = {
                            "OrderID":orderCode,
							"Start":start,
							"End":end,
					        "Status":Industry,
							"Skip":0,
							"Take":9
					    };
					    var strActionName="Order_GetPumpCancelOrderPage";
                        var strActionParam = JSON.stringify(arrActionParam);
                        var strRequest = GetVisitData(strActionName, strActionParam);
                        // console.log(strRequest);
                        var datSubmit = { strRequest: strRequest };
                        // console.log(datSubmit);
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
                            success: function (objResult,textStatus) {
                            	var pageIndex = 0;
					            var pageSize = 9;
					            var maxentries = objResult.Total; //总条目数
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
				                     var arrActionParam = {
			                            "OrderID":orderCode,
										"Start":start,
										"End":end,
								        "Status":Industry,
										"Skip":0,
										"Take":9
								    };
								    var strActionName="Order_GetPumpCancelOrderPage";
			                        console.log("传入后台的参数",arrActionParam);
			                        var strActionParam = JSON.stringify(arrActionParam);
			                        var strRequest = GetVisitData(strActionName, strActionParam);
			                        // console.log(strRequest);
			                        var datSubmit = { strRequest: strRequest };
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
			                            success: function (objResult,textStatus) {
			                            	$("#search").html("查询")
			                            	if(objResult.Result == 1){
				                                var lists = objResult.List;
				                                //console.log(lists);
				                                if(lists.length > 0){
				                                    $(".page>p>span").html(objResult.Total);
				                                    $(".page").css("display","inline-block");
				                                    $(".no-tit").css('display','none');
				                                    //渲染页面
				                                    var html=template("template",{items:lists});
				                                    $(".table tbody").html(html);
				                                }else{
				                                	$("tbody").children().remove();
				                                    $(".no-tit").css('display','block');
				                                    $(".page").css("display","none");
				                                }
				                            }else{
				                                alert(objResult.Message);                    
				                            }
			                            }
					                })
                        		}
				             },
                            complete: function (XMLHttpRequest, textStatus) {
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                            }
                        });
                    })
                    
                }
            })
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
});