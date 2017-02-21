$(function () {
	$(function() {
		$('select').comboSelect();
	});
	$("#voucher").on("blur",function () {
        validate($(this));
    });
    $("#money").on("blur",function () {
        validate($(this));
    });
	var data = new Date();
	data = data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
	$("#balanceTime").val(data);
	var type = $("#type option:selected").text();
	var userID = localStorage.userID;
	var type = $(".searchVariety").eq(0).text();
		alert(type);
	$("#type").change(function(){
		var type = $("#type option:selected").val();
		alert(type);
	});
	$("#btn").click(function(){
		
		switch(type){
			case "商家":
				type = "1";
				break;
			case "管家":
				type = "2";
				break;
			case "平台":
				type = "3";
				break;
		}
		
		var arrActionParam = {
			"Object":type,
			"ObjectID":"",
			"Amount":50,
			"Voucher":"131313",
			"Transfer":data,
			"Mender":userID

        }
		console.log("传入后台的参数",arrActionParam);
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
	});
});