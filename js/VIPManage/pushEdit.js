$(function(){
	window.parent.document.title=document.title;
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    
    var TailorID = $.getUrlParam("TailorID");//修改的地推的id 
    var Type = $.getUrlParam("Type");//type判断是查看还是审核显示下面的按钮1是查看
    if(Type == "1"){
        $("#reject").css("display","none");
        $("#argument").css("display","none");
    }
    //通过
    $("#argument").on("click",function(){
        verifyOpt(1);
    });
    //拒绝
    $("#reject").on("click",function(){
        verifyOpt(-1);
    });
    
    function verifyOpt(Status){
        var userID=localStorage.userID;
        var arrActionParam = {
            "TailorID":TailorID,
            "State":Status,
            "Mender":userID
        };
        var strActionName="Member_UpdateState";
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
            	console.log("结果",objResult);
                if(objResult.Result == 1){
                    if(Status == 1){
                    	alert("审核通过");
                    }else{
                    	alert("审核拒绝");
                    }
                    /*window.location.href = "productList.html";*/
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
    //请求查看产品详情
	var arrActionParam = {
        "TailorID":TailorID
    };
    var strActionName="Member_GetSalesMan";
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
            if(objResult.Result == 1){
                var model = objResult.Model;
                //渲染页面
                var $p = $(".content p");
                
                $p.eq(0).find("span").eq(1).html(model.Name);
                
                if(model.Sex == 0){
                	$p.eq(1).find("span").eq(1).html("女");
                }else{
                	$p.eq(1).find("span").eq(1).html("男");
                }
                
                $p.eq(2).find("span").eq(1).html(model.Birth);
                $p.eq(4).find("span").eq(1).html(model.ServeCity);
                $p.eq(5).find("span").eq(1).html(model.Inaword);
                $("#part p").html(model.Introduce);
                //图片
                $("#headUrl").attr("src",model.Head);
                $("#firstPic").attr("src",model.Index);
                //个人相册
	        	var album = model.Album.split(",");
	        	for(var i = 0; i < album.length;i++){
					$("#photo_Album").append('<img src="'+album[i] +'" alt="">');
	        	}
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
