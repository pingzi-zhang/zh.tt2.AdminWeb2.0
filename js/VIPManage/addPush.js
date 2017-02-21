$(function(){
	window.parent.document.title=document.title;
	//选择时间的初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#birthday",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"1900-01-01"
	})
    //选择按钮切换
    $("#sex div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    
    var hobby=UE.getEditor('hobby',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('hobby',{enableAutoSave: false});
    
    //上传图片控件实例化
    //1.头像
    var uploader1 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl + jsgImageUplod,
        // 控件按钮
        pick: '#product_img',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate:true,
        method:'POST',
    });
    uploader1.on('uploadSuccess',function (file, response) {
        var b=document.createElement("b");
        $("#product_img").append(b)
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc").css("display", "none");
        },3000);
        $("#product_img>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
    	
    	var clearBtn = document.createElement("div");
        clearBtn.innerHTML = "×";
        $(clearBtn).addClass("imgClear");
        $(clearBtn).on("click",function(){
        	$("#product_img>.webuploader-pick").css("background-image","");
        	$(".product_img b").remove();
        	$(this).remove();
        })
        $("#product_img").before(clearBtn);
    });
    
    //2.我的相册
    var uploader2 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl + jsgImageUplod,
        // 控件按钮
        pick: '#product_album',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        method:'POST',
    });
    
    uploader2.on('uploadSuccess',function (file, response) {
    	$("#product_album_list .tipUser").css("display","none")
        var showUrl = response.ShowUrl;
        var newDiv = document.createElement("div");
    	var img = document.createElement("img"); 
    	img.setAttribute("src",showUrl);
    	var b=document.createElement("b");
    	b.setAttribute("data",response.ShowUrl);
    	
    	$(newDiv).append(img);
    	$(newDiv).append(b)  
    	$("#product_album").before(newDiv);   
         //删除按钮
    	var clearBtn = document.createElement("div");
        clearBtn.innerHTML = "×";
        $(clearBtn).addClass("imgClear");
        $(newDiv).append(clearBtn);
        $("#product_album .imgClear").on("click",function(){
	    	$(this).parent().remove();
    	})
    });
    //3.我的首图
    var uploader3 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl + jsgImageUplod,
        // 控件按钮
        pick: '#fistPoto',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate:true,
        method:'POST',
    });
    uploader3.on('uploadSuccess',function (file, response) { 
    	/*$(".product_img b").remove();*/
        var b=document.createElement("b");
        $(".fistPoto").append(b)
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc").css("display", "none");
        },3000);
        $("#fistPoto>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
    	
    	var clearBtn = document.createElement("div");
        clearBtn.innerHTML = "×";
        $(clearBtn).addClass("imgClear");
        $(clearBtn).on("click",function(){
        	$("#fistPoto>.webuploader-pick").css("background-image","");
        	$(".fistPoto b").remove();
        	$(this).remove();
        })
        $("#fistPoto").before(clearBtn);
    });
    //日期选择控件
    var cityPicker = new IIInsomniaCityPicker({
        data: data,
        target: 'cityChoice',
        valType: 'k-v',
        hideCityInput: {
            name: 'city',
            id: 'city'
        },
        hideProvinceInput: {
            name: 'province',
            id: 'province'
        },
        callback: function(){
        }
    });
    cityPicker.init();
    //非空验证
    $("#name,#tel,#birthday,#introduce,#hobby").on("blur",function () {
        validate($(this));
    });
    $("#cityChoice").on("blur",function () {
        if (!$(this).val()) {
	        $(this).parent().find("em").css("display","inline-block");
	        $(this).focus();
	        return false;
	    }else {  
	        $(this).parent().find("em").css("display","none");
	        return true;
	    }
    });
    //保存按钮的单击事件
    $("#saveBtn").click(function(){
    	saveFn();
    });
    function saveFn(){
    	//获取页面的数据
    	//1.姓名
        var name= $("#name").val().trim();
        //2.性别
        var sex= $("#sex .on").text();
        switch (sex){
            case "男":
                sex="1";
                break;
            case "女":
                sex="0";
                break;
        }
        //3.手机号
        var tel = $("#tel").val();
        //4.服务城市
        var city=$("#cityChoice").val();
        //5.出生日期
        var birthday = $("#birthday").val();
        //6.一句话
        var word = $("#introduce").val();
        //7.自我介绍
        var useU = document.getElementById('ueditor_0').contentWindow.document.body;
        var introduce = useU.innerHTML;
        /*var introduce = $("#hobby").val();*/
        //8.头像
        var head = $("#productImg b").attr("data");
        if(head){
        	head = head.substring(head.search("/U"));
        }
        //9.我的相册
        var PhotoAlum = "";
        var length = $("#product_album_list img").length;
    	for(var i = 0; i < length;i++){
    		var temp = $("#product_album_list img").eq(i).attr("src");
    		//排除最后一张图片，不需要逗号
    		if(i == length-1){
    			PhotoAlum = PhotoAlum + temp.substring(temp.search("/U"));
    		}else{
    			PhotoAlum = PhotoAlum + temp.substring(temp.search("/U")) + ","
    		}
    	}
        //10.我的首图
        var fistPic = $("#Selfie b").attr("data");
        if(fistPic){
        	fistPic = fistPic.substring(fistPic.search("/U"));
        }
        var creator=localStorage.userID;
        //发送ajax请求
        var strActionName="Member_AddSalesMan";
        var arrActionParam = {
		    Name:name,//姓名
			Sex:sex,//性别：0女；1男
			Mobile:tel,//手机号
			ServeCity:city,//服务城市
			Birth:birthday,//出生日期
			Inaword:word,//一句话
			Introduce:introduce,//自我介绍
			Head:head,//头像
			Album:PhotoAlum,//我的相册
			Index:fistPic,//我的首图
			Creator:creator
		}; 
		console.log("传入的参数",arrActionParam);
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
            timeout : ajaxTimeout,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    alert(objResult.Message);
                    window.location.href = "pushList.html";
                }else{
                    alert(objResult.Message);
                }
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　},
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
       });
    }
})
