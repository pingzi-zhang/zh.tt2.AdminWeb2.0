$(function () {
    var arrActionParam = {
        "Industry":"0",
        "Code":"",
        "Name":"",
        "Skip":0,
        "Take":10
    };
    var strActionName="Mer_GetMerchantPage";
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
            var pageSize = 10;
            var maxentries=objResult.Totel; //总条目数
            //console.log(maxentries);
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
                        "Industry":"0",
                        "Code":"",
                        "Name":"",
                        "Skip":pageIndex*pageSize,
                        "Take":pageSize
                    };
                    var strActionName="Mer_GetMerchantPage";
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
                            //alert(objResult);
                            if(objResult.Result == 1){
                                var lists=objResult.List;
                                if(lists.length > 0){
                                    //渲染页面
                                    $(".no-tit").css("display","none");
                                    $(".page>p>span").html(objResult.Totel);
                                    $(".page").css("display","block");
                                    var html=template("template",{items:lists});
                                    $(".table tbody").html(html);

                                    //获取商家ID 与 商品状态名称
                                    var str1 = [], str2 = [], str3 = [];
                                    var StatusName = [], ID = [], Name = [];
                                    for(var i = 0;i < lists.length;i++ ){
                                        str1 = lists[i].StatusName;
                                        str2 = lists[i].MerchantID;
                                        str3 = lists[i].Name;
                                        StatusName.push(str1);
                                        ID.push(str2);
                                        Name.push(str3);
                                    }
                                    //console.log(Name);
                                    for(var j = 0;j<StatusName.length;j++){
                                        if(StatusName[j] == "已审核") {
                                            //console.log(j);
                                            $("table>tbody>tr>td>.audit").eq(j).text("设置帐号");
                                        }
                                    }
                                    //审核与设置帐号的模态框
                                    $("tr>td>.audit").click(function () {
                                        var Index = $(this).parent().parent().index();
                                        if ($(this).text()=="审核") {
                                            $('#myModal').modal('show');
                                            $(".MerchantName").text(Name[Index]);
                                            $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
                                        }else{
                                            $('#Modal').modal('show');
                                            $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
                                            $("#submitBtn").click(function(){
                                                $(".num").val("");
                                                $(".pw").val("");
                                            })
                                        }
                                    });
                                    //修改
                                    $("tr>td>.change").click(function(){
                                        var i = $(this).parent().parent().index();
                                        window.location.href = "changeBusiness.html?MerchantID="+ID[i]+"&Type=1";
                                    });
                                    //查看
                                    $("tr>td>.look").click(function(){
                                        var i = $(this).parent().parent().index();
                                        var Type = $(this).text();
                                        //window.location.href = "changeBusiness.html?MerchantID="+ID[i]+"&Type=2";
                                        window.location.href = "busDetail.html?MerchantID="+ID[i];
                                    })
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
                    //查询功能
                    $("#search").click(function () {
                    	$(this).html("正在查询");
                        var Industry= $(".searchVariety option:selected").text();
                        switch (Industry){
                            case "全部":
                                Industry="0";
                                break;
                            case "门票":
                                Industry="1";
                                break;
                            case "美食":
                                Industry="3";
                                break;
                            case "酒店":
                                Industry="2";
                                break;
                        }
                        var code= $(".searchCode").val().trim();
                        var name= $(".searchName").val().trim();
                        var arrActionParam = {
                            "Industry":Industry,
                            "Code":code,
                            "Name":name,
                            "Skip":pageIndex*pageSize,
                            "Take":pageSize
                        };
                        var strActionName="Mer_GetMerchantPage";
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
					            var pageSize = 10;
					            var maxentries=objResult.Totel; //总条目数
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
			                            "Industry":Industry,
			                            "Code":code,
			                            "Name":name,
			                            "Skip":index*pageSize,
			                            "Take":pageSize
			                        };
			                        var strActionName="Mer_GetMerchantPage";
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
						                    $("#search").html("查询");
			                                if(objResult.Result == 1){
			                                    var lists=objResult.List;
			                                    if(lists.length > 0){
			                                    	$(".no-tit").css("display","none");
			                                        $(".page").css("display","block");
			                                        //渲染页面
			                                        $(".no-tit").css("display","none");
			                                        $(".page>p>span").html(objResult.Totel);
			                                        $(".page").css("display","block");
			                                        var html=template("template",{items:lists});
			                                        $(".table tbody").html(html);
			
			                                        //获取商家ID 与 商品状态名称
			                                        var str1 = [], str2 = [], str3 = [];
			                                        var StatusName = [], ID = [], Name = [];
			                                        for(var i = 0;i < lists.length;i++ ){
			                                            str1 = lists[i].StatusName;
			                                            str2 = lists[i].MerchantID;
			                                            str3 = lists[i].Name;
			                                            StatusName.push(str1);
			                                            ID.push(str2);
			                                            Name.push(str3);
			                                        }
			                                        //console.log(Name);
			                                        for(var j = 0;j<StatusName.length;j++){
			                                            if(StatusName[j] == "已审核") {
			                                                //console.log(j);
			                                                $("table>tbody>tr>td>.audit").eq(j).text("设置帐号");
			                                            }
			                                        }
			                                        //审核与设置帐号的模态框
			                                        $("tr>td>.audit").click(function () {
			                                            var Index = $(this).parent().parent().index();
			                                            if ($(this).text()=="审核") {
			                                                $('#myModal').modal('show');
			                                                $(".MerchantName").text(Name[Index]);
			                                                $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
			                                            }else{
			                                                $('#Modal').modal('show');
			                                                $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
			                                                $("#submitBtn").click(function(){
			                                                    $(".num").val("");
			                                                    $(".pw").val("");
			                                                })
			                                            }
			                                        });
			                                        //修改
			                                        $("tr>td>.change").click(function(){
			                                            var i = $(this).parent().parent().index();
			                                            window.location.href = "changeBusiness.html?MerchantID="+ID[i]+"&Type=1";
			                                        });
			                                        //查看
			                                        $("tr>td>.look").click(function(){
			                                            var i = $(this).parent().parent().index();
			                                            var Type = $(this).text();
			                                            //window.location.href = "changeBusiness.html?MerchantID="+ID[i]+"&Type=2";
			                                            window.location.href = "busDetail.html?MerchantID="+ID[i];
			                                        })
			                                    }else{
			                                    	$("tbody").children().remove();
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
                }
            });
        }
    });

    //console.log(ID);
	//产品审核的按钮
	/*$(".proManageBtn").click(function(){
		alert("点击了");
		console.log($(this).index());
	});*/
    //审核请求
    $("#auditBtn").click(function () {
        var merchantID= $(".auditFlag").attr("id").toString();
        var userID=localStorage.userID;
        //console.log(merchantID);
        //console.log(userID);
        var arrActionParam = {
            "MerchantID":merchantID,
            "UserID":userID
        };
        var strActionName="Mer_AuditMerchant";
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
                    $(".auditFlag .audit").text("设置账号");
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
    });

    //设置帐号
    $("#submitBtn").click(function(){
        var merchantID= $(".auditFlag").attr("id").toString();
        var userID=localStorage.userID;
        //var mobile =
        var arrActionParam = {
            "MerchantID":merchantID,
            "Mobile":$(".num").val(),
            "Password":$(".pw").val(),
            "Name":$(".table>tbody>tr>td").eq(1).text(),
            "UserID":userID
        };
        var strActionName="Mer_AddWaiter";
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
                    $('#Modal').modal('hide');
                    alert("设置成功");
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
});

