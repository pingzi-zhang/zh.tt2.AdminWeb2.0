var jsgSiteHost = window.location.protocol + "//" + window.location.host;
//var jsgVistHost = "http://localhost:6673/Gate/VisitChannel";
var jsgHtmlHost = "http://localhost:7129/Gate/VisitChannel";
//var jsgPicHost = "http://localhost:7419/Picture/UploadPicture";
var jsgVistHost = "http://apptest.nihaott.com/Gate/VisitChannel";
var jsgPicHost = "http://imgapi.nihaott.com:8015/Picture/UploadPicture";
var jsgPartnerID = "A001";
var jsgApplyID = "zhtt2hvAppApi2_1.0";
var jsgSignKey = "1234567812345678";
function GetRandomString(intLength) {
    intLength = intLength || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < intLength; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
//获取字符串字节长度
function GetStringByteLength(val) {
    var Zhlength = 0;// 全角
    var Enlength = 0;// 半角

    for (var i = 0; i < val.length; i++) {
        if (val.substring(i, i + 1).match(/[^\x00-\xff]/ig) != null)
            Zhlength += 1;
        else
            Enlength += 1;
    }
    // 返回当前字符串字节长度
    return (Zhlength * 2) + Enlength;
}
function GetTimeStamp() {
    var dtmNow = new Date();
    dtmNow.setMinutes(dtmNow.getMinutes() + dtmNow.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
    //alert(dtmNow.toLocaleString());
    return dtmNow.getTime().toString();
}
function GetNowTime() {
    var dtmNow = new Date();
    var dtmUtc = new Date(dtmNow.toUTCString());
    var strYear= dtmUtc.getFullYear();    //获取完整的年份(4位,1970-????)
    var strMonth = dtmUtc.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var strDay = dtmUtc.getDate();        //获取当前日(1-31)
    var strHours = dtmUtc.getHours();       //获取当前小时数(0-23)
    var strMinutes = dtmUtc.getMinutes();     //获取当前分钟数(0-59)
    var strSeconds = dtmUtc.getSeconds();     //获取当前秒数(0-59)
    return strYear.toString() + "-" + strMonth.toString() + "-" + strDay.toString() + " " + strHours.toString() + ":" + strMinutes.toString() + ":" + strSeconds.toString();
}
function GetFormatTime(dtmTT) {
    var strYear = dtmTT.getFullYear();    //获取完整的年份(4位,1970-????)
    var strMonth = dtmTT.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var strDay = dtmTT.getDate();        //获取当前日(1-31)
    var strHours = dtmTT.getHours();       //获取当前小时数(0-23)
    var strMinutes = dtmTT.getMinutes();     //获取当前分钟数(0-59)
    var strSeconds = dtmTT.getSeconds();     //获取当前秒数(0-59)
    return strYear.toString() + "-" + strMonth.toString() + "-" + strDay.toString() + " " + strHours.toString() + ":" + strMinutes.toString() + ":" + strSeconds.toString();
}
function GetSignMd5(strApplyID, strKey, strActionName, strActionParam, strTimeStamp) {
    var strRequest = strApplyID;
    strRequest += "&" + strKey;
    strRequest += "&" + strActionName;
    strRequest += "&" + strActionParam;
    strRequest += "&" + strTimeStamp;
    return CryptoJS.MD5(strRequest);//$.md5(strRequest)
}

function GetString(objValue) {
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return "";
    } else {
        return objValue;
    }
}
function GetInt(objValue) {
    var intValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return 0;
    } else {
        intValue = parseInt(objValue);
    }
    return intValue;
}
function GetFloat(objValue) {
    var fltValue = 0;
    if (objValue + "$" == "$" || objValue + "$" == "null$" || objValue + "$" == "undefined$") {
        return 0;
    } else {
        fltValue = parseFloat(objValue);
    }
    return fltValue;
}
function GetNowTime1() {
    var dtmNow = new Date();
    var strYear = dtmNow.getFullYear();    //获取完整的年份(4位,1970-????)
    var strMonth = dtmNow.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    var strDay = dtmNow.getDate();        //获取当前日(1-31)
    var strHours = dtmNow.getHours();       //获取当前小时数(0-23)
    var strMinutes = dtmNow.getMinutes();     //获取当前分钟数(0-59)
    var strSeconds = dtmNow.getSeconds();     //获取当前秒数(0-59)
    var strMilliseconds = dtmNow.getMilliseconds();
    return strYear.toString() + "-" + strMonth.toString() + "-" + strDay.toString() + " " + strHours.toString() + ":" + strMinutes.toString() + ":" + strSeconds.toString() + " " + strMilliseconds;
}
