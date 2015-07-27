(function(){
   angular.module('calendarApp')
       .directive('calendar', calendar);

    function calendar(){
        return{
            restrict:'AE',
            scope: true,
            templateUrl:'/views/calTemplate.html',
            controller: calendarCtrl,
            controlllerAs: 'vm'
        }
    }

    function calendarCtrl($scope){
        console.log($scope.message);

    }
    function currMonthService(){

    }
}());