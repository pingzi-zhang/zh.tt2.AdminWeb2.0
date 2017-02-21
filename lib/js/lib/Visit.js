var jspPartnerID = "A001";
var jspApplyID = "zhtt2hvAdmApi2_1.0";
var jspSignKey = "1234567812345678";
function GetSignMd5(strActionName, strActionParam, strTimeStamp, jspAppID) {
    var strSign = jspAppID;
    strSign += "&" + jspSignKey;
    strSign += "&" + strActionName;
    strSign += "&" + strActionParam;
    strSign += "&" + strTimeStamp;
    return CryptoJS.MD5(strSign);//$.md5(strRequest)
}

function GetVisitData(strActionName, strActionParam) {
    var arrVisitValue = { PartnerID: jspPartnerID, ApplyID: jspApplyID, ActionName: strActionName, ActionParam: strActionParam };
    var strVisitValue = JSON.stringify(arrVisitValue);
    var strVisitID = GetRandomString(16);
    strVisitValue = CryptoJS.AES.encrypt(strVisitValue, CryptoJS.enc.Utf8.parse(strVisitID), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    strVisitValue = encodeURI(strVisitValue);
    strVisitValue = strVisitValue.replace(/\ /g, '%2B');
    strVisitValue = strVisitValue.replace(/\=/g, '%4S');
    var strTimeStamp = GetTimeStamp();
    var strSign = GetSignMd5(strActionName, strActionParam, strTimeStamp.toString(), jspApplyID);
    var arrRequest = { VisitID: strVisitID, VisitValue: strVisitValue, TimeStamp: strTimeStamp.toString(), Sign: strSign.toString() };
    var strRequest = JSON.stringify(arrRequest);
    return strRequest;
}