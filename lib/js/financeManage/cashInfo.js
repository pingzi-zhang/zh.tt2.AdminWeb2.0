$(function () {
    var cashID = $.getUrlParam("index");
	$("#goBack").click(function(){
		window.location.href = "cashManage.html";
	});
	$("#cashEvidence").focus();
	$("#cashEvidence").on("blur",function () {
        validate($(this));
    });
	var data = new Date();
	data = data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
	$("#cashTime").val(data);
	$("#submitBtn").click(function () {
		var arrActionParam = {
			"CashID":cashID,
            "Voucher":$("#cashEvidence").val(),
			"Transfer":$("#cashTime").val(),
			"Mender":localStorage.user
        }
		var strActionName = "Fin_CashTransfer";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = {strRequest: strRequest};
        if($("#cashEvidence").val()){
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
	            success: function (objResult, textStatus) {
	            	if(objResult.Result == 1){
	            		window.location.href = "drawSuccess.html";
	            	}
	            },
	            complete: function (XMLHttpRequest, textStatus) {
	
	            },
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	                alert(XMLHttpRequest.status);
	                alert(XMLHttpRequest.readyState);
	                alert(textStatus);
	            }
	
	        });
        }else{
        	$("#cashEvidence").focus();
        }
    });
});