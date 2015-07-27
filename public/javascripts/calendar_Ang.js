var calApp = angular.module('calApp',[]);


calApp.controller('calendarController',function($scope, calFactory){
    $scope.message = 'Hello calendar';
    $scope.week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    $scope.monthData = [];
    $scope.print = function(){
        console.log($scope.message);
    };
    $scope.monthData = calFactory.createDates(new Date());
    $scope.getMonth = function(){
        //get count, increment and pass to function
    }

});

calApp.factory('calFactory',function(){
    var service = {};
    var monthData = [];
    var months = ['January','February','March','April','May','June','July', 'August','September','October',
        'November', 'December'];
    //individual date object with classname and the date number, month type(prev, next)
    function dateObject(date, monthType){
        //0 prev 1 curr 2 next
        this.date = date;
        this.monthType = monthType;
    }


    service.someMsg = function(){
      console.log('Hello, Lionel Ritchie here');
    };

    service.createDates = function(curr_date){
        var topbar = document.querySelector('div.top-bar');
        topbar.firstElementChild.firstElementChild.nextElementSibling.innerHTML=''; //replace month names

        /*DATE SCROLL*/
        var monthYear =  months[curr_date.getMonth()] + ', ' + curr_date.getFullYear();

        topbar.firstElementChild.firstElementChild.nextElementSibling.innerHTML= monthYear;
        var dateList =  this.createMonthArray(curr_date);

        for(var j = 0; j < dateList.length; j++) {
            var className = '';
            //console.log(dateList[j].monthType);
            switch (dateList[j].monthType) {
                case 0:
                    className = 'date prev-month';
                    break;
                case 1:
                    className = 'date';
                    break;
                case 2:
                    className = 'date next-month';
                    break;
            }
            //createElement('div', dates, className, dateList[j].date);
            monthData.push({className: className, dateObj: dateList[j].date});
        }
        return monthData;
    };

    service.createMonthArray = function(curr_date){
        var month = [];

        var first_day = (new Date(curr_date.getFullYear(), curr_date.getMonth(),1)).getDay();
        var curr_last_date = new Date(curr_date.getFullYear(), curr_date.getMonth() + 1, 0);

        //get last day of current month
        var curr_last_day = curr_last_date.getDay();
        //get prev month lingering dates
        var prev_month_last_date = new Date(curr_date.getFullYear(), curr_date.getMonth(),0);
        for(var i = 0, len = 6 - (6 - first_day); i<len ; i++ ){
            month.unshift(new dateObject(prev_month_last_date.getDate() - i, 0));
            //console.log(month);
        }
        //get current months dates
        for(var i = 0, len = curr_last_date.getDate(); i < len ; i++ ){
            month.push(new dateObject(i+1, 1));
        }

        //get next months oncoming dates
        for(var i = 0, len = 6 - curr_last_day ; i < len ; i++) {
            month.push(new dateObject(i + 1, 2));
        }
        //console.log(month);
        return month;
    };

    return service;
});