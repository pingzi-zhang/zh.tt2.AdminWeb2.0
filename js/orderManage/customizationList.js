$(function () {
	window.parent.document.title=document.title;
    var userID=localStorage.userID;
    var pageIndex = 0;
    var pageSize = 9;
    var maxentries;
	var arrActionParam = {
        "CustID":"",
        "Status":-99,
		"Skip":pageIndex*pageSize,
        "Take":pageSize
    };
    var strActionName="Order_GetCustPage";
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
        timeout: ajaxTimeout,
        beforeSend: function () {
        	$("#no-tit").css("display","none");
        	$("#loadImg").css("display","block");
        },
        success: function (objResult,textStatus) {
            maxentries = objResult.Total; //总条目数
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
                    var arrActionParam = {
                        "CustID":"",
				        "Status":-99,
						"Skip":PageIndex*pageSize,
        				"Take":pageSize
				    };
				    var strActionName="Order_GetCustPage";
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
                        timeout: ajaxTimeout,
                        beforeSend: function () {
                        },
                        success: function (objResult, textStatus) {
                        	$("#loadImg").css("display","none");
                            if(objResult.Result == 1){
                                var lists = objResult.List;
                                if(lists.length > 0){
                                    $(".page>p>span").html(objResult.Total);
                                    $(".page").css("display","inline-block");
                                    $(".no-tit").css('display','none');
                                    //渲染页面
                                    var html=template("template",{items:lists});
                                    $(".table tbody").html(html);
                                    var $tr = $("#table tbody tr");
                                    for (var i = 0; i < $tr.length;i++) {
                                    	if($tr.eq(i).find("td").eq(8).text() == "已处理"){
                                    		$tr.eq(i).find("td").eq(8).next().find(".appoint").html("付款");
                                    	}else if($tr.eq(i).find("td").eq(8).text() == "已付款"){
                                    		$tr.eq(i).find("td").eq(8).next().find(".appoint").remove();
                                    	}
                                    }
                                    $(".table tbody .appoint").bind("click",function(){
                                    	var custID = $(this).parent().parent().attr("id");
                                    	if($(this).text() == "指派"){
                                    		window.location.href = "customizationAppoint.html?custID="+custID+"";
                                    	}else{
                                    		window.location.href = "customizationPay.html?custID="+custID+"";
                                    	}
                                    });
                                    $(".table tbody .audit").bind("click",function(){
                                    	var type=0;
                                    	var custID = $(this).parent().parent().attr("id");
                                    	window.location.href = "customizationLook.html?custID="+custID+"&type="+type+"";
                                    });
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
                             alert(XMLHttpRequest.status);
                             alert(XMLHttpRequest.readyState);
                             alert(textStatus);
                        }
                    });
                    
					//查询功能
                    $("#search").click(function () {
                    	$(this).html("正在查询");
                        var Industry= $(".searchVariety option:selected").text();
                        var status;
                        switch (Industry){
                            case "未提交":
                                status=0;
                                break;
                            case "已提交":
                                status=1;
                                break;
                            case "已上架":
                                status=2;
                                break;
                            case "已下架":
                                status=-2;
                                break;
                            case "未通过":
                            	status=-1;
                                break;
                            default:
                            	status = -99;
                            	break;
                        }
                        var code= $(".searchCode").val().trim();
                        var name= $(".searchName").val().trim();
                        var arrActionParam = {
                            "VarietyID":"08",
                            "MerchantName":code,
                            "ProductName":name,
                            "Status":status,
                            "Skip":pageIndex*pageSize,
                            "Take":pageSize
                        };
                        var strActionName="Product_GetProductPage";
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
			                            "VarietyID":"08",
			                            "MerchantName":code,
			                            "ProductName":name,
			                            "Status":status,
			                            "Skip":index*pageSize,
			                            "Take":pageSize
			                        };
			                        var strActionName="Product_GetProductPage";
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
			                            	if(objResult.Result == 0){
				                                var lists = objResult.List;
				                                //console.log(lists);
				                                if(lists.length > 0){
				                                    $(".page>p>span").html(objResult.Total);
				                                    $(".page").css("display","inline-block");
				                                    $(".no-tit").css('display','none');
				                                    //渲染页面
				                                    var html=template("template",{items:lists});
				                                    $(".table tbody").html(html);
				
				                                    var str1 = [], str2 = [];
				                                    var StatusName = [], ID = [];
				                                    for(var i = 0;i < lists.length;i++ ){
				                                        str1 = lists[i].StatusName;
				                                        str2 = lists[i].ProductID;
				                                        StatusName.push(str1);
				                                        ID.push(str2);
				                                    }
				
				                                    for(var j=0;j<StatusName.length;j++){
				                                        //console.log(StatusName[j]);
				                                        if(StatusName[j] == '已上架'|| StatusName[j] == '已下架'|| StatusName[j] == "未通过"){
				                                            $(".submit").eq(j).css("display","none");
				                                        }else{
				                                            $(".submit").eq(j).css("display","inline-block");
				                                        }
				                                    }
				                                    //查看
				                                    $(".audit").click(function(){
				                                        var Index = $(this).parent().parent().index();
				                                        window.location.href = "productAudit.html?ProductID="+ID[Index]+"&Type=1";
				                                    });
				                                    //审核
				                                    $(".submit").click(function(){
				                                        var Index = $(this).parent().parent().index();
				                                        window.location.href = "productAudit.html?ProductID="+ID[Index]+"&Type=2";
				                                    })
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
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
});