$(function () {
	window.parent.document.title=document.title;
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
    var $currentTr;;
    var pageIndex = 0;
    var pageSize = 9;
    var maxentries; //总条目数
    //获取记录total
    var arrActionParam = {
        "Status":-99,
		"StartDate":"1900-01-01",
    	"EndDate":"1900-01-01",
		"Skip":pageIndex*pageSize,
    	"Take":pageSize
    };
    var strActionName = "Fin_GetSettPage";
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
            num_display_entries: 9,//连续分页主体部分分页条目数
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
	        var strActionName = "Fin_GetSettPage";
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
		                    var $tr = $(".table tbody tr");
		                    for(var i = 0; i < $tr.length;i++){
		                    	if($tr.eq(i).attr("data")=="已作废"){
		                    		$tr.eq(i).find("td:nth-last-of-type a").eq(0).css("visibility","hidden");
		                    	}
		                    }
		                    $("table>tbody>tr>td>.audit").click(function () {
		                    	$currentTr = $(this);
		                        if($(this).text()=="作废"){
		                        	$('#myModal').modal('show');
		                        	$("#myModal .MerchantName").html($(this).parent().attr("name"));
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
        }
    })
	//已作废
    $("#auditBtn").click(function () {
        var arrActionParam = {
        	"SettID":$currentTr.parent().attr("data")
        };
        var strActionName="Fin_InvalidSett";
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
                $currentTr.parent().parent().find("td").eq(5).html("已作废");
                $currentTr.html("已作废");
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
	        case "已结算":
	            status="1";
	            break;
	        case "已作废":
	            status="-1";
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
	    var strActionName = "Fin_GetSettPage";
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
			            num_display_entries: 9,//连续分页主体部分分页条目数
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
		                var strActionName = "Fin_GetSettPage";
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
					                    var $tr = $(".table tbody tr");
					                    for(var i = 0; i < $tr.length;i++){
					                    	if($tr.eq(i).attr("data")=="已作废"){
					                    		$tr.eq(i).find("td:nth-last-of-type a").eq(0).css("visibility","hidden");
					                    	}
					                    }
					                    $("table>tbody>tr>td>.audit").click(function () {
					                    	$currentTr = $(this);
					                        if($(this).text()=="作废"){
					                        	$('#myModal').modal('show');
					                        	$("#myModal .MerchantName").html($(this).parent().attr("name"));
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