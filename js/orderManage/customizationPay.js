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
    //时间选择控件初始化
    //时间选择控件初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#payDate",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
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
					//指派信息
					var $appoint = $("#appoint .content p");
					$appoint.eq(0).find("span").eq(1).html(model.TailorName);
					$appoint.eq(1).find("span").eq(1).html(model.Demand);
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
	//点击保存的操作
	//保存按钮发送ajax
	$("#saveBtn").click(function(){
		var payNum = $("#payNum").val().trim();//付款金额
		var voucherNo = $("#evidenceNo").val().trim();//凭证号
		var payDate = $("#payDate").val().trim();//付款时间
		var remark = $("#remark").val().trim();//备注
		var payType= $("#payType option:selected").val();//支付方式payType
		var arrActionParam = {
	        CustID:custID,
			Demand:remark,
			Amount:payNum,
			Payment:payType,
			Voucher:voucherNo,
			Paytime:payDate

	   };
	    var strActionName="Order_UpdateCustPay";
	    var strActionParam = JSON.stringify(arrActionParam);
	    /*console.log("参数",strActionParam);*/
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
