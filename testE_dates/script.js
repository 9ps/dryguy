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
var selectedDate;

//DATE STUFF
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //stripped of time data

dates = [today]; //dates is populated with the date formats
var dates = [];

for(i = 0; i < 7; i++){ //big loop creating the [dates] and formatting the calender
    if(dates.length == 0) {
        dates = [today];
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
    dateText.id = dates[i];
    dateText.textContent = dates[i].getDate();

    dateThing.appendChild(dayCactus);
    dateThing.appendChild(dayText);
    dateThing.appendChild(dateText);
}    

//DATE SWITCHER
var dateTexts = document.querySelectorAll('.dateText'); 
console.log("found", dateTexts.length, "dates");
for (var i = 0; i < dateTexts.length; i++) {
    dateTexts[i].addEventListener('click', function() {
      console.clear();
      console.log("You clicked:", this.id);
      selectedDate = this.innerHTML;
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

save.onclick = function() {
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