$(function(){
	window.parent.document.title=document.title;
	(function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var type = $.getUrlParam("type");
    var custID = $.getUrlParam("custID");
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
});
