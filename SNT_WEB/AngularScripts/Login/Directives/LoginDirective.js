// /// <reference path="C:\Users\balakrishna.donepudi.KJSYSTEMS\Desktop\SNT_WEB\SNT_WEB\Scripts/angular.js" />

'use strict';

angular.module('SNTLogin').directive('loginPage', function () {

    return ({
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: GetSNTPageURLByPageName("SNT_UI/Login/LOGIN.html"),//359
        controller: "logincontroller",//controller to bind
        bindToController: true,//
        scope: {
            /* NOTE: Normally I would set my attributes and bindings
            to be the same name but I wanted to delineate between 
            parent and isolated scope. */
            //isolatedAttributeFoo:'@attributeFoo',
            emrPatientChartOptions: '=options',//this is readed from the controller
            // isolatedExpressionFoo:'&'
        },

        link: {

            //this method executes when the link function has started
            pre: function preLink($scope, $iElement, $iAttrs, $controller) {

            },
            //after compilation/binding of the data has completed this method is executed
            post: function postLink($scope, $iElement, $iAttrs, $controller) {

            }
        },
    });
}).controller('logincontroller', function () {

});
