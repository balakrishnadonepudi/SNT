
'use strict';

//Window.location read-only property returns a Location object with information about the current location of the document
//if u want more info --> "https//developer.mozilla.org/en-US/docs/Web/API/Window/location"
var webDomainInfo = window.location.origin + "/";

var NewTest = "";

//SOME TIME ORIGION GETTING UNDEFINED
if (!window.location.origin) {
    //window.location.protocol --> https:
    //window.location.host --> host Name
    webDomainInfo = window.location.protocol + "//" + window.location.host + "/";
}

var SNTWebRootPath = webDomainInfo;

var SNTEnvironment = "localhost";//for developement

var SNTCommonService = SNTWebRootPath + "SNT_Web_WCF_Common/SNTCommon/";

var SNTWebLoginPath = "http://" + SNTEnvironment + "/Login/" // local login path

var SNTWebHomePage = "http://" + SNTEnvironment + "/SNT_WEB/";

var SNTApplicationPath = SNTWebRootPath + "SNT_WEB/";//for local

var SNTPracticeModel;

function sntResetPracticeDetails() {
    SNTPracticeModel = { "DBServerName": "192.168.0.63", "PracticeID": 36 }; // Local server
    // SNTPracticeModel = { "DBServerName": "172.16.234.11", "PracticeID": 1 }; // production server
}

sntResetPracticeDetails();//calling to set the practice model initailly

var SNTWebLoginPage = "http://" + SNTEnvironment + "/Login/" // local login path

var SNTWebChangePasswordPage = "http://" + SNTEnvironment + "/Login/Login/PortalLoginChangePassword.html";
//var SNTWebChangePasswordPage = "http://" + SNTEnvironment + "/Login/Login/PortalLoginChangePassword.html";
//var SNTWebChangePasswordPage = webDomainInfo + "Login/PortalLoginChangePassword.html";

var SNTWebForgotPasswordPage = "http://" + SNTEnvironment + "/Login/PortalForgotPasswordRest/PortalForgotPassWordView.html";
//var SNTWebForgotPasswordPage = "http://" + SNTEnvironment + "/Login/PortalForgotPasswordRest/PortalForgotPassWordView.html";
//var SNTWebForgotPasswordPage = webDomainInfo + "PortalForgotPasswordRest/PortalForgotPassWordView.html";

var loginURL = "http://" + SNTEnvironment + "/Login/" // local login path

//TO IGNORE THE JAVASCRIPT ERRORS LIST
var errorIgnoreSendList = ["$digest", "$apply", "[alert alert-success]", "expression [Success!] starting", "unexpected token"];