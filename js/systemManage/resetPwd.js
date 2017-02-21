$(function () {
	window.parent.document.title=document.title;
	var userAccount = JSON.parse(sessionStorage.account);
	var peg1 = 0;
	var peg2 = 0;
	var peg3 = 0;
    $("#oldPwd,#newPwd,#surePwd").blur(function () {
        validate($(this));
    });
	$("#oldPwd").blur(function () {
        if ($(this).val()!="") {
        	var pwd = $(this).val();
            var strActionName="Login_UserLogin";
	        var arrActionParam = { "Mobile": userAccount.username, "Password":pwd};
	        var strActionParam = JSON.stringify(arrActionParam);
	        var strRequest = GetVisitData(strActionName, strActionParam);
	        var datSubmit = { strRequest: strRequest };
	        //登录的ajax请求
	        $.ajax({
	            url:jsgDataUrl + jsgDataGate,
	            type:'post',
	            data:datSubmit,
	            dataType:'json',
	            async: false,
	            success:function (re) {
//	                console.log(re);
	                if (re.Result == 1) {
	                    $("#oldPwd").next().css("display","inline-block").html("√");
						peg1 = 1	;
//						 console.log(re);
						 $("#oldPwd").attr("disabled","true");
//						 return false;
	                } else if(re.Message == "密码错误!") {
	                    $("#oldPwd").next().css("display","inline-block").html("*原密码不正确,请重新输入");
	                    $("#oldPwd").val("");
	          			validate($("#oldPwd"));
	          			return false;
	                } 
	            },
	            error:function () {
	
	            }
	        });
        }else {
            validate($(this));
            peg1 = 0;
        }
    });
    
    $("#newPwd").blur(function () {
    	var re = /[a-zA-Z0-9]{6,20}$/;
        if (!re.test($(this).val()) && $(this).val().length >= 6) {
            $(this).next().css("display","inline-block");
            $(this).next().html("<s></s>密码格式不正确,请重新输入");
            $(this).focus();
            peg2 = 0;
            
            return false;
        }else if($(this).val().length<6 && $(this).val().length>=1){
        	$(this).next().css("display","inline-block");
            $(this).next().html("<s></s>密码位数不够，请输入6-22位密码");
            $(this).focus();
            peg2 = 0;
            
            return false;
        }else if(re.test($(this).val()) && $(this).val().length >= 6 && $(this).val().length <= 22){
        	$(this).next().css("display","inline-block");
            $(this).next().html("√");
            
            peg2 = 1;
        }else {
        	$(this).next().html("<s></s>新密码必须填写");
            validate($(this));
            
            peg2 = 0;
        }
    });
    $("#newPwd").keydown(function(){
    	$("#surePwd").val("");
    	$("#newPwd").next().css("display","none");
    	$("#surePwd").next().css("display","none");
    	peg3 = 0;
    })
    $("#surePwd").blur(function () {
        if ($(this).val()!== $("#newPwd").val()&&$(this).val()!="") {
            $(this).next().css("display","inline-block");
            $(this).next().html("<s></s>与新密码不同,请重新输入")
            $(this).val("");
            $(this).focus();
            peg3 = 0;
            return false;
        }else if($(this).val()== $("#newPwd").val()&&$(this).val()!=""){
            $(this).next().css("display","inline-block");
            $(this).next().html("√");
            peg3 = 1;
        }else{
        	$(this).next().css("display","inline-block");
        	peg3 = 0;
        }
    })
    
    $("#btn").click(function () {
    	if(peg1==1&&peg2==1&&peg3==1){
        var newPwd = $("#surePwd").val().trim();
        var oldPwd = $("#oldPwd").val().trim();
        var arrActionParam = {
            "Mobile":userAccount.username,
            "OldPassword": oldPwd,
            "Password":newPwd
        };
//      console.log(arrActionParam);
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
            /*timeout: ajaxTimeout,*/
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
              if (objResult.Result=="1") {
                 alert("密码修改成功，请重新输入")
                 top.location.href="../login.html";
              }
            },
            complete : function(XMLHttpRequest,status){
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
        }else{
        	alert("请按顺序正确输入原密码，新密码")
        }
    })
    
})
