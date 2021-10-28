//these prototype methods are to set and get objects to Local storage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

// SELECTORS


//IMPORTANT VARIABLES

//DATE STUFF
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var d = new Date(); //right now
var selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data

var dates = [];

for(i = 0; i < 7; i++){ //big loop creating the [dates] and formatting the calender
    if(dates.length == 0) {
        dates = [selectedDate];
    } else {
        dates[i] = new Date();
        dates[i].setDate(dates[i-1].getDate() - 1);
    }

    var dateThing = document.createElement('div');
    dateThing.className = 'date';
    document.querySelector('.datesScroll').appendChild(dateThing);
    
    var isCactus; //simple thing that adds cactus to Tue and Thu
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
    
    var dateText = document.createElement('button');
    dateText.className = 'dateText';
    dateText.id = i; //dunno if this should be the date string, i think not
    dateText.textContent = dates[i].getDate();

    dateThing.appendChild(dayCactus);
    dateThing.appendChild(dayText);
    dateThing.appendChild(dateText);
}    

//TEMP THING
//need to loop through this at the start to fill dates if they dont already exist...
//or, if i click it, i could create it if it doesnt exist??
localStorage.setObject(dates[0].toJSON(), { 'drinks': 100, 'triggers': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });


//DATE SWITCHER
var dayData;
const fullDate = document.querySelector('.fullDate');
const drinksLoggedDisplay = document.querySelector('.drinksLoggedDisplay');
var dateTexts = document.querySelectorAll('.dateText');

console.log("found", dateTexts.length, "dates");

for (var i = 0; i < dateTexts.length; i++) {
    dateTexts[i].addEventListener('click', function() {
    console.log("You clicked:", this.id);
    this.classList.toggle("dateTextActive"); //TODO
    selectedDate = dates[this.id]; //this is important
    fullDate.textContent = selectedDate.toDateString();

    console.log("looking for: ", selectedDate.toJSON());
    dayData = localStorage.getObject(selectedDate.toJSON());

    drinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";
    console.log("selected date: ", selectedDate);    
    });
}


//LOG MODAL
var logModal = document.querySelector(".logModal");
var logButton = document.querySelector(".logButton");
var closeButton = document.querySelector(".closeButton");
var save = document.querySelector(".save");

logButton.onclick = function() {
    logModal.style.display = "block";
}

closeButton.onclick = function() {
    logModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == logModal) {
    logModal.style.display = "none";
  }
}

save.onclick = function() { //TODO
    //we gotta package everything here
    logModal.style.display = "none";
}

//DRINK COUNTING

const drinkDisplay = document.querySelector('.drinkDisplay');
var drinkTotal = 0;
function drinkSub(){
    if(drinkTotal <= 0){
        return;
    }
    drinkTotal -= 1;
    drinkDisplay.textContent = drinkTotal;
}

function drinkAdd(){
    drinkTotal += 1;
    drinkDisplay.textContent = drinkTotal;
}

//TRIGGERS

var triggers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
var triggerOptions = document.querySelectorAll('.trigger'); 
console.log("found", triggerOptions.length, "triggers");
for (var i = 0; i < triggerOptions.length; i++) {
    triggerOptions[i].addEventListener('click', function() {

    console.log("You toggled:", this.id);
    this.classList.toggle("triggerActive");
    
    triggers[this.id] = 1 - triggers[this.id];
    console.log(triggers);
    });
}