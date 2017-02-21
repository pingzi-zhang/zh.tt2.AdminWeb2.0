$(function () {
	window.parent.document.title=document.title;
	//时间初始化
	//时间选择控件初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#balanceTime",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
	//搜索框内容
	$("#voucher").on("blur",function () {
        validate($(this));
    });
    $("#money").on("blur",function () {
        validate($(this));
    });
    $("#money").on("focus",function(){
    	$("#balanceTot").css("display","inline-block");
	    $("#blanceTip").css("display","none");
    })
	var type = $("#type option:selected").text();
	var userID = localStorage.userID;
	var type = $(".searchVariety").eq(0).text();
	var i=0;
	function selfSearch(pstr,pValue){
		$(".option .search").nextAll().bind("click",function(){
			$(".key").html($(this).html());
			$(".key").attr("marId",$(this).attr("marId"))
			$(".key").attr("balance",$(this).attr("balance"))
			$("#balanceTot").css("display","inline-block");
	    	$("#blanceTip").css("display","none");
			$("#balanceTot .balance").html($(this).attr("balance"))
			$(".select>.key").next().hide();
		});
		$(".option .search input").bind("keyup",function(){
			var txt = $(this).val();
			for(var i = 0;i < pValue.length;i++){
				if(pValue[i].match(txt)){
					pstr.eq(i).css("display","block")
				}else{
					pstr.eq(i).css("display","none")
				}
			}
		});
	}
	getUserInfo();
	$("#userType").bind("change",function(){
		getUserInfo();
	})
	$('#key').click(function(){
		if($(this).next().is(':visible')==false){
			$(this).next().show();
		}else
		if($(this).next().is(':visible')==true){
			$(this).next().hide();
		}
	});
	
	//结算对象改变时，执行的函数
	function getUserInfo(){
		if($("#userType option:selected").text() == "管家"){
			var strActionName = "Fin_GetTaitorList";
		}else{
			var strActionName = "Fin_GetMerchantList";
		}
		var arrActionParam = "";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = {strRequest: strRequest};
        $.ajax({
            url: jsgDataUrl + jsgDataGate,
            type: "POST",
            dataType: "json",
            //cache: true,
            data: datSubmit,
            async: false,
            //timeout: 60000,
            beforeSend: function () {
            },
            success: function (objResult, textStatus) {
            	var list = objResult.List;
            	if(list.length){
            		for(var i = 0; i < list.length;i++){
            			$(".option").append("<p balance="+list[i].Balance+" marId="+list[i].MerchantID+">"+list[i].Name+"</p>")
						var pstr = $(".option .search").nextAll();
						var pValue = [];
						for(var i = 0;i< pstr.length;i++){
							pValue.push(pstr.eq(i).html());
						}
	            	}
            	}
            	selfSearch(pstr,pValue);
            },
            complete: function (XMLHttpRequest, textStatus) {
				
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("错误了");
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
	};
	$("#btn").click(function(){
		if($("#key").text()=="请选择"){
			alert("请选择结算者");
			return false;
		}
		//ajax请求的参数
		var type= $("#userType option:selected").text();
		var status;
	    switch (type){
	        case "商家":
	            status=1;
	            break;
	        case "管家":
	            status=2;
	            break;
	    }
	    //结算对象编码
	    var MarchID = $("#key").attr("marId").trim();
	    //结算金额
	    var blance = parseInt($("#key").attr("balance").trim());
	    var amount = parseInt($("#money").val().trim());
	    if(amount > blance){
	    	$("#balanceTot").css("display","none");
	    	$("#blanceTip").css("display","inline-block");
	    	return false;
	    }
	    //凭证号
	    var voucher = $("#voucher").val().trim();
	    //转账时间
	    var balanceTime = $("#balanceTime").val();
		var strActionName = "Fin_AddSett";
		var arrActionParam = {
	        "Object":status,//结算对象：1商户；2管家；3平台
			"ObjectID":MarchID,//结算对象编码
			"Amount":amount,//结算金额
			"Voucher":voucher,//凭证号
			"Transfer":balanceTime,//转账时间
			"Mender":localStorage.user//操作用户编码
	   };
	    var strActionName = "Fin_AddSett";
	    var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = {strRequest: strRequest};
	    $.ajax({
	        url: jsgDataUrl + jsgDataGate,
	        type: "POST",
	        dataType: "json",
	        //cache: true,
	        data: datSubmit,
	        async: false,
	        //timeout: 60000,
	        beforeSend: function () {
	        },
	        success: function (objResult, textStatus) {
	        	if(objResult.Result == 1){
	        		alert("新增结算成功");
	        		window.location.href = "balance.html";
	        	}else{
	        		alert(objResult.Message)
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