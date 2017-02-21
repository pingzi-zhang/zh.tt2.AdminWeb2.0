//用户数据提交
$(function () {
    //时间选择控件
    var start = {
        format: 'YYYY-MM-DD',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        ishmsVal: false,
        maxDate: '2099-06-30 23:59:59', //最大日期
    };
    $('#inpstart').jeDate(start);

    //选择按钮切换
    $("#sex div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })

    var idx;
    $("#sex div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        idx= $(this).index();
    })


    //表单非空验证
    /*function validate(element) {
        if (!element.val()) {
            element.next().css("display","inline-block");
            return false;
        }else {
            element.next().css("display","none");
            return false;
        }
    }*/
    $("#name,#tel").on("blur",function () {
        validate($(this));
    });
    $("#tel").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if (! re.test($("#tel").val())) {
            $(this).next().css("display","inline-block");
        }else {
            $(this).next().css("display","none");
        }
    })


    //按钮点击提交
    $("#userSubmit").click(function () {
        //获取输入框内的值
        //1.手机号
        var mobile= $("#tel").val().trim();
        //3.行业
        var name= $("#name").val().trim();
        //4.性别
        var sex= $("#sex .on").text();
        switch (sex){
            case "男":
                sex="1";
                break;
            case "女":
                sex="0";
                break;
        }
        //5.出生年月
        var birth= $("#inpstart").val();
		//6.用户编码
		var useid=localStorage.getItem("userID")
        //发送ajax请求
        var strActionName="System_UserRegister";
        var arrActionParam = {
            "Mobile":mobile,
			"Sex":sex,
			"Birth":birth,
			"UserID":useid,
			"Name":name
        };
        /*console.log("传入后台的参数",arrActionParam);*/
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        // var strRequest = "strRequest=" + strRequest;
        // var datSubmit = strRequest;
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
                //alert(objResult);
                if (objResult.Result=="-99") {
                    if($("#tel").val() == ""){
                    	$("#tel").focus();
                    	$("#tel").next().css("display","inline-block");
                    }else if($("#name").val() == ""){
                    	$("#name").focus();
                    	$("#name").next().css("display","inline-block");
                    }else if(sex == ""){
                    	$("#sex").find("em").css("display","inline-block");
                    }else{
                    	alert(objResult.Message);
                    }
                }else if (objResult.Result=="1"){
                    alert("添加成功");
                    window.location.href='./userList.html';
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
})

