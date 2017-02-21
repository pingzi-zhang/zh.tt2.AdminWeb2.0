$(function () {
	window.parent.document.title=document.title;
	//发送ajax请求
	(function ($) {
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		}
	})(jQuery);
	var orderID = $.getUrlParam("findID");
	
	function getData(orderID){
		var strActionName="Order_GetOrderGoods";
		var arrActionParam = {
			"OrderID": orderID
		};
		var strActionParam = JSON.stringify(arrActionParam);
		var strRequest = GetVisitData(strActionName, strActionParam);
		var datSubmit = { strRequest: strRequest };
		$.ajax({
			url: jsgDataUrl + jsgDataGate,
			type: "POST",
			dataType: "json",
			//cache: true,
			data: datSubmit,
			// timeout : ajaxTimeout,
			async: true,
			//timeout: 60000,
			beforeSend: function () {
			},
			success: function (objResult,textStatus) {
				if(objResult.Result==1){
					$(".content section").css("display","block");
					$("#backMoney").css("display","inline-block")
					console.log(objResult.Model); 
					var model = objResult.Model;
					//渲染页面
					var $orderInfo = $("#orderInfo p");
					//订单号
					$orderInfo.eq(0).find("span").eq(1).html(model.OrderID);
					//订单状态
					$orderInfo.eq(1).find("span").eq(1).html(model.StatusText);
					//应付金额
					$orderInfo.eq(2).find("span").eq(1).html(model.Payable);
					//优惠金额
					$orderInfo.eq(3).find("span").eq(1).html(model.RedValue);
					//下单时间
					$orderInfo.eq(4).find("span").eq(1).html(model.CreateTime);
					
					//产品信息
					var lists = model.GoodsList;
					var html=template("template-tr",{items:lists});
	                $("#table tbody").html(html);
	                var $tr = $("#table tbody tr");
	                var sum = 0;
	                for(var i = 0; i < $tr.length;i++){
	                	sum += parseFloat($tr.eq(i).find("td").last().text());
	                }
	                $("#total").html("合计:￥"+sum);
	                //联系人信息
	                var $linkMan = $("#linkmanInfo content p");
	                //姓名
	                $linkMan.eq(0).find("span").eq(1).html(model.Name);
	                //手机号码
	                $linkMan.eq(1).find("span").eq(1).html(model.Mobile);
	                //详细地址
	                $linkMan.eq(2).find("span").eq(1).html(model.Address);
	                
	                //管家信息
	                var stewardInfo = $("#stewardInfo p");
	                stewardInfo.eq(0).find("span").eq(1).html(model.TailorName);
	                stewardInfo.eq(1).find("span").eq(1).html(model.TailorMobile);
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
				// alert(XMLHttpRequest.status);
				// alert(XMLHttpRequest.readyState);
				// alert(textStatus);
			}
		});
	}
	
});