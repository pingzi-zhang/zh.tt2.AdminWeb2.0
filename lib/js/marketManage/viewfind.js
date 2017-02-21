$(function(){
	var index = location.search.substring(8);
	InitList()
	//请求数据
    function InitList(){
        //参数输入
        var arrActionParam = {
            "strFindID":index
        };
        /*console.log("传入后台的参数",arrActionParam);*/
        var strActionName = "Find_GetFindDetail";
        var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    // console.log(strRequest);
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
            success: function (objResult, textStatus) {
            	console.log("结果",objResult);
            	if(objResult.Result == 1){
            		renderValue(objResult.Model);
            	}
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, objResult, errorThrown) {
            	alert("报错了")
            	console.log(objResult);
            	console.log(XMLHttpRequest);
            }
        });
        function renderValue(obj){
        	$(".add_find p").eq(0).find("span").eq(1).html(obj.Title);
        	$(".add_find p").eq(1).find("span").eq(1).html(obj.Describe);
        	$(".img img").attr("src",obj.Picture);
        	$(".detail").html(obj.Detail);
        }
    }
})
