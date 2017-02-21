/**
 * Created by 11 on 2016/12/14.
 */
    $(function(){
    	window.parent.document.title=document.title;
        (function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
        })(jQuery);
        var UserID = $.getUrlParam("UserID");
        //选择按钮切换
	    $("#sex div").click(function () {
	        $(this).addClass("on").siblings().removeClass("on");
	    })
	    //时间选择控件初始化
	    jeDate({
	    	format: 'YYYY-MM-DD',
			dateCell:"#inpstart",
			isinitVal:true,
			isTime:false, //isClear:false,
			minDate:"1980-01-01"
		})
        //渲染页面
        var arrActionParam = {
            "UserID":UserID
        };
        var strActionName="System_GetUser";
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
                if(objResult.Result == 0){
                    var model = objResult.Model;
                    //渲染页面
                    $("#name").val(model.Name);
                    $("#sex div").eq(model.Sex).addClass("on").siblings().removeClass("on");
                    $("#inpstart").val(model.Birth);

                    //修改用户信息
                    $("#userSubmit").click(function(){
                        changeUser();
                    })
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

        //修改用户信息
        function changeUser(){
            var _sex = $(".on").text();
            var Sex = 0;
            if(_sex == "女"){
                Sex = 0;
            }else if(_sex == "男"){
                Sex = 1;
            }
            var arrActionParam = {
                "UserID":UserID,
                "Name":$("#name").val(),
                "Sex":Sex,
                "Birth":$("#inpstart").val()
            };
            var strActionName="System_UpdateUser";
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
                        alert("修改成功");
                        window.location.href = "userList.html";
                    }else {
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

    });
