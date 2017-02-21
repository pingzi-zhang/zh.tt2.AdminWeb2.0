$(function () {
    //网址配置信息
    //设置cookie限制地址栏登录
    function setCookie(c_name,value,expiremin) {
        var exdate=new Date()
        exdate.setMinutes(exdate.getMinutes()+expiremin)
        document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString()
    }

    //保存密码
    if (localStorage.accout) {
        var accout = JSON.parse(localStorage.accout);
        $("input[name='username']").val(accout.username);
        $("input[name='password']").val(accout.pwd);
    }
    $(".remember_pwd").click(function () {
        $(".remember_pwd img").toggleClass("hidden");
        if (!$(".remember_pwd img").hasClass("hidden")) {
            localStorage.accout=JSON.stringify(accout);
        }else {
            localStorage.clear();
            $("input[name='username']").val("");
            $("input[name='password']").val("");
        }
    })

    //表单验证
    $("input[name='username']").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if ($(this).val().trim()=="") {
            $(".user_name em").css("display","block").text("* 请输入手机号");
            $(this).focus();
            return false;
        }else if(!re.test($(this).val().trim())) {
            $(".user_name em").css("display","block").text("* 您输入的手机格式有误,请重新输入");
            $(this).focus();
            return false;
        } else {
            $(".user_name em").css("display","none");
            return false;
        }
    })
    $("input[name='password']").blur(function () {
        if ($(this).val().trim()=="") {
            $(".password em").css("display","block");
            return false;
        }else {
            $(".password em").css("display","none");
            return false;
        }
    })

    //登录功能
    $(".login_btn").on('click',function () {
        var tel= $("input[name=username]").val();
        var pwd= $("input[name=password]").val();
        if (tel=="") {
            $("input[name=username]").focus();
            return false;
        }else if(pwd==""){
            $("input[name=password]").focus();
            return false;
        }
        //设置cookie限制地址栏登录
        setCookie('tel',tel,30);
        console.log(document.cookie);
        //记住密码
        var accout={
            username:tel,
            pwd:pwd
        };
        if (!$(".remember_pwd img").hasClass("hidden")) {
            localStorage.accout=JSON.stringify(accout);
        }else {
            localStorage.clear();
        }
        var strActionName="Login_UserLogin";
        var arrActionParam = { "Mobile": tel, "Password": pwd};
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        //登录的ajax请求
        $.ajax({
            url:jsgDataUrl + jsgDataGate,
            type:'post',
            data:datSubmit,
            dataType:'json',
            success:function (re) {
                if (re.Result == 1) {
                    localStorage.user = re.Model.Name;
                    localStorage.userID = re.Model.UserID;
                    window.location.href = './nav.html';
                } else if(re.Message == "账户错误或者未添加!"){
                    $(".user_name em").css("display","block").text("* 账户错误或未添加，请检查账户或联系管理员");
                    $("input[name=username]").focus(function () {
                        $(".user_name em").css("display","none")
                    });
                    return false;
                } else if(re.Message == "密码错误!") {
                    $(".password em").css("display","block").text("* 您输入的密码错误,请重新输入");
                    $("input[name=password]").focus(function () {
                        $(".password em").css("display","none")
                    })
                    return false;
                } else {
                    alert(re.Message);
                }
            },
            error:function () {

            }
        });
    })

    //适配屏幕进行缩放
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
})







































