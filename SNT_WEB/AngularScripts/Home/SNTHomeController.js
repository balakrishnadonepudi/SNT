'use strict';

angular.module('SNTHomeMain').controller('SNTHome',['$scope','$state', function($scope, $state){
    $scope.sntHomeControllerPageInIt = function(){
        
            };
        
            $scope.sntHomeNavigateTOMainHome = function(){
                $state.transitionTo('Home');
            };
        
            $scope.sntHomeNavigateTOAboutUs = function(){
                $state.transitionTo('AboutUS');
            };
        
            $scope.sntHomeNavigateTOGallary = function(){
                $state.transitionTo('Gallary');
            };
        
            $scope.sntHomeNavigateTOHowToReachSNT = function(){
                $state.transitionTo('HowToReachSNT');           
            };
        
            $scope.sntHomeNavigateTOMeetings = function(){
                $state.transitionTo('MeetingsSNT');                      
            };
        
            $scope.sntHomeControllerPageInIt();
}]);