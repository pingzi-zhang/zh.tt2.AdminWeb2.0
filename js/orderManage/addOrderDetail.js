$(function(){
	//接待时间-时间选择控件初始化
    $.jeDate('#play',{format:"YYYY-MM-DD hh:mm"});
    $.jeDate('#playTime',{format:"YYYY-MM-DD hh:mm"});
    //时间选择控件初始化
    var play = {
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        ishmsVal: false,
        maxDate: '2099-06-30 23:59:59', //最大日期
        choosefun: function (elem, datas) {
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var playTime = {
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function (elem, datas) {
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    
    $('#play').jeDate(play);
    $('#playTime').jeDate(playTime);
    //城市级联
    $('#element_id').cxSelect({
	  url: '../../lib/jQuery.cxSelect-1.3.11/js/cityData.min.json',               // 如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
	  selects: ['province', 'city', 'area'],  // 数组，请注意顺序
	  emptyStyle: 'none'
	});
	$.cxSelect.defaults.url = '../../lib/jQuery.cxSelect-1.3.11/js/cityData.min.json';
	$.cxSelect.defaults.emptyStyle = 'none';
	//表单的非空验证
	$("#payNum,#evidenceNo").on("blur",function () {
        validate($(this));
  	});
  	//应付金额
  	$("#payMoney").on("blur",function(){
    	var paymoney = $(this).val();
    	if(!paymoney){
    		$(this).next().css("display","inline-block");
    		$(this).focus();
    		$(this).next().html("金额不能为空");
  			return false;
    	}else if(!(/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(paymoney))){ 
    		$(this).next().css("display","inline-block");
    		$(this).focus();
	        $(this).next().html("格式不正确"); 
	        return false; 
	    }else{
	    	$(this).next().css("display","none");
        	return true;
	    }
    })
  //手机号的验证
    $("#tel").on("blur",function(){
    	var phone = $(this).val();
    	if(!phone){
    		$(this).next().css("display","inline-block");
    		$(this).focus();
    		$(this).next().html("手机号码不能为空");
  			return false;
    	}else if(!(/^1[34578]\d{9}$/.test(phone))){ 
    		$(this).next().css("display","inline-block");
    		$(this).focus();
	        $(this).next().html("手机号码格式不正确"); 
	        return false; 
	    }else{
	    	$(this).next().css("display","none");
        	return true;
	    }
    })
    //身份证验证
    $("#idInfo").on("blur",function(){
    	var identity = $(this).val();
    	var isIDCard1=/^[0-9]{17}[0-9|xX]{1}$/;
    	if(!identity){
    		$(this).next().css("display","inline-block");
    		$(this).focus();
    		$(this).next().html("身份证号码不能为空");
  			return false;
    	}else if(!(isIDCard1.test(identity))){ 
    		$(this).next().css("display","inline-block");
    		$(this).focus();
	        $(this).next().html("格式不正确"); 
	        return false; 
	    }else{
	    	$(this).next().css("display","none");
        	return true;
	    }
    })
    //管家选择
})
