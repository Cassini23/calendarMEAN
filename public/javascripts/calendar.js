
var months = ['January','February','March','April','May','June','July', 'August','September','October',
    'November', 'December'];


document.addEventListener('DOMContentLoaded',function(){
    var container =  document.querySelector('.date-container');
    var curr_date = new Date();
    createDates(container, curr_date);
});


function createDates(container, curr_date){
    var topbar = document.querySelector('div.top-bar');
    var dates =  document.querySelector('div.date-container');
    topbar.firstElementChild.firstElementChild.nextElementSibling.innerHTML=''; //replace month names

    /*DATE SCROLL*/
    var monthYear =  months[curr_date.getMonth()] + ', ' + curr_date.getFullYear();

    topbar.firstElementChild.firstElementChild.nextElementSibling.innerHTML= monthYear;
    var dateList =  createMonthArray(curr_date);
    //var prev_month_last_date = new Date(curr_date.getFullYear(), curr_date.getMonth(),0);
    //var dateList =  createMonthArray(prev_month_last_date);
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
        createElement('div', dates, className, dateList[j].date);
    }

}



function createMonthArray(curr_date){
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

/**Date object**/
function dateObject(date, monthType){
    //0 prev 1 curr 2 next
    this.date = date;
    this.monthType = monthType;
}


/***Function to create element***/
function createElement(elementType, parent, className, innerHTML, custom) {
   var element = document.createElement(elementType);
   if (parent) parent.appendChild(element);
   if (className) element.className = className;
   if (innerHTML) element.innerHTML = innerHTML;
   if (typeof custom !== 'undefined') {
       for (var prop in custom) {
           element.setAttribute(prop, custom[prop]);
       }
   }
   return element;
}