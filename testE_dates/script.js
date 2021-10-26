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


//DATE STUFF
var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// ISO Date 	"2015-03-25" (The International Standard)
// const randomDay = new Date("2021-02-21");
//date2.textContent = randomDay.toDateString();
// console.log(today);

date.textContent = today.toDateString();
dateToday.textContent = today.getDate(); //get method (date = day of the month, day = weekday)




save.addEventListener('click', saveBeer)