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
    console.log(Type);
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
                //console.log(model.Name);
                em.eq(0).text(model.Name);
                if(Variety == "0801"){
                    em.eq(1).text("桌餐");
                    $(".foodIntroduce").css("display","block");
                    //菜品介绍
                    //渲染页面
                    var lists = model.FoodList;
                    for(var i = 0; i < lists.length;i++){
                    	var foodType = lists[i].Type;
				    	switch(foodType){
							case 1:
								lists[i].Type="冷菜";
								break;
							case 2:
								lists[i].Type="热菜";
								break;
							case 3:
								lists[i].Type="点心";
								break;
							case 4:
								lists[i].Type="饮料";
								break;
							case 9:
								lists[i].Type="其他";
								break;
						}
                    }
                    var html=template("template",{items:lists});
                    $(".table tbody").html(html);
                }else if(Variety == "0802"){
                    em.eq(1).text("自助餐");
                    $(".foodIntroduce").css("display","none");
                }
                var img1 = $('<img src="" alt=""/>');
                img1.attr("src",model.First.substring(model.First.lastIndexOf("http")));
                em.eq(2).append(img1);
                em.eq(3).text(model.UseNum);

                //产品价格
                var em2 = $(".productPrice>section>p>em");
                if(model.Week == ""){
                    em2.eq(0).text("每天");
                }else{
                    em2.eq(0).text(model.Week);
                }
                em2.eq(1).text(model.Buy);
                em2.eq(2).text(model.Market);


                //套餐介绍
                $(".packageIntroduce").css("display"," none");

                //购买须知
                var buyEm = $(".buyNotice>section>p>em");
                
                if(model.CancelModel == 1){
                    buyEm.eq(0).text("是");
                }else{
                    buyEm.eq(0).text("否");
                }

                $(".buyNotice>section>p>em>.red").text(model.Effective);
                if(model.LongMeal == 0){
                    buyEm.eq(2).text("无限制");
                }else{
                    buyEm.eq(2).text(model.LongMeal + "小时");
                }
                /*buyEm.eq(3).html(model.Notice);*/
               $("#rule div").html(model.Notice);

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
