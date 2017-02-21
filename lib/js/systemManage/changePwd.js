$(function () {
    $("#tel,#psw").blur(function () {
        validate($(this));
    });
    var flag1 = false;
    var flag2 = false;
    $("#tel").blur(function () {
    	var re = /1[3|5|7|8|][0-9]{9}$/;
        if (!re.test($(this).val())) {
            $(this).next().css("display","inline-block");
            $(this).next().html("<s></s>手机号码格式不正确,请重新输入");
            $(this).focus();
        }else{
        	$(this).next().css("display","none");
        	flag1 = true;
        }
    });
    $("#checkCode").blur(function(){
    	if($(this).val().trim() != ""){
    		$(this).next().css("display","none");
    	}
    });
    $("#psw").blur(function () {
    	var re = /[a-zA-Z0-9]{6,20}$/;
        if (!re.test($(this).val())) {
            $(this).next().css("display","inline-block");
            $(this).next().html("<s></s>密码格式不正确,请重新输入");
            $(this).focus();
       	}else{
       		$(this).next().css("display","none");
       		flag2 = true;
       	}
    })
    $("#login_btn").click(function () {
    	var checkcode = $("#checkCode").val().trim();
    	if(flag1&&flag2&&checkcode){
	        var tel = $("#tel").val().trim();
	        var psw = $("#psw").val().trim();
	        var arrActionParam = {
	            "Mobile":tel,
	            "OldPassword": oldPwd,
	            "Password":newPwd
	        };
	        var strActionName="System_UpdatePassWord";
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
	              if (objResult.Result=="1") {
	                  $('#myModal').modal('show');
	              }else{
	                  alert(objResult.Message);
	              }
	            },
	            complete: function (XMLHttpRequest, textStatus) {
	            },
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	            	console.log(XMLHttpRequest.status);
	                // alert(XMLHttpRequest.status);
	                // alert(XMLHttpRequest.readyState);
	                // alert(textStatus);
	            }
	        });
        }else{
        	if(!flag1){
        		$("#tel").focus();
        		$("#tel").next().css("display","inline-block");
        	}else if(!flag2){
        		$("#psw").focus();
        		$("#psw").next().css("display","inline-block");
        	}else{
        		$("#checkCode").focus();
        		$("#checkCode").next().css("display","inline-block");
        	}
        }
    });
    var count = 4000;
    setInterval(function(){
    	
    },100);
});
