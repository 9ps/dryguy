//these prototype methods are to set and get objects to Local storage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

// SELECTORS
// const dateToday = document.querySelector('.dateToday');
// const fullDate = document.querySelector('.fullDate'); //this is a test that the page is related to this day
// const dates = document.querySelector('.dates');

//DATE STUFF
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data



dates = [today];

/* <div class="date dateToday">
<div class="cactus">🌵</div>
<div class="dayText">Fri</div>
<div class="dateText">04</div>
</div> */


// var dateThing = document.createElement('div');
// dateThing.className = 'dateText';
// dateThing.textContent = dates[0].getDate();
// document.querySelector('.dates').appendChild(dateThing);

// var dateThing = document.createElement('div');
// dateThing.className = 'dateText';
// dateThing.textContent = dates[0].getDate();
// document.querySelector('.dates').appendChild(dateThing);

// var dateThing = document.createElement('div');
// dateThing.className = 'dateText';
// dateThing.textContent = dates[0].getDate();
// document.querySelector('.dates').appendChild(dateThing);


var dates = [];

for(i = 0; i < 7; i++){
    if(dates.length == 0) {
        console.log("ran");
        dates = [today];
    } else {
        dates[i] = new Date();
        dates[i].setDate(dates[i-1].getDate() - 1);
    }

    var dateThing = document.createElement('div');
    dateThing.className = 'date';
    document.querySelector('.dates').appendChild(dateThing);
    
    var isCactus;
    if(dates[i].getDay() == 2 || dates[i].getDay() == 4) {
        isCactus = "🌵";
    } else {
        isCactus = "";
    }

    var dayCactus = document.createElement('div');
    dayCactus.className = 'dayCactus';
    dayCactus.textContent = isCactus;
    
    var dayText = document.createElement('div');
    dayText.className = 'dayText';
    dayText.textContent = daysOfTheWeek[dates[i].getDay()];
    
    var dateText = document.createElement('div');
    dateText.className = 'dateText';
    dateText.textContent = dates[i].getDate();
    
    dateThing.appendChild(dayCactus);
    dateThing.appendChild(dayText);
    dateThing.appendChild(dateText);
    


    // var dateThing = document.createElement('div');
    // dateThing.className = 'dateText';
    // dateThing.textContent = dates[i].getDate();
    // document.querySelector('.dates').appendChild(dateThing);

}

// console.log("dates: ", dates);