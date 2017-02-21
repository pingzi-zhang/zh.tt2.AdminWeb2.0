$(function(){
	window.parent.document.title=document.title;
	(function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var custID = $.getUrlParam("custID");
	//付款时间-时间选择控件初始化
    $.jeDate('#payDate',{format:"YYYY-MM-DD hh:mm"});
    //时间选择控件初始化
    var payDate = {
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function (elem, datas) {
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    
    $('#payDate').jeDate(payDate);
    
	$("#name").click(function(){
		$('#myModal').modal('show');
		renderT();
	});
	
	$("#myModal .modal-body").on("click","s",function(){
		$("#myModal .modal-body tbody s").removeClass("on");
		$(this).addClass("on");
	});
	//应付金额表单验证
  	$("#payNum").on("blur",function(){
    	var paymoney = $(this).val();
    	if(!paymoney){
    		$(this).next().css("display","inline-block");
    		$(this).focus();
    		$(this).next().html("金额不能为空");
  			return false;
    	}else if(!(/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(paymoney))){ 
    		$(this).next().css("display","inline-block");
    		$(this).focus();
	        $(this).next().html("格式不正确"); 
	        return false; 
	    }else{
	    	$(this).next().css("display","none");
        	return true;
	    }
    })
  	//非空验证
  	$("#name,#idInfo,#evidenceNo").on("blur",function () {
        validate($(this));
  	});
  		//渲染管家列表
	function renderT(){
	    var pageIndex = 0;
	    var pageSize = 6;
	    var maxentries; //总条目数
	    var name = $('#TName').val();
	    //获取记录total
	    var arrActionParam = {
	    	"Name":name,
			"Skip":pageIndex*pageSize,
	    	"Take":pageSize
	    };
	    var strActionName = "Order_GetTailorPage";
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
	        timeout: ajaxTimeout,
	        beforeSend: function () {
	        },
	        success: function (objResult, textStatus){
	        	maxentries = objResult.Total;
	        },
	        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　 },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            alert(XMLHttpRequest.status);
	            alert(XMLHttpRequest.readyState);
	            alert(textStatus);
	        }
	    });
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
			    	"Name":name,
					"Skip":pageIndex*pageSize,
			    	"Take":pageSize
	            };
		        var strActionName = "Order_GetTailorPage";
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
		            timeout: ajaxTimeout,
		            beforeSend: function () {
		            },
		            success: function (objResult, textStatus){
	             		var lists=objResult.List;
	                    if(lists){
	                    	if(lists.length > 0){
	                    		$(".page").css("display","block");
	                        	$(".page>p>span").html(objResult.Total);
	                        	var html=template("steward",{items:lists});
			                    $("#myModal .table tbody").html(html);
	                        }else{
	                        	$(".table tbody tr").remove();
	                        	$(".page").css("display","none");
	                        	$(".no-tit").css("display","block");
	                        }
	                    }else{
	                    	alert(objResult.Message);
	                    }
	                },
		            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
				　　　　if(status=='timeout'){
				　　　　　  alert("请求超时");
				　　　　}
				　　 },
		            error: function (XMLHttpRequest, textStatus, errorThrown) {
		                alert(XMLHttpRequest.status);
		                alert(XMLHttpRequest.readyState);
		                alert(textStatus);
		            }
		        });
	        }
	    })
	}
	$("#search").click(function () {
		renderT();
	})
	$("#okBtn").click(function(){
		var $current = $("#myModal .modal-body tbody s").filter(".on");
		var $tr = $current.parent().parent();
		$("#name").val($tr.find("td").eq(1).text());
		$("#name").attr("data",$tr.find("td").eq(0).attr("data"));
		$('#myModal').modal('hide');
	});
	//请求数据渲染页面
	render();
	function render(){
		var arrActionParam = {
	        "CustID":custID
	    };
	    var strActionName="Order_GetCustomization";
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
	            if(objResult.Result == 1){
	                var model = objResult.Model;
					/*console.log("请求的结果",model);*/
					//定制信息详情
					var $p = $("header .content p");
					$p.eq(0).find("span").eq(1).html(model.Destination);//目的地
					$p.eq(1).find("span").eq(1).html(model.ThemeName);//旅游主题
					$p.eq(2).find("span").eq(1).html(model.Star);//酒店星级
					$p.eq(3).find("span").eq(1).html(model.From);//出发地
					$p.eq(4).find("span").eq(1).html(model.Budget);//单人预算
					$p.eq(5).find("span").eq(1).html(model.Start);//出发时间
					$p.eq(6).find("span").eq(1).html(model.Day);//出发天数
					$p.eq(7).find("span").eq(1).html(model.Adult);//成人
					$p.eq(7).find("span").eq(3).html(model.Children);//儿童
					//联系人
					var $linkman = $("#linkMan p");
					$linkman.eq(0).find("span").eq(1).html(model.LinkName);//联系人
					$linkman.eq(1).find("span").eq(1).html(model.LinkPhone);//手机号码
					$linkman.eq(2).find("span").eq(1).html(model.LinkEmail);//联系邮箱
	            }else{
	                alert(objResult.Message);
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
	//保存按钮发送ajax
	$("#saveBtn").click(function(){
		var tailorID = $("#name").attr("data");
		var demand = $("#remark").val().trim() || "";
		var arrActionParam = {
	        CustID:custID,
			TailorID: tailorID,
			Demand: demand
	   };
	    var strActionName="Order_UpdateCustTailor";
	    var strActionParam = JSON.stringify(arrActionParam);
	    console.log("参数",strActionParam);
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
	            if(objResult.Result == 1){
	               alert("保存成功");
	               window.location.href = "customizationList.html";
	            }else{
	                alert(objResult.Message);
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
	});
});
