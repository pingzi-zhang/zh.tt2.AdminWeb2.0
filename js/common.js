
function resizeHtmlFont() {
    var hW = $("html").width();
    $("body,html").attr("style", "font-size:" + hW * 14 / 1920 + "px !important;");
}

$(document).resize(function () {
    resizeHtmlFont();
});
addEventListener("orientationchange", function (e) {
    e.preventDefault();
});
resizeHtmlFont();

//侧边栏点击事件
$(function () {
    $(".sub_menu").hide();
    $(".manage_business").click(function () {
        $(".sub_business").slideToggle(300);
        $(".manage_business .arrow_icon").toggleClass("rotate");
    });
    $(".manage_find").click(function () {
        $(".sub_find").slideToggle(300);
        $(".manage_find .arrow_icon").toggleClass("rotate");
    });
    //订单管理
    $(".manage_order").click(function () {
        $(".sub_order").slideToggle(300);
        $(".manage_order .arrow_icon").toggleClass("rotate");
    });
    $(".manage_system").click(function () {
        $(".sub_system").slideToggle(300);
        $(".manage_system .arrow_icon").toggleClass("rotate");
    });
	$(".manage_finance").click(function () {
        $(".sub_finance").slideToggle(300);
        $(".manage_finance .arrow_icon").toggleClass("rotate");
    });
    //会员管理
    $(".manage_vip").click(function () {
        $(".sub_vip").slideToggle(300);
        $(".manage_vip .arrow_icon").toggleClass("rotate");
    });
    //报表查询
    $(".report_Query").click(function () {
        $(".sub_report").slideToggle(300);
        $(".report_Query .arrow_icon").toggleClass("rotate");
    });
    //行政区域
    $(".basicData").click(function () {
        $(".sub_basicData").slideToggle(300);
        $(".basicData .arrow_icon").toggleClass("rotate");
    });
    //产品管理
    $(".manage_product").click(function () {
        $(".sub_product").slideToggle(300);
        $(".manage_product .arrow_icon").toggleClass("rotate");
    });
})
function resizeHtmlFont() {
    var hW = $("html").width();
    $("body,html").attr("style", "font-size:" + hW * 14 / 1920 + "px !important;");
}
window.onresize =  function(){
	resizeHtmlFont();
};
addEventListener("orientationchange", function (e) {
    e.preventDefault();
});
resizeHtmlFont();
//表单非空验证
function validate(element) {
    if (!element.val()) {
        element.next().css("display","inline-block");
        element.focus();
        return false;
    }else {
        element.next().css("display","none");
        return true;
    }
}

$(".header-r .name").text(localStorage.user)
//验证登录状态
function getCookie(c_name) {
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}
function checkCookie() {
    var tel=getCookie("tel");
    if (tel=="") {
        alert("请重新登录");
        window.location.href="../login.html";
    }
}
//checkCookie();
// 获取登录名字和登录时间
$(function () {
    $(".header-r>.name").text(localStorage.user);
    var systemTime=new Date();
    var day=systemTime.getDate();
    var month=systemTime.getMonth() + 1;
    var year=systemTime.getFullYear();
    var hour=systemTime.getHours();
    var minutes=systemTime.getMinutes();
    var seconds=systemTime.getSeconds();
    $(".date").text(year + "/" + month + "/" + day);
    $(".time").text(hour + ":" + minutes + ":" + seconds);
});
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
var ajaxTimeout = 20000;
var $list = $('#list li',parent.document);
$("#title_path span").click(function(){
	var txt = $(this).text();
	var titl = txt.substring(txt.length-4);
	for(var i = $list.length - 1;i >=0;i--){
		if($list.eq(i).text() == titl){
			var src = $list.eq(i).attr("myAttr");
			break;
		}
	};
	$('#myIframe',parent.document).attr("src",src);
});
var ajaxTimeout = 20000;

