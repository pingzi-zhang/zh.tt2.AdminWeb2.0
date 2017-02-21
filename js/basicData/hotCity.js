$(function () {
	window.parent.document.title=document.title;
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var userID=localStorage.userID;
	var arrActionParam = {
        "VarietyID":"08",
		"MerchantName":"",
		"ProductName":"",
        "Status":-99,
		"Skip":0,
		"Take":7
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
            //alert(objResult.Result);
            //console.log(objResult);
            var pageIndex = 0;
            var pageSize = 7;
            var maxentries = objResult.Total; //总条目数
            $(function () {
                $(".pagination").pagination(maxentries, {
                    callback: PageCallback,
                    prev_text: '上一页',
                    next_text: '下一页',
                    items_per_page: pageSize,//每页显示的条目数
                    num_display_entries: 7,//连续分页主体部分分页条目数
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
                        "VarietyID":"08",
                        "MerchantName":"",
                        "ProductName":"",
                        "Status":-99,
                        "Skip":0,
                        "Take":7
                    };
                    var strActionName = "Product_GetProductPage";
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
                                        window.location.href = "orderDetail.html?ProductID="+ID[Index]+"&Type=1";
                                    });
                                    //审核
                                    $(".submit").click(function(){
                                        var Index = $(this).parent().parent().index();
                                        window.location.href = "productAudit.html?ProductID="+ID[Index]+"&Type=2";
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
					            var pageSize = 7;
					            var maxentries = objResult.Total; //总条目数
					            $(".pagination").pagination(maxentries, {
				                    callback: PageCallback,
				                    prev_text: '上一页',
				                    next_text: '下一页',
				                    items_per_page: pageSize,//每页显示的条目数
				                    num_display_entries: 7,//连续分页主体部分分页条目数
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
				                                        window.location.href = "orderDetail.html?ProductID="+ID[Index]+"&Type=1";
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
    //新添加按钮的取消按钮
    //新增按钮的事件
    $("#addRecord").click(function(){
    	var record = 
    	'<tr id="add">'+
			'<td><input type="text" placeholder="请输入城市名称"></td>'+
			'<td><input type="text" placeholder="请输入城市拼音"></td>'+
			'<td><input type="text" placeholder="请输入序号"></td>'+
			'<td>'+
				'<a href="javascript:void (0)" id="save">保存</a>'+
        		'<a href="javascript:void (0)" id="cancel">取消</a>'+
			'</td>'+
		'</tr>';
		$("#table tbody").append(record);
		$("#save").on("click",saveFn);
		$("#cancel").on("click",cancelFn);
    });
    function cancelFn(){
    	$(this).parent().parent().remove();
    };
    function saveFn(){
    	//取出城市，拼音，序号
    	var inputValue = $("#add input");
    	var city = inputValue.eq(0).val();
    	var cityP = inputValue.eq(1).val();
    	var Snumber = inputValue.eq(2).val();
    	$(this).parent().parent().remove();
    	$("#table tbody").append('<tr>'+
						'<td>'+city+'</td>'+
						'<td>'+cityP+'</td>'+
						'<td>'+Snumber+'</td>'+
						'<td><a href="javascript:void (0)" class="cancel">取消</a></td>'+
					'</tr>');
    };
});