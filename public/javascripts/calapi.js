(function(){
   angular.module('calendarApp',[]);
    angular.module('calendarApp')
        .controller('calendarMainCtrl',['$scope', calendarMainCtrl]);



    function calendarMainCtrl($scope){
        $scope.message = 'Hello';
        //console.log($scope.message);
        $scope.week = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        $scope.months = ['January','February','March','April','May','June','July', 'August','September','October',
            'November', 'December'];
    }
}());