$(function () {
	// var userMess = JSON.parse(sessionStorage.userInfo);
	// var userMess = localStorage.userID;
	// console.log(localStorage.userID);
	// console.log(JSON.Parse(sessionStorage.userInfo));
	//初始页面渲染函数
	function inintShow(obj){
		var spanValue = $(".content p span:nth-of-type(even)");
		//console.log(spanValue);
		//console.log(obj);
		spanValue.eq(1).html(obj.Name);//商家名称
		spanValue.eq(2).html(obj.Brief);//简称
		//行业
		//所属行业
		if(obj.Industry==1){
			obj.Industry="景区";
		}else if(obj.Industry==2){
				obj.Industry="酒店";
			}else{
				obj.Industry="饮食";
			}
		spanValue.eq(3).html(obj.Industry);
		//console.log(obj.Industry);
		spanValue.eq(4).html(obj.Variety);//所属类别
		if(obj.Crowd == 0){
			obj.Crowd = "企业";
		}else if(obj.Crowd == 1){
			obj.Crowd = "个体";
		}else{
			obj.Crowd = "个人";
		}
		spanValue.eq(5).html(obj.Crowd);//身份
		spanValue.eq(6).html(obj.Linkman);//联系人
		spanValue.eq(7).html(obj.Telephone);//联系电话
		//spanValue.eq(8).html(obj.Telephone);//联系人手机
		spanValue.eq(8).html(obj.Email);//联系邮箱
		spanValue.eq(9).html(obj.Address);//营业场所地址
		spanValue.eq(10).html(obj.License);//营业执照
		spanValue.eq(13).html(obj.Name);//开户名
		spanValue.eq(14).html(obj.Bank);//开户银行
		spanValue.eq(15).html(obj.Account);//银行账户
		spanValue.eq(16).html(obj.Alipay);//支付宝账户
		spanValue.eq(17).html(obj.Remark);//备注
		//营业执照图片
		//console.log(obj.LicenseP);
		$("#license_pic").attr("src",obj.LicenseP.substring(obj.LicenseP.lastIndexOf("http")));
		$(".checkPic").attr("href",obj.LicenseP.substring(obj.Contract.lastIndexOf("http")));//合同图片
		$('.checkPic').css('color','#000');
		//付款方式
		if(obj.PayMode=="A"){
			var  str1 = "自甲方信息发布/约定功能上线之日起，1周后甲方可以从乙方指定账户提现至甲方银行账户；距上一次提现日或乙方/乙方关联方/乙方合作方主动打款日1周及以上时，甲方可<br/>";
			var str2 = "再次提现；每当距上一次提现或自甲方信息发布之日起每隔4周时，甲方未提现，乙方/乙方关联方/乙方合作方主动将代收净额中已标记信息但未结算的金额支付到甲方银行账户。"
		}else{
			var str1 = "自甲方信息发布/约定功能上线之日起，乙方/乙方关联方/乙方合作方主动将代收净额中已标记消费结算的金额达到1000元，甲方可以从乙方指定账户提现至甲方银行账户";
			var str2 = "";
		}
		$('.content .pay span:nth-of-type(even)').css({"vertical-align":"top","line-height":"20px"});
		$('.content .pay span:nth-of-type(even)').html(str1+str2);//付款方式
		function add0 (m) {
			return m<10?'0'+m:m;
		}
		
		var dat = new Date(parseInt(obj.Begin.substring(6,obj.Begin.length-2)));
		var datN = new Date(parseInt(obj.End.substring(6,obj.End.length-2)));
		//console.log(dat);
		dat = dat.getFullYear()+"年"+add0(parseInt(dat.getMonth() + 1))+"月"+add0(dat.getDate())+"日"+" "+add0(dat.getHours())+":"+add0(dat.getMinutes())+":"+add0(dat.getSeconds());
		datN = datN.getFullYear()+"年"+add0(parseInt(datN.getMonth() + 1))+"月"+add0(datN.getDate())+"日"+" "+add0(datN.getHours())+":"+add0(datN.getMinutes())+":"+add0(datN.getSeconds());
		var date = dat+"-"+datN;
		spanValue.eq(11).html(date);//合同签约

	}
	
	//发送ajax请求
	(function ($) {
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		}
	})(jQuery);
	var ID = $.getUrlParam("MerchantID");
	var strActionName="Mer_GetMerchant";
	var arrActionParam = {
		"MerchantID": ID
	};
	console.log(arrActionParam);
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
			//console.log(objResult);
			if(objResult.Result==1){
				inintShow(objResult.Model);
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
});