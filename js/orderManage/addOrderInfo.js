$(function(){
	window.parent.document.title=document.title;
	$("#name").click(function(){
		$('#myModal').modal('show');
		renderT();
	});
	$("#myModal .modal-body").on("click","s",function(){
		$("#myModal .modal-body tbody s").removeClass("on");
		$(this).addClass("on");
	});
	//添加产品的弹框
	$("#addPro").bind("click",function(){
		renderPro();
	});
	//菜品的弹出框的多选框
	$("#addProModal .table tbody").bind("click","s",function(event){
		if($(event.target).hasClass("flag")){
			$(event.target).toggleClass("on");
		}
	});
	//下一步的按钮的点击时间
	$("#nextbtn").click(function(){
		var listtr = $("#table tbody tr");
		var listArr = [];
		var money = 0;
	    for(var i = 0; i < listtr.length;i++){
	    	var listObj = {};
	    	listObj.FirstUrl = listtr.eq(i).find("td").eq(0).find("img").attr("src");
	    	listObj.Name = listtr.eq(i).find("td").eq(0).find("span").text();
	    	listObj.Number = listtr.eq(i).find("td").eq(1).text();
	    	listObj.SellPrice = listtr.eq(i).find("td").eq(2).text();
	    	listObj.Tatol = listtr.eq(i).find("td").eq(3).text();
	    	money += parseFloat(listObj.Tatol);
	    	listArr.push(listObj);
	    }
	    if(listArr.length <= 0){
	    	alert("请先添加产品信息");
	    	return false;
	    }
	    var tailorID = $("#name").attr("data")
		window.location.href = "addOrderDetail.html?TailorID="+tailorID+"&list="+listArr+"&money="+money;
	});
	//将主界面的菜单存入数组
	//渲染管家列表
	function renderT(){
	    var pageIndex = 0;
	    var pageSize = 6;
	    var maxentries; //总条目数
	    var name = $('#TName').val();
	    //获取记录total
	    var arrActionParam = {
	    	"Name":name,
			"Skip":pageIndex*pageSize,
	    	"Take":pageSize
	    };
	    var strActionName = "Order_GetTailorPage";
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
			    	"Name":name,
					"Skip":pageIndex*pageSize,
			    	"Take":pageSize
	            };
		        var strActionName = "Order_GetTailorPage";
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
	             		var lists=objResult.List;
	                    if(lists){
	                    	if(lists.length > 0){
	                    		$(".page").css("display","block");
	                        	$(".page>p>span").html(objResult.Total);
	                        	var html=template("steward",{items:lists});
			                    $("#myModal .table tbody").html(html);
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
	}
	$("#search").click(function () {
		renderT();
	})
	$("#okBtn").click(function(){
		var $current = $("#myModal .modal-body tbody s").filter(".on");
		var $tr = $current.parent().parent();
		$("#name").val($tr.find("td").eq(1).text());
		$("#name").attr("data",$tr.find("td").eq(0).attr("data"));
		$('#myModal').modal('hide');
	});
	function renderPro(){
	    var pageIndex = 0;
	    var pageSize = 6;
	    var maxentries; //总条目数
	    //获取记录total
	    var arrActionParam = {
	    	"TailorID":$("#name").attr("data")
	    };
	    if(!$("#name").attr("data")){
	    	alert("请先选择一名管家");
	    	return false;
	    }else{
	    	$('#addProModal').modal('show');
	    }
	    var strActionName = "Order_GetTailorSellList";
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
			    	"TailorID":$("#name").attr("data")
	            };
		        var strActionName = "Order_GetTailorSellList";
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
	             		var lists=objResult.List;
	                    if(lists){
	                    	if(lists.length > 0){
	                    		$(".page").css("display","block");
	                        	$(".page>p>span").html(objResult.Total);
	                        	var html=template("template-tr",{items:lists});
			                    $("#addProModal .table tbody").html(html);
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
	}
	/*当输入数量时总金额随着改变*/
	$("#addProModal").on("blur",".number",function(){
		$(this).parent().next().html($(this).val()*$(this).parent().prev().text());
	})
	
    
	//添加菜品的保存按钮
	$("#okBtn1").click(function(){
		var listtr = $("#addProModal .table tbody s[class*='on']").parent().parent();
		if(listtr.length>0){
			$("#empty").css("display","none");
			var listArr = [];
			var money = 0;
		    for(var i = 0; i < listtr.length;i++){
		    	var listObj = {};
		    	listObj.FirstUrl = listtr.eq(i).find("td").eq(1).find("img").attr("src");
		    	listObj.Name = listtr.eq(i).find("td").eq(2).text();
		    	listObj.Number = listtr.eq(i).find("td").eq(4).find("input").val();
		    	listObj.SellPrice = listtr.eq(i).find("td").eq(3).text();
		    	listObj.Tatol = listtr.eq(i).find("td").eq(5).text();
		    	listArr.push(listObj);
		    	money += parseFloat(listObj.Tatol);
		    }
		    var html=template("main-tr",{items:listArr});
			$("#table tbody").html(html);
			$("#total").css("display","block");
			$("#total em").html(money);
		}
		$("#addProModal").modal('hide');
	});
	//主页面的表格操作
	tableEdit();
	function tableEdit(){
		$("#table tbody").on("click",".Del",function(){
			$(this).parent().parent().remove();
			var totPTd = $("#table .totlPrice");
			var money = 0;
			for(var i = 0; i < totPTd.length;i++){
				money +=parseFloat(totPTd.eq(i).html()) ;
			}
			$("#total em").html(money);
		});
		$("#table tbody").on("click",".edit",function(){
			var $numTd = $(this).parent().parent().find("td").eq(1);
			$numTd.html("<input type='text' value='"+$numTd.text()+"'/>");
		});
		$("#table tbody").on("blur","input",function(){
			var val = $(this).val();
			var $priceTd = $(this).parent().next();
			$priceTd.next().html(val * $priceTd.text());
			$(this).parent().html(val);
			var totPTd = $("#table .totlPrice");
			var money = 0;
			for(var i = 0; i < totPTd.length;i++){
				money +=parseFloat(totPTd.eq(i).html()) ;
			}
			$("#total em").html(money);
		});
		//新增加按钮
		$("#addBtn").click(function(){
			$("#addProModal").modal('show');
			$("#addProModal tbody s").removeClass("on");
			//统计主界面的菜单
			var listtr = $("#table tbody").find("tr");
			var listArr = [];
			var money = 0;
			var modelName = $("#addProModal .table tbody tr");
		    for(var i = 0; i < listtr.length;i++){
		    	var name = listtr.eq(i).find("td").eq(0).find("span").text();
		    	for(var j = 0; j < modelName.length;j++){
		    		if(name == modelName.eq(j).find("td").eq(2).text()){
		    			modelName.eq(j).find("s").addClass("on");
		    			modelName.eq(j).find("input").val(listtr.eq(i).find("td").eq(1).text());
		    			break;
		    		}
		    	}
		    }
		});
	}
	
})
