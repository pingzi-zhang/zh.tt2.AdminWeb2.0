$(function () {
	window.parent.document.title=document.title;
    var _index;
    var $this;
    var pageIndex = 0;
    var pageSize = 9;
    var maxentries; //总条目数
    //获取记录total
    var arrActionParam = {
        "Mobile":"",
		"Name":"",
		"Skip":pageIndex*pageSize,
    	"Take":pageSize
    };
    var strActionName = "Member_GetSalesManPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = {strRequest: strRequest};
    /*$.ajax({
        url: jsgDataUrl + jsgDataGate,
        type: "POST",
        dataType: "json",
        //cache: true,
        data: datSubmit,
        async: false,
        //timeout: 60000,
        beforeSend: function () {
        	$("#no-tit").css("display","none");
        	$("#loadImg").css("display","block");
        },
        success: function (objResult, textStatus) {
        	maxentries = objResult.Total;
        }
    });*/
    /*$(function () {
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
               "Mobile":"",
				"Name":"",
				"Skip":pageIndex*pageSize,
		    	"Take":pageSize
		    };
		    var strActionName = "Member_GetSalesManPage";
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
	            	$("#loadImg").css("display","none");
             		var lists=objResult.List;
                    if(lists){
                    	if(lists.length > 0){
                    		$(".page").css("display","block");
                        	$(".no-tit").css("display","none");
                        	var html=template("template",{items:lists});
		                    $(".table tbody").html(html);
		                    for(var i = 0;i < lists.length;i++){
		                    	if(lists[i].StatusName != "已提交"){
		                    		$("table tr").eq(i).find("a").remove();
		                    	}
		                    }
		                    $("table>tbody>tr>td>.audit").click(function () {
		                    	$this = $(this);
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
    })*/
	/*//拒绝原因的填写
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
                $this.parent().find("a").remove();
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    })*/
     $("#search").click(function () {
     	$(this).html("正在查询");
	    var status= $(".status option:selected").text();
	    switch (status){
	        case "全部":
	            status="-99";
	            break;
	        case "已提交":
	            status="0";
	            break;
	        case "已完成":
	            status="1";
	            break;
	        case "已拒绝":
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
	    console.log("参数",arrActionParam);
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
		                    	$("#search").html("查询");
		                    	var lists=objResult.List;
			                    if(lists){
			                    	if(lists.length > 0){
			                    		$(".page").css("display","block");
			                        	$(".no-tit").css("display","none");
			                        	var html=template("template",{items:lists});
					                    $(".table tbody").html(html);
					                    for(var i = 0;i < lists.length;i++){
					                    	if(lists[i].StatusName != "已提交"){
					                    		$("table tr").eq(i).find("a").remove();
					                    	}
					                    }
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
     $("#addOrder").click(function(){
     	window.location.href = "addStewardInfo.html";
     });
});