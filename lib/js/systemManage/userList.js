$(function () {
    var arrActionParam = {
        "Mobile":"",
        "Name":"",
        "Skip":0,
        "Take":10
    };
    // console.log(arrActionParam);
    var strActionName="System_GetUserPage";
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
        success: function (objResult, textStatus) {
            var pageIndex = 0;
            var pageSize = 10;
            var maxentries = objResult.Total; //总条目数
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

                //请求数据
                function InitList(pageIndex) {
                    var arrActionParam = {
                        "Mobile": "",
                        "Name": "",
                        "Skip":pageIndex*pageSize,
                        "Take":pageSize
                    };
                    // console.log(arrActionParam);
                    var strActionName = "System_GetUserPage";
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
		                            //获取商家ID 与 名字
		                            var str1 = [], str2 = [],str3 = [];
		                            var Name = [], UserID = [], Status = [];
		                            for(var i = 0;i < lists.length;i++ ){
		                                str1 = lists[i].Name;
		                                str2 = lists[i].UserID;
		                                str3 = lists[i].Status;
		                                Name.push(str1);
		                                UserID.push(str2);
		                                Status.push(str3);
		                            }
		                            for(var j = 0;j < Status.length;j++){
		                                if(Status[j] == -1){
		                                    $(".audit").eq(j).text("恢复");
		                                }else{
		                                    $(".audit").eq(j).text("冻结");
		                                }
		                            }
		                            // 修改功能
		                            $(".change").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                console.log(Index);
		                                window.location.href = "changeUser.html?UserID="+UserID[Index];
		                            });
		                            //冻结与恢复请求
		                            $(".audit").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                if ($(this).text() == "冻结") {
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                    $('#myModal').modal('show');
		                                    $(".MerchantName").text($(".auditFlag>td").eq(1).text());
		                                }else{
		                                    $(".MerchantName").text(Name[Index]);
		                                    $('#Modal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                }
		                            });
                                	
                                }else{
                                    $(".no-tit").css("display","block");
                                    $(".page").css("display","none");
                                }
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
            // alert(XMLHttpRequest.status);
            // alert(XMLHttpRequest.readyState);
            // alert(textStatus);
        }
    });
	//查询功能
    $("#search").click(function () {
    	$(this).html("正在查询");
    	var pageIndex = 0;
        var pageSize = 10;
    	var tel = $("#tel").val().trim();
    	var name = $("#name").val().trim();
        var arrActionParam = {
	        "Mobile":tel,
	        "Name":name,
	        "Skip":pageIndex*pageSize,
            "Take":pageSize
	    };
	     console.log("传入的参数",arrActionParam);
	    var strActionName="System_GetUserPage";
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
	            var pageSize = 10;
	            var maxentries=objResult.Total; //总条目数
	            $("#recordTotal").html(maxentries);
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
                     var arrActionParam = {
				        "Mobile":tel,
				        "Name":name,
				        "Skip":index*pageSize,
				        "Take":pageSize
				    };
                    var strActionName="System_GetUserPage";
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
		                            //获取商家ID 与 名字
		                            var str1 = [], str2 = [],str3 = [];
		                            var Name = [], UserID = [], Status = [];
		                            for(var i = 0;i < lists.length;i++ ){
		                                str1 = lists[i].Name;
		                                str2 = lists[i].UserID;
		                                str3 = lists[i].Status;
		                                Name.push(str1);
		                                UserID.push(str2);
		                                Status.push(str3);
		                            }
		                            for(var j = 0;j < Status.length;j++){
		                                if(Status[j] == -1){
		                                    $(".audit").eq(j).text("恢复");
		                                }else{
		                                    $(".audit").eq(j).text("冻结");
		                                }
		                            }
		                            console.log(Status);
		                            // 修改功能
		                            $(".change").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                console.log(Index);
		                                window.location.href = "changeUser.html?UserID="+UserID[Index];
		                            });
		                            //冻结与恢复请求
		                            $(".audit").click(function () {
		                                var Index = $(this).parent().parent().index();
		                                if ($(this).text() == "冻结") {
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
		                                    $('#myModal').modal('show');
		                                    $(".MerchantName").text($(".auditFlag>td").eq(1).text());
		                                }else{
		                                    $(".MerchantName").text(Name[Index]);
		                                    $('#Modal').modal('show');
		                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
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
                /*var lists=objResult.List;
                var html=template("template",{items:lists});
                $(".table tbody").html(html);
                $("table>tbody>tr>td>.audit").click(function () {
                    if ($(this).text()=="审核") {
                        $('#myModal').modal('show');
                        $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
                    }
                })*/
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
        frostUser($(".auditFlag").attr("id"));
    });
    //恢复帐号
    $("#submitBtn").click(function () {
        renewUser($(".auditFlag").attr("id"));
    });
//用户冻结请求
    function frostUser(UserID){
        var arrActionParam = {
            "UserID":UserID,
            "Status":-1
        };
        var strActionName="System_UpdateFrozen";
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
                    $(".auditFlag .statusName").text("无效");
                    $(".auditFlag .audit").text("恢复");
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
    function renewUser(UserID){
        var arrActionParam = {
            "UserID":UserID,
            "Status":1
        };
        var strActionName="System_UpdateFrozen";
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
                    $(".auditFlag .statusName").text("有效");
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