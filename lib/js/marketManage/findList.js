$(function () {
	var pageIndex = 0;
    var pageSize = 5;
    var maxentries;
    var arrActionParam = {
        "Title":"",
        "Start":"1900-01-01",
        "End":"1900-01-01",
        "Status":"-99",
        "Skip":pageIndex*pageSize,
        "Take":pageSize
    };
    var strActionName="Market_GetFindbyValuePage";
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
            maxentries=objResult.Total; //总条目数
            $(".page p span").html(maxentries+" ");
            $(function() {
                $(".pagination").pagination(maxentries, {
                    callback: PageCallback,
                    prev_text: '上一页',
                    next_text: '下一页',
                    items_per_page: pageSize,//每页显示的条目数
                    num_display_entries:10,//连续分页主体部分分页条目数
                    current_page: pageIndex,//当前页索引
                    num_edge_entries: 1//两侧首尾分页条目数
                });

                //翻页调用
                function PageCallback(index, jq) {
                    InitList(index);
                }
                //请求数据
                function InitList(pageIndex) {
                    var arrActionParam = {
                        "Title":"",
                        "Start":"1900-01-01",
                        "End":"1900-01-01",
                        "Status":"-99",
                        "Skip":pageIndex*pageSize,
                        "Take":pageSize
                    };
                    var strActionName="Market_GetFindbyValuePage";

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
                            var lists=objResult.List;
                            if(lists.length){
                            	if(lists.length > 0){
	                            	var html=template("template",{items:lists});
	                            	$(".table tbody").html(html);
	                            	for(var i = 0; i < lists.length;i++){
	                            		console.log(lists[i].Status);
	                            		if(lists[i].Status == "2"){
		                            	    $("tbody tr").eq(i).find(".audit").eq(0).remove();
		                            		$("tbody tr").eq(i).find(".audit").eq(0).remove();
		                            	}else if(lists[i].Status == "1"){
		                            		$("tbody tr").eq(i).find(".audit").eq(0).remove();
		                            	}else if(lists[i].Status == "-1"){
		                            		$("tbody tr").eq(i).find(".audit").eq(0).remove();
		                            		$("tbody tr").eq(i).find(".audit").eq(1).remove();
		                            	}
	                            	}
		                            $("table>tbody>tr>td>.audit").click(function () {
		                                if ($(this).text()=="审核") {
		                                    $('#myModal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                }else if ($(this).text()=="广播"){
		                                	$('#broadcastModal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                }else if ($(this).text()=="查看"){
		                                	var _index = $(this).parent().parent().attr("id");
		                                	window.location.href = "viewfind.html?findID="+_index+"";
		                                }
		                            })
	                            }else{
	                            	$(".table tbody tr").remove();
	                            	$(".page").css("display","none");
	                            	$(".no-tit").css("display","block");
	                            }
                            }else{
                            	alert(textStatus);
                            }
                        },
                        complete: function (XMLHttpRequest, textStatus) {
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            // alert(XMLHttpRequest);
                            // alert(textStatus);
                            // alert(errorThrown);
                        }
                    });
                }
            });
        },
    });
    //审核请求
    $("#auditBtn").click(function () {
    	alert("审核");
        var findID= $(".auditFlag").attr("id").toString();
        var userID=localStorage.userID;
        console.log(findID);
        console.log(typeof findID);

        console.log(userID);
        var arrActionParam = {
            "FindID":findID,
            "UserID":userID
        };
        console.log(arrActionParam);
        var strActionName="Market_UpdateFindAudit";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl + jsgDataGate,
            type: "POST",
            dataType: "json",
            data: datSubmit,
            async: true,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    $('#myModal').modal('hide');
                    $(".auditFlag .audit").eq(0).remove();
                    $(".auditFlag .statusName").text("己审核");
                }else {
                    alert(objResult.Message);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    })
    
    //广播请求
    $("#broadcastBtn").click(function () {
        var findID= $(".auditFlag").attr("id").toString();
        var userID=localStorage.userID;
        var arrActionParam = {
            "FindID":findID,
            "Creator":userID
        };
        console.log(arrActionParam);
        var strActionName="Market_AddFindPush";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl + jsgDataGate,
            type: "POST",
            dataType: "json",
            data: datSubmit,
            async: true,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    $('#myModal').modal('hide');
                    $(".auditFlag .audit").eq(1).text("己推送");
                    $(".auditFlag .statusName").text("己推送");
                }else {
                    alert(objResult.Message);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    })
	
	//查询功能
    $("#search").click(function () {
        var start= $("#inpstart").val().trim();
        var end= $("#inpend").val().trim();
        if (start=="") {
            start="1900-01-01"
            end="1900-01-01"
        }
        var status= $(".status option:selected").text();
        switch (status){
            case "未审核":
                status="0";
                break;
            case "已审核":
                status="1";
                break;
            case "已作废":
                status="-1";
                break;
            case "已推送":
                status="2";
                break;
            default:
                status="-99";
                break;
        }
        var title= $(".title").val().trim();
	    var arrActionParam = {
	        "Title":title,
            "Start":start,
            "End":end,
            "Status":status,
            "Skip":pageIndex*pageSize,
            "Take":pageSize
	    };
	    console.log("传入后台的参数",arrActionParam);
	    var strActionName="Market_GetFindbyValuePage";
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
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
            	maxentries=objResult.Total; //总条目数
            	alert("总的条数"+maxentries)
            	$(".page p span").html(maxentries+" ");
	            	$(function() {
	                $(".pagination").pagination(maxentries, {
	                    callback: PageCallback,
	                    prev_text: '上一页',
	                    next_text: '下一页',
	                    items_per_page: pageSize,//每页显示的条目数
	                    num_display_entries:10,//连续分页主体部分分页条目数
	                    current_page: pageIndex,//当前页索引
	                    num_edge_entries: 1//两侧首尾分页条目数
	                });
	
	                //翻页调用
	                function PageCallback(index, jq) {
	                    InitList(index);
	                }
	                InitList(0);
	                //请求数据
	                function InitList(pageIndex) {
	                	var arrActionParam = {
				            "Title":title,
				            "Start":start,
				            "End":end,
				            "Status":status,
				            "Skip":pageIndex*pageSize,
				            "Take":pageSize
				        };
				        var strActionName="Market_GetFindbyValuePage";
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
				            	console.log("请求结果",objResult);
				                var lists=objResult.List;
				                if(lists.length > 0){
				                	$(".page").css("display","block");
                            		$(".no-tit").css("display","none");
				                	var html=template("template",{items:lists});
					                $(".table tbody").html(html);
					                $("table>tbody>tr>td>.audit").click(function () {
					                    if ($(this).text()=="审核") {
					                        $('#myModal').modal('show');
					                        $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
					                    }
					                });
					                if ($(".status option:selected").text()=="已审核") {
					                    $(".audit").text("已审核")
					                }
				                }else{
				                	$(".table tbody tr").remove();
				                	$(".page").css("display","none");
                            		$(".no-tit").css("display","block");
				                }
				            },
				            complete: function (XMLHttpRequest, textStatus) {
				            },
				            error: function (XMLHttpRequest, textStatus, errorThrown) {
				                // alert(XMLHttpRequest);
				                // alert(textStatus);
				                // alert(errorThrown);
				            }
				        });
	                }
	            })
        	}
        })
    }) //查询的end
})