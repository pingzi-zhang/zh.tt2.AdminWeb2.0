$(function () {
	//时间选择控件初始化
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
    var _index;
    var pageIndex = 0;
    var pageSize = 10;
    var maxentries; //总条目数
    //获取记录total
    var arrActionParam = {
        "Status":-99,
		"StartDate":"1900-01-01",
    	"EndDate":"1900-01-01",
		"Skip":pageIndex*pageSize,
    	"Take":pageSize
    };
    var strActionName = "Fin_GetCashPage";
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
        	maxentries = objResult.Total;
        }
    });
    $(function () {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries: 10,//连续分页主体部分分页条目数
            current_page: pageIndex,//当前页索引
            num_edge_entries: 1//两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
            InitList(index);
        }
        //请求数据
        function InitList(pageIndex) {
            var arrActionParam = {
                "Status":-99,
				"StartDate":"1900-01-01",
    			"EndDate":"1900-01-01",
				"Skip":pageIndex*pageSize,
                "Take":pageSize
            };
	        var strActionName = "Fin_GetCashPage";
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
             		var lists=objResult.List;
                    if(lists){
                    	if(lists.length > 0){
                    		$(".page").css("display","block");
                        	$(".no-tit").css("display","none");
                        	var html=template("template",{items:lists});
		                    $(".table tbody").html(html);
		                    $("table>tbody>tr>td>.audit").click(function () {
		                    	_index = $(this).parent().parent().find("td:first-child").html();
		                        if ($(this).text()=="转账") {
		                            window.location.href = "cashInfo.html?index="+_index+"";
		                        }else if($(this).text()=="拒绝"){
		                        	$('#myModal').modal('show');
		                        }
		                    })
                        }else{
                        	$(".table tbody tr").remove();
                        	$(".page").css("display","none");
                        	$(".no-tit").css("display","block");
                        }
                    }else{
                    	alert(textStatus);
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
	        //查询功能
        }
    })
	//拒绝原因的填写
    $("#okBtn").click(function () {
        var arrActionParam = {
        	"CashID":_index,
            "Reason":$("#myModal textarea").val(),
			"Mender":localStorage.user
        };
        var strActionName="Fin_CashRefuse";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl + jsgDataGate,
            type: "POST",
            dataType: "json",
            data: datSubmit,
            async: true,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                $('#myModal').modal('hide');
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    })
     $("#search").click(function () {
	    var status= $(".status option:selected").text();
	    switch (status){
	        case "全部":
	            status="0";
	            break;
	        case "已提交":
	            status="1";
	            break;
	        case "已完成":
	            status="2";
	            break;
	        case "已拒绝":
	            status="3";
	            break;
	    }
	    var inpstart = $('#inpstart').val();
		var inpend = $('#inpend').val();
	    var arrActionParam = {
	        "Status":status,
	        "StartDate":inpstart,
			"EndDate":inpend,
			"Skip":pageIndex*pageSize,
	        "Take":pageSize
	    };
	    var strActionName = "Fin_GetCashPage";
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
	        	maxentries = objResult.Total;
	        	$(function(){
	        		$(".pagination").pagination(maxentries, {
			            callback: PageCallback,
			            prev_text: '上一页',
			            next_text: '下一页',
			            items_per_page: pageSize,//每页显示的条目数
			            num_display_entries: 10,//连续分页主体部分分页条目数
			            current_page: pageIndex,//当前页索引
			            num_edge_entries: 1//两侧首尾分页条目数
			        });
			        //翻页调用
			        function PageCallback(index, jq) {
			            InitList(index);
			        }
			        //请求数据
			        function InitList(pageIndex) {
			        	var arrActionParam = {
		                    "Status":status,
			                "StartDate":inpstart,
		    				"EndDate":inpend,
							"Skip":pageIndex*pageSize,
			                "Take":pageSize
		                };
		                var strActionName = "Fin_GetCashPage";
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
		                    	var lists=objResult.List;
			                    if(lists){
			                    	if(lists.length > 0){
			                    		$(".page").css("display","block");
			                        	$(".no-tit").css("display","none");
			                        	var html=template("template",{items:lists});
					                    $(".table tbody").html(html);
					                    $("table>tbody>tr>td>.audit").click(function () {
					                    	_index = $(this).parent().parent().find("td:first-child").html();
					                        if ($(this).text()=="转账") {
					                            window.location.href = "cashInfo.html?index="+_index+"";
					                        }else if($(this).text()=="拒绝"){
					                        	$('#myModal').modal('show');
					                        }
					                    })
			                        }else{
			                        	$(".table tbody tr").remove();
			                        	$(".page").css("display","none");
			                        	$(".no-tit").css("display","block");
			                        }
			                    }else{
			                    	alert(textStatus);
			                    }
		                    }
		                })
			        }
	        	})
	        },
	        complete: function (XMLHttpRequest, textStatus) {
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            // alert(XMLHttpRequest.status);
	            // alert(XMLHttpRequest.readyState);
	            // alert(textStatus);
	        }
	    });
	})
     $("#myModal textarea").bind("focus",function(){
     	$(this).html("");
     })
});