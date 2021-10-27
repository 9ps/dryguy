//these prototype methods are to set and get objects to Local storage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

//selectors
const dateToday = document.querySelector('.dateToday');
const fullDate = document.querySelector('.fullDate'); //this is a test that the page is related to this day

//DATE STUFF
var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data

dateToday.textContent = today.getDate(); //get method (getDate = day of the month, day = weekday)
dateToday.style.color = 'blue';

fullDate.textContent = today.toDateString();

//setting up a "yesterday"
var yes = new Date();
yes.setDate(today.getDate() - 1);
console.log("today: ", today);
console.log("yes: ", yes);


var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data

dates = [today];
for(i = 1; i < 7; i++){
    dates[i] = new Date();
    dates[i].setDate(dates[i-1].getDate() - 1);
}

console.log("dates: ", dates);

// ISO Date 	"2015-03-25" (The International Standard)
// const randomDay = new Date("2021-02-21");
//date2.textContent = randomDay.toDateString();
// console.log(today);

//dateToday.textContent = today.toDateString();
