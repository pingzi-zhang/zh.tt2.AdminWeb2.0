$(function () {
	window.parent.document.title=document.title;
	var userID=localStorage.userID;
    var arrActionParam = {
        "Mobile":"",
        "Name":"",
        "Skip":0,
        "Take":9
    };
    // console.log(arrActionParam);
    var strActionName = "Member_GetSalesManPage";
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
            var pageIndex = 0;
            var pageSize = 9;
            console.log("列表",objResult);
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
                function InitList(pageIndex) {
                    var arrActionParam = {
                        "Mobile": "",
                        "Name": "",
                        "Skip":pageIndex*pageSize,
                        "Take":pageSize
                    };
                    // console.log(arrActionParam);
                    var strActionName = "Member_GetSalesManPage";
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
                        	$("#recordTotal").html(maxentries);
                        	if(objResult.Result == 1){
                                var lists = objResult.List;
                                if(lists.length > 0){
                                	var html = template("template", {items: lists});
		                            $(".table tbody").html(html);
		                            //获取地推的ID 与 名字
		                            var str1, str2,str3;
		                            var Name = [], TailorID = [], Status = [];
		                            for(var i = 0;i < lists.length;i++ ){
		                                str1 = lists[i].Name;
		                                str2 = lists[i].TaitorID;
		                                str3 = lists[i].State;
		                                Name.push(str1);
		                                TailorID.push(str2);
		                                Status.push(str3);
		                            }
		                            for(var j = 0;j < Status.length;j++){
		                                if(Status[j] == -1){
		                                    $(".opt").eq(j).text("恢复");
		                                }else if(Status[j] == 1){
		                                    $(".opt").eq(j).text("冻结");
		                                }else{
		                                	$(".opt").eq(j).text("审核");
		                                }
		                            }
		                            // 查看功能
		                            $(".see").click(function () {
		                            	var Index = $(this).parent().parent().index();
		                            	window.location.href = "pushEdit.html?TailorID="+TailorID[Index]+"&Type=1";
		                            });
		                            //冻结与恢复请求
		                            $(".opt").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                if ($(this).text() == "冻结") {
		                                	$(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                	$('#myModal').attr("data",$(this).attr("id"));
		                                    $('#myModal').modal('show');
		                                    $(".MerchantName").text($(".auditFlag>td").eq(1).text());
		                                }else if ($(this).text() == "恢复"){
		                                	$('#Modal').attr("data",$(this).attr("id"));
		                                    $(".MerchantName").text(Name[Index]);
		                                    $('#Modal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                }else{
		                                	window.location.href = "pushEdit.html?TailorID="+TailorID[Index];
		                                }
		                            });
                                	
                                }else{
                                    $(".no-tit").css("display","block");
                                    $(".page").css("display","none");
                                }
                                //修改的事件
							    $(".modification").bind("click",function(){
							    	var id = $(this).attr("data");
							    	window.location.href = "changePush.html?TailorID="+id;
							    })
                            }else{
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
    
	//查询功能
    $("#search").click(function () {
    	$(this).html("正在查询");
    	var pageIndex = 0;
        var pageSize = 9;
    	var tel = $("#tel").val().trim();
    	var name = $("#name").val().trim();
        var arrActionParam = {
	        "Mobile":tel,
	        "Name":name,
	        "Skip":pageIndex*pageSize,
            "Take":pageSize
	    };
	     /*console.log("传入的参数",arrActionParam);*/
	    var strActionName="Member_GetSalesManPage";
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
            	var pageIndex = 0;
	            var pageSize = 9;
	            var maxentries=objResult.Total; //总条目数
	            $("#recordTotal").html(maxentries);
	            $(".pagination").pagination(maxentries, {
                    callback: PageCallback,
                    prev_text: '上一页',
                    next_text: '下一页',
                    items_per_page: pageSize,//每页显示的条目数
                    num_display_entries:9,//连续分页主体部分分页条目数
                    current_page: pageIndex,//当前页索引
                    num_edge_entries: 1//两侧首尾分页条目数
               });
                //翻页调用
                function PageCallback(index, jq) {
                     var arrActionParam = {
				        "Mobile":tel,
				        "Name":name,
				        "Skip":index*pageSize,
				        "Take":pageSize
				    };
                    var strActionName="Member_GetSalesManPage";
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
                        	$("#search").html("查询");
                        	if(objResult.Result == 1){
                                var lists = objResult.List;
                                if(lists.length > 0){
                                	var html = template("template", {items: lists});
		                            $(".table tbody").html(html);
		                            //获取地推的ID 与 名字
		                            var str1, str2,str3;
		                            var Name = [], TailorID = [], Status = [];
		                            for(var i = 0;i < lists.length;i++ ){
		                                str1 = lists[i].Name;
		                                str2 = lists[i].TaitorID;
		                                str3 = lists[i].State;
		                                Name.push(str1);
		                                TailorID.push(str2);
		                                Status.push(str3);
		                            }
		                            for(var j = 0;j < Status.length;j++){
		                                if(Status[j] == -1){
		                                    $(".opt").eq(j).text("恢复");
		                                }else if(Status[j] == 1){
		                                    $(".opt").eq(j).text("冻结");
		                                }else{
		                                	$(".opt").eq(j).text("审核");
		                                }
		                            }
		                            // 查看功能
		                            $(".see").click(function () {
		                            	var Index = $(this).parent().parent().index();
		                            	window.location.href = "pushEdit.html?TailorID="+TailorID[Index]+"&Type=1";
		                            });
		                            //冻结与恢复请求
		                            $(".opt").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                if ($(this).text() == "冻结") {
		                                	$(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                	$('#myModal').attr("data",$(this).attr("id"));
		                                    $('#myModal').modal('show');
		                                    $(".MerchantName").text($(".auditFlag>td").eq(1).text());
		                                }else if ($(this).text() == "恢复"){
		                                	$('#Modal').attr("data",$(this).attr("id"));
		                                    $(".MerchantName").text(Name[Index]);
		                                    $('#Modal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                }else{
		                                	window.location.href = "pushEdit.html?TailorID="+TailorID[Index];
		                                }
		                            });
                                }else{
                                    $(".no-tit").css("display","block");
                                    $(".page").css("display","none");
                                }
                            }else{
                                alert(objResult.Message);
                            }
                        }
                     })
                }
                var lists=objResult.List;
                var html=template("template",{items:lists});
                $(".table tbody").html(html);
                $("table>tbody>tr>td>.audit").click(function () {
                    if ($(this).text()=="审核") {
                        $('#myModal').modal('show');
                        $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
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
    })

//冻结帐号
$("#auditBtn").click(function () {
    frostUser($('#myModal').attr("data"));
});
//恢复帐号
$("#submitBtn").click(function () {
    renewUser($('#Modal').attr("data"));
});
//用户冻结请求
    function frostUser(tailorID){
        var arrActionParam = {
            "TailorID":tailorID,
            "State":-1,
            "Mender":userID
        };
        var strActionName="Member_UpdateState";
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
                if(objResult.Result == 1){
                    $('#myModal').modal('hide');
                    $(".auditFlag .statusName").text("已冻结");
                    $(".auditFlag .opt").text("恢复");
                }else{
                    alert(objResult.Message)
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
    }
//用户恢复请求
    function renewUser(tailorID){
        var arrActionParam = {
            "TailorID":tailorID,
            "State":1,
            "Mender":userID
        };
        var strActionName="Member_UpdateState";
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
                if(objResult.Result == 1){
                    $('#Modal').modal('hide');
                    $(".auditFlag .statusName").text("已审核");
                    $(".auditFlag .audit").text("冻结");
                }else{
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
    }
});