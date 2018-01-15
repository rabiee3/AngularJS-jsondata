'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute', 'ngAnimate', 'chart.js']);

view1.config(function ($routeProvider, ChartJsProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });

    ChartJsProvider.setOptions({
        chartColors: ['#73ae4c', '#ec7e38'],
        responsive: false
    });

});


view1.controller('View1Ctrl', function ($scope, $location, $http,$timeout) {

    $scope.Math = window.Math;

    $scope.fetchdata = function(thedataurl){
            $http.get(thedataurl).then(function successCallback(response) {

            $scope.data = response.data;

        }, function errorCallback(response) {

        });
    }

    $scope.fetchdata('data.json');
    

    
    
    $scope.currvisible = false;

    $scope.setActive = function (item) {

        if ($scope.activeItem != item) {
            $scope.activeItem = item;
        } else {
            $scope.activeItem = null;
        }

    };

    //check overall state
    $scope.dataitem_checkstate = function (currstate, type, value1, value2, value3, value4) {

        if (currstate === "Pending") {
            return "Pending"
        } else if (currstate === "Running") {
            return "Running"
        } else {
            if (value1 == "Rejected" || value2 == "Rejected" || value3 == "Rejected" || value4 == "Rejected") {
                return "Rejected"
            } else if (type == "Build") {
                return "Complete"
            } else {
                return "Accepted"
            }
        }

    }

    //response message
    $scope.dataitem_response_message = function (type, value1, value2, value3, value4) {

        var state = $scope.dataitem_checkstate(value1, value2, value3, value4);


        var msg1;
        var msg2;
        if (state == "Pending") {

        } else if (state == "Running") {

        } else if (state == "Rejected") {


            if (value1 == "Rejected") {
                msg1 = "Change Rejected";
                msg2 = "Metrics Reduction";
            } else if (value2 == "Rejected") {
                msg1 = "Build is failing";
            } else if (value3 == "Rejected") {
                msg1 = "Change Rejected";
                msg2 = "Unit test is failing";
            } else if (value4 == "Rejected") {
                msg1 = "Change Rejected";
                msg2 = "Functional test is failing";
            }

        } else if (state == "Accepted") {
            msg1 = "Change Accepted"
            msg2 = "Auto Merged";
        } else if (state == "Complete") {
            msg2 = "Complete";
        }

        return [msg1, msg2];

    }

    //check percentage
    $scope.check_percentage = function (testspassed, totaltests) {

        if ((Math.round((testspassed / totaltests) * 100)) < 50) {
            return "Rejected"
        } else {
            return "Accepted"
        }

    }

    //check state of metrics
    $scope.metrics_checkstate = function (value1, value2, value3, value4) {

        if (value1 < 40 || value2 < 40 || value3 < 40 || value4 < 40) {
            return "Rejected"
        } else {
            return "Accepted"
        }
    }

    //check values of metrics
    $scope.metrics_checkvalue = function (thevalue) {
        if (thevalue > 60) {
            return "good"
        } else if (thevalue < 40) {
            return "bad"
        } else if (thevalue >= 40 && thevalue <= 60) {
            return "average"
        }
    }

});

view1.directive('headerTemplate', function () {
    return {
        templateUrl: 'view1/header-template.html'
    };
});