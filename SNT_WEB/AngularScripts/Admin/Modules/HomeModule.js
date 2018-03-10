'use strict'//Indicating browser should run only in java script mode

var SNTHomeMain = angular.module('SNTHomeMain', ['ui.router','SNTAdmin', 'SNTLogin']);

SNTHomeMain.config(function($stateProvider){
    $stateProvider
        .state({
            name:'Home',
            Url:'Home',
            views:{
                "item": {
                    templateUrl: "SNT_UI/Home/mainHome.html"
                }
            }
        })
        .state({
            name:'AboutUS',
            Url:'aboutUS',
            views:{
                "item": {
                    templateUrl: GetSNTPageURLByPageName("SNT_UI/Home/aboutUsSNT.html")
                }
            }
        })
        .state({
            name:'Gallary',
            Url:'gallary',
            views:{
                "item": {
                    templateUrl: GetSNTPageURLByPageName("SNT_UI/Home/gallary.html")
                }
            }
        })
        .state({
            name:'HowToReachSNT',
            Url:'howToReachSNT',
            views:{
                "item": {
                    templateUrl: GetSNTPageURLByPageName("SNT_UI/Home/howToReachSNT.html")
                }
            }
        })
        .state({
            name:'MeetingsSNT',
            Url:'meetingsSNT',
            views:{
                "item": {
                    templateUrl: GetSNTPageURLByPageName("SNT_UI/Home/meetingsSNT.html")
                }
            }
        })

});