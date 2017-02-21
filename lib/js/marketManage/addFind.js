angular.module('myModule',[
]).controller('myController',function ($scope) {

})
$(function () {
    var ue = UE.getEditor('editor',{enableAutoSave: false});
    //实时预览功能
    ue.addListener("contentChange",function () {
        $(".preview_content").html("");
        var text=document.getElementById('ueditor_0').contentWindow.document.body.innerHTML;
        $(".preview_content").append(text);
    })

    //预览按键功能
//    $(".btnPre").click(function () {
//        var text=ue.getContent();
//        $(".preview_content").append(text)
////        ue.setContent("")
//    })
    //标题,描述,图片,内容提交到后台程序
    $(function () {
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // swf文件路径
            swf: '../lib/webuploader/Uploader.swf',
            // 文件接收服务端。
            server: jsgImageUrl + jsgImageUplod,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',
            fileVal:"filPicture",
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/jpg,image/jpeg,image/png'
            },
            duplicate :true,
            method:'POST',
        });
        //富文本编辑器上传图片
        var uploader1 = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // swf文件路径
            swf: '../lib/webuploader/Uploader.swf',
            // 文件接收服务端。
            // server: 'http://imgapi.nihaott.com8015/Picture/UploadPicture',
            server: jsgImageUrl + jsgImageUplod,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker1',
            fileVal:"filPicture",
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/jpg,image/jpeg,image/png'
            },
            duplicate :true,
            method:'POST',
        });

        uploader1.on( 'uploadSuccess', function( file,response ) {
            var ShowUrl=response.ShowUrl;
            var img=document.createElement("img");
            var div=document.createElement("div");
            var p=document.createElement("p");
            var br=document.createElement("br")
            img.setAttribute("src",ShowUrl)
            var view=document.getElementById('ueditor_0').contentWindow.document.body
            view.appendChild(div);
            div.appendChild(img);
            view.appendChild(p);
            p.appendChild(br);
            div.style.width="100%";
            img.style.width="100%";
        });
        //通过回调函数取出后台返回的json数据
        function getData() {
            uploader.on( 'uploadSuccess', function( file,response ) {
                getResult(response);
            });
        }
        getData();
        function getResult(response) {
            //将参数中的saveUrl取出发送到后台
            // var SaveUrl=response.SaveUrl;
            $("#filePicker>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
            $("#filePicker>.webuploader-pick").attr("myAttr",response.SaveUrl)
        }
        $(".find_submit").click(function () {
            if (!$("#filePicker>.webuploader-pick").attr("myAttr")) {
                $('#myModal').modal('show');
                return false;
            }
            var creator=localStorage.userID;
            var strTitle= $("input[name=findTitle]").val();
            var strPicture = $("#filePicker>.webuploader-pick").attr("myAttr");
            var strDescribe= $("input[name=findDescribe]").val();
            var content=document.getElementById('ueditor_0').contentWindow.document.body;
            var strHtml= content.innerHTML;
            //后台设置的方法
            var strActionName = "Market_AddFind";
            var arrActionParam = { Creator: creator, Title: strTitle, Picture: strPicture, Describe: strDescribe, Tailor: "测试",Detail:strHtml };
            console.log(arrActionParam);
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
                    if (objResult.Result==1) {
                        window.location.href="./findList.html";
                    }else {
                        alert(objResult.Message);
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert(XMLHttpRequest.status);
                    //alert(XMLHttpRequest.readyState);
                    //alert(textStatus);
                }
            });
        })
    })

    //表单非空验证
    $("#title").focus();
    $("#title,#describe").on("blur",function () {
        validate($(this));
    })
    //动态增加表格
    function addList() {
        var title=$("input[name=findTitle]").val();
        var myDate=new Date();
        var time=myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes();
        var data={
            title: title,
            time: time,
            autor: "张三",
            status: "通过"
        }
        var tr = document.createElement("tr");
        $(".table").append(tr);
        for (var k in data) {
            var td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = data[k];
        }
    }

    //预览功能
    function preview() {
        $(".add_find").hide();
        $(".preview").show();
        var strTitle= $("input[name=findTitle]").val();
        var strDescribe= $("input[name=findDescribe]").val();
        var strHtml= ue.getContent();
        $(".preview_title").html(strTitle);
        $(".preview_describe").html(strDescribe);
        $(".preview_content").html(strHtml);
    }
    $(function () {
        $(".btn-preview").click(function () {
            preview();
        })
    })

})
