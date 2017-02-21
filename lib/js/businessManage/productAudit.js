$(function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);
    var ID = $.getUrlParam("ProductID");
    var Type = $.getUrlParam("Type");
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
                if(model.Variety1 == "0801"){
                    em.eq(1).text("桌餐");
                    $(".foodIntroduce").css("display","block");
                    //菜品介绍
                    var td = $(".foodIntroduce>section>table>tbody>tr>td");
                    //console.log(model.FoodList);
                    td.eq(0).text(model.FoodList[0].Type);
                    $(".media>.media-left>img").attr("src",model.FoodList[0].Pic.substring(model.FoodList[0].Pic.lastIndexOf("http")));
                    $(".media>.media-body").text(model.FoodList[0].Name);
                    td.eq(2).text(model.FoodList[0].Price);
                    td.eq(3).text(model.FoodList[0].Quantity + model.FoodList[0].Unit);

                }else if(model.Variety1 == "0802"){
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
                buyEm.eq(3).text(model.Notice);

            }else{
                alert(objResult.Message);
            }
            /*var pageIndex = 0;
            var pageSize = 10;
            var maxentries=objResult.Total; //总条目数
            $(function() {
                $(".pagination").pagination(maxentries, {
                    callback: PageCallback,
                    prev_text: '上一页',
                    next_text: '下一页',
                    items_per_page: pageSize,//每页显示的条目数
                    num_display_entries:10,//连续分页主体部分分页条目数
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
                        "Industry":"0",
                        "Code":"",
                        "Name":"",
                        "Skip":pageIndex*pageSize,
                        "Take":pageSize
                    };
                    var strActionName="Mer_GetMerchantPage";
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
                            //alert(objResult);
                            var lists=objResult.List;
                            var html=template("template",{items:lists});
                            $(".table tbody").html(html);
                            $("table>tbody>tr>td>.audit").click(function () {
                                if ($(this).text()=="审核") {
                                    $('#myModal').modal('show');
                                    $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
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


                    //查询功能
                    $("#search").click(function () {
                        var Industry= $(".searchVariety option:selected").text();
                        switch (Industry){
                            case "全部":
                                Industry="0";
                                break;
                            case "门票":
                                Industry="1";
                                break;
                            case "美食":
                                Industry="3";
                                break;
                            case "酒店":
                                Industry="2";
                                break;
                        }
                        var code= $(".searchCode").val().trim();
                        var name= $(".searchName").val().trim();
                        var arrActionParam = {
                            "Industry":Industry,
                            "Code":code,
                            "Name":name,
                            "Skip":pageIndex*pageSize,
                            "Take":pageSize
                        };
                        var strActionName="Mer_GetMerchantPage";
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
                                //alert(objResult);
                                var lists=objResult.List;
                                var html=template("template",{items:lists});
                                $(".table tbody").html(html);
                                $("table>tbody>tr>td>.audit").click(function () {
                                    if ($(this).text()=="审核") {
                                        $('#myModal').modal('show');
                                        $(this).parent().parent().addClass("auditFlag").siblings().removeClass("auditFlag");
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
                    })
                }
            });*/
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
