$(function(){
	window.parent.document.title=document.title;
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var ID = $.getUrlParam("ProductID");
    var Type = $.getUrlParam("Type");
    var Variety = $.getUrlParam("Variety");
    if(Type == "1"){
        $(".auditInfo").css("display","none");
        $("footer>a").eq(0).removeClass("refuse").html("返回");
        $("#busSubmit").css("display","none");
        //$("footer>a").eq(0).removeClass("refuse");
    }else if(Type == "2"){
        $(".auditInfo").css("display","block");
        $("#busSubmit").css("display","inline-block");
        $("footer>a").eq(0).addClass("refuse");
    }

    //审核请求
    $("#busSubmit").click(function(){
        verify(2);
    });

    //拒绝
    $(".refuse").click(function(){
        verify(-1);

    });
    function verify(Status){
        var userID=localStorage.userID;
        var arrActionParam = {
            "ProductID":ID,
            "UserID":userID,
            "Status":Status
        };
        var strActionName="Product_UpdateProductAudit";
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
                    //alert("审核成功");
                    window.location.href = "productList.html";
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
	var arrActionParam = {
        "ProductID":ID
    };
    var strActionName="Product_GetProduct";
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
                //套餐信息
                var em = $(".packageInfo>section>p>em");
                em.eq(0).text(model.Name);
                console.log("em",em);
                var img1 = $('<img src="" alt=""/>');
                img1.attr("src",model.First.substring(model.First.lastIndexOf("http")));
                em.eq(1).append(img1);

                //产品价格
                var em2 = $(".productPrice>section>p>em");
                em2.eq(0).text(model.Buy);
                em2.eq(1).text(model.Market);
                //套餐介绍
                //产品介绍相册
                var album = model.Album.split(",");
                for(var i = 0; i < album.length;i++){
                	var img1 = $('<img src="" alt=""/>');
	                img1.attr("src",album[i]);
	                $("#proAlbum").append(img1);
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
});
