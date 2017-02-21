//商家新增数据提交
$(function () {
	window.parent.document.title=document.title;
    //上传营业执照照片到图片服务器
    var uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
        server: jsgImageUrl + jsgImageUplod,
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate :true,
        method:'POST'
    });
    uploader.on('uploadSuccess',function (file, response) {
        var b=document.createElement("b");
        $(".license_pic").append(b);
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc").css("display", "none");
        },3000);
        $("#filePicker>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
    });

    //上传合同图片到图片服务器
    var uploader2 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
        server: jsgImageUrl + jsgImageUplod,
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker2',
        //设置传入后台的参数名,新增插件时不用修改
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate :true,
        method:'POST'
    });
    uploader2.on('uploadSuccess',function (file, response) {
        var b=document.createElement("b");
        $(".others_pic").append(b);
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc2").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc2").css("display", "none");
        },3000);
        $("#filePicker2>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')')
    });

    //时间选择控件
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpend",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    //选择按钮切换
    $("#busIndustry div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $("#busVariety div").click(function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        }else {
            $(this).addClass("on");
        }
    })
    $("#busCrowd div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    var idx,idx1;
    $("#busAgency div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        idx= $(this).index();
    })
    $("#busPayMode div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        idx1= $(this).index();
    })

    //表单非空验证
    $("#busName,#busBrief,#busLinkman,#busMail,#busAddress,#busLicense,#busBankCode,#busBank,#busAccount").on("blur",function () {
        validate($(this));
    })
    //手机号验证
    $("#busTelephone").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if (!re.test($(this).val().trim())&&$(this).val().trim()!="") {
            $(this).next().css("display","inline-block").html("<s></s>手机格式不正确");
            $(this).focus();
        }else {
            validate($(this));
        }
    })
    //邮箱地址验证
    $("#busMail").blur(function () {
        var re=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!re.test($(this).val().trim())&&$(this).val().trim()!="") {
            $(this).next().css("display","inline-block").html("<s></s>邮箱格式不正确");
            $(this).focus();
        }else {
            validate($(this));
        }
    })

    //按钮点击提交
    $("#busSubmit").click(function () {
        //获取输入框内的值
        //1.商家名称
        var name= $("#busName").val();
        if(!name){
        	$("#busName").next().css("display","inline-block")
        	$("#busName").focus();
        }
        //2.商户号,简称
        var brief= $("#busBrief").val();
        if(!brief){
        	$("#busBrief").next().css("display","inline-block")
        	$("#busBrief").focus();
        }
        //3.行业
        var industry= $("#busIndustry .on").text();
        switch (industry){
            case "饮食":
                industry="3";
                break;
            case "景区":
                industry="1";
                break;
            case "酒店":
                industry="2";
                break;
        }
        //4.销售产品类型
        var variety= $("#busVariety .on");
        var temp = "";
        for(var i = 0; i < variety.length;i++){
        	switch(variety.eq(i).text()){
        		case "门票":
        			temp = temp + ",01";
        			break;
        		case "特产":
        			temp = temp + ",02";
        			break;
        		case "美食":
        			temp = temp + ",08";
        			break;
        	}
        }
        variety = temp.substring(1);
        if(!variety){
        	$("#busVariety em").css("display","inline-block");
        }
        //5.商家身份
        var crowd= $("#busCrowd .on").text();
        switch (crowd){
            case "企业":
                crowd="0";
                break;
            case "个体":
                crowd="1";
                break;
            case "个人":
                crowd="2";
                break;
        }
        //6.联系人
        var linkMan= $("#busLinkman").val();
        if(!linkMan){
        	$("#busLinkman").next().css("display","inline-block")
        	$("#busLinkman").focus();
        }
        //7.联系电话
        var telephone= $("#busTelephone").val();
        if(!telephone){
        	$("#busTelephone").next().css("display","inline-block")
        	$("#busTelephone").focus();
        }
        //8.经营地址
        var address= $("#busAddress").val();
        if(!address){
        	$("#busAddress").next().css("display","inline-block")
        	$("#busAddress").focus();
        }
        //9.营业执照
        var license= $("#busLicense").val();
        if(!license){
        	$("#busLicense").next().css("display","inline-block")
        	$("#busLicense").focus();
        }
        var licenseP = "";
        //10.营业执照图片地址
        if($("#busLicenseP b").attr("data")){
        	licenseP= $("#busLicenseP b").attr("data");
        }else{
        	alert("请上传营业执照");
        }
        //11.合同有效期开始
        var begin= $("#inpstart").val();
        // alert(begin+"----"+typeof (begin));
        //12.合同有效期结束
        var end= $("#inpend").val();
        //13.付款方式
        var payMode;
        switch (idx1){
            case 1:
                payMode="A";
                break;
            case 2:
                payMode="B";
                break;
            default:
                payMode="A";
                break;
        }
        //14.邮箱地址
        var email= $("#busMail").val();
        if(!email){
        	$("#busMail").next().css("display","inline-block")
        	$("#busMail").focus();
        }
        //15.银行用户名
        var bankCode= $("#busBankCode").val();
        if(!bankCode){
        	$("#busBankCode").next().css("display","inline-block")
        	$("#busBankCode").focus();
        }
        //16.银行全称
        var bank= $("#busBank").val();
        if(!bank){
        	$("#busBank").next().css("display","inline-block")
        	$("#busBank").focus();
        }
        //17银行账号
        var account= $("#busAccount").val();
        if(!account){
        	$("#busAccount").next().css("display","inline-block")
        	$("#busAccount").focus();
        }
        //18支付宝账号
        var alipay= $("#busAlipay").val();
        if (alipay=="") {
            alipay="无";
        }
        //19代收款
        var agency;
        switch (idx){
            case 1:
                agency="1";
                break;
            case 2:
                agency="0";
                break;
            default:
                agency="1";
                break;
        }
        //20合同图片地址
        var contract= "";
        if($("#busContract b").attr("data")){
        	contract= $("#busContract b").attr("data");
        }else{
        	alert("请上传合同图片")
        }
        //21备注
        var remark= $("#busRemark").val();
        if (remark=="") {
            remark="无";
        }
        var userID=localStorage.userID;
        //发送ajax请求
        var strActionName="Mer_AddMerchant";
        var arrActionParam = {
            "Variety":variety,
            "Brief": brief,
            "Industry": industry,
            "Name": name,
            "Crowd": crowd,
            "Linkman": linkMan,
            "Telephone":telephone,
            "Address":address,
            "License":license,
            "LicenseP":licenseP,
            "Begin":begin,
            "End":end,
            "PayMode":payMode,
            "BankCode":bankCode,
            "Bank":bank,
            "Account":account,
            "Alipay":alipay,
            "Agency":agency,
            "Contract":contract,
            "Remark":remark,
            "Email":email,
            "Creator":userID
        };
        console.log("传入后台数据",arrActionParam);
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
                if (objResult.Result=="1"){
                    window.location.href='./businessList.html';
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
    });
});