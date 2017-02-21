$(function () {
	window.parent.document.title=document.title;
	//时间选择控件初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01",
		maxDate:jeDate.now(0)
	})
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpend",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01",
		maxDate:jeDate.now(0)
	})
    var _index;
    var $this;
    var pageIndex = 0;
    var pageSize = 9;
    var maxentries; //总条目数
    var inpstart = $('#inpstart').val();
	var inpend = $('#inpend').val();
    //获取记录total
    var arrActionParam = {
    	"Name":"",
        "Status":-99,
		"Start":inpstart,
		"End":inpend,
		"Skip":pageIndex*pageSize,
    	"Take":pageSize
    };
    var strActionName = "Report_GetProductSaleReport";
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
        timeout: ajaxTimeout,
        beforeSend: function () {
        	$("#no-tit").css("display","none");
        	$("#loadImg").css("display","block");
        },
        success: function (objResult, textStatus){
        	maxentries = objResult.Total;
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
		    	"Name":"",
				"Start":inpstart,
		    	"End":inpend,
				"Skip":pageIndex*pageSize,
		    	"Take":pageSize
            };
	        var strActionName = "Report_GetProductSaleReport";
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
	            timeout: ajaxTimeout,
	            beforeSend: function () {
	            },
	            success: function (objResult, textStatus){
        			$("#loadImg").css("display","none");
             		var lists=objResult.List;
             		console.log("lists",lists);
                    if(lists){
                    	if(lists.length > 0){
                    		$(".page").css("display","block");
                        	$(".no-tit").css("display","none");
                        	$(".page>p>span").html(objResult.Total);
                        	var html=template("template",{items:lists});
		                    $(".table tbody").html(html);
                        }else{
                        	$(".table tbody tr").remove();
                        	$(".page").css("display","none");
                        	$(".no-tit").css("display","block");
                        }
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
    $("#search").click(function () {
    	$(this).html("正在查询");
    	var inpstart = $('#inpstart').val();
		var inpend = $('#inpend').val();
	    var proName = "";
	    if($('#proName').val().trim()){
	    	proName = $('#proName').val().trim();
	    }
	    var arrActionParam = {
	    	"Name":proName,
			"Start":inpstart,
	    	"End":inpend,
			"Skip":pageIndex*pageSize,
	    	"Take":pageSize
	    };
	    /*console.log("传入后台的参数",arrActionParam);*/
	    var strActionName = "Report_GetProductSaleReport";
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
	        timeout: ajaxTimeout,
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
		                    "Name":proName,
							"Start":inpstart,
					    	"End":inpend,
							"Skip":pageIndex*pageSize,
					    	"Take":pageSize
		                };
		                var strActionName = "Report_GetProductSaleReport";
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
		                    timeout: ajaxTimeout,
		                    beforeSend: function () {
		                    },
		                    success: function (objResult,textStatus) {
		                    	$("#search").html("查询");
		                    	var lists=objResult.List;
			                    if(lists){
			                    	if(lists.length > 0){
			                    		$(".page").css("display","block");
			                        	$(".no-tit").css("display","none");
			                        	$(".page>p>span").html(objResult.Total);
			                        	var html=template("template",{items:lists});
					                    $(".table tbody").html(html);
			                        }else{
			                        	$(".table tbody tr").remove();
			                        	$(".page").css("display","none");
			                        	$(".no-tit").css("display","block");
			                        }
			                    }else{
			                    	alert(objResult.Message);
			                    }
		                    }
		                })
			        }
	        	})
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
	})

});