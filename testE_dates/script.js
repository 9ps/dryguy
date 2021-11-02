//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

//IMPORTANT VARIABLES
localStorage.setItem("limit", 2);
localStorage.setObject("dryDays", [2, 4]);
localStorage.setObject("Fri Oct 29 2021", { 'drinks': 100, 'triggers': [1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });

var dryDays = localStorage.getObject("dryDays");
var limit = localStorage.getItem("limit");
const triggersList = ["Family", "Friends", "Work", "Occasions", "Routine", "Media", "Lonliness", "Stress", "Boredom", "Pain Relief"]

const dailyGoal = document.querySelector(".dailyGoal"); 
dailyGoal.textContent = "Daily Limit of " + limit + " Drinks";

//DATE STUFF
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var d = new Date(); //right now
var selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //current day (stripped of time data);
var dates = []; //stores Date objects

for(i = 0; i < 7; i++){ //big loop creating the [dates] and formatting the calender
    if(dates.length == 0) { //sets today
        dates = [selectedDate];
    } else { //sets other days
        dates[i] = new Date();
        dates[i].setDate(dates[i-1].getDate() - 1);
    }

    var currentDay = dates[i].getDay();
    var currentDate = dates[i].getDate();

    var dateThing = document.createElement('div'); //creating the date display frame
    dateThing.className = 'date';
    document.querySelector('.datesScroll').appendChild(dateThing);
    
    var isCactus = ""; //simple thing that adds cactus to Tue and Thu

    for(j = 0; j < dryDays.length; j++){
        if(currentDay == dryDays[j]) {
            isCactus = "🌵";
        }
    }

    var dayCactus = document.createElement('div');
    dayCactus.className = 'dayCactus';
    dayCactus.textContent = isCactus;
    
    var dayText = document.createElement('div');
    dayText.className = 'dayText';
    dayText.textContent = daysOfTheWeek[currentDay];
    
    var dateText = document.createElement('div');
    dateText.className = 'dateText';
    dateText.id = i; //dunno if this should be the date string, i think not
    dateText.textContent = currentDate;

    if(localStorage.getObject(dates[i].toDateString()) == null){ //creates a localStorage thing if it isnt found [i guess for reflection we check if null or reflections]
        localStorage.setObject(dates[i].toDateString(), { 'drinks': 0, 'triggers': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });
    }

    var e = localStorage.getObject(dates[i].toDateString()).drinks > limit; //dictating the color
    if(e){
        dateText.classList.add('dateTextOver');
    } else {
        dateText.classList.add('dateTextUnder');
    }

    dateThing.appendChild(dayCactus);
    dateThing.appendChild(dayText);
    dateThing.appendChild(dateText);
}    

//DATE SWITCHER
const fullDate = document.querySelector('.fullDate');
const drinksLoggedDisplay = document.querySelector('.drinksLoggedDisplay');
const triggersDisplay = document.querySelector('.triggersDisplay');
var dateTexts = document.querySelectorAll('.dateText');

var dayData = localStorage.getObject(dates[0].toDateString()); //this sets as current day!!
dateTexts[0].classList.add('dateTextActive');
updatePage(); //this processes the current day

for (i = 0; i < dateTexts.length; i++) {
    dateTexts[i].addEventListener('click', function() {
        selectedDate = dates[this.id]; //this is important
        console.log("Selected Calender Date: ", selectedDate.toDateString());
        
        for(i = 0; i < dateTexts.length; i++) {
            dateTexts[i].classList.remove('dateTextActive');
        }
        this.classList.add('dateTextActive');

        dayData = localStorage.getObject(selectedDate.toDateString());

        updatePage();
    });
}


function updatePage(){ //this sets the page
    fullDate.textContent = selectedDate.toDateString(); //this isnt needed
    drinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";

    while (triggersDisplay.lastChild) { //removes previous triggers
        triggersDisplay.removeChild(triggersDisplay.lastChild);
    }

    var anyTriggerCheck = false;
    for(i = 0; i < dayData.triggers.length; i++){
        if(dayData.triggers[i] == 1) {
            var triggerInstance = document.createElement('div');
            triggerInstance.className = 'triggerDisplay';
            triggerInstance.innerText = triggersList[i];
            triggersDisplay.appendChild(triggerInstance);
            anyTriggerCheck = true;
        }
    }
    if(!anyTriggerCheck){
        var triggerInstance = document.createElement('div');
        triggerInstance.innerText = "No Triggers Yet";
        triggersDisplay.appendChild(triggerInstance);
    }

    //triggers
}

//LOG MODAL
var logModal = document.querySelector(".logModal");
var logButton = document.querySelector(".logButton");
var closeButton = document.querySelector(".closeButton");
var save = document.querySelector(".save");

logButton.onclick = function() {
    logModal.style.display = "block";
    drinkDisplay.textContent = dayData.drinks; //sets the content [?do we need exception handling]

    for (var i = 0; i < triggerOptions.length; i++) { //sets the triggers
        if(dayData.triggers[i] == 1){
            triggerOptions[i].classList.add("triggerActive");
        } else {
            triggerOptions[i].classList.remove("triggerActive");
        }
    }

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
    console.log("saving: ", selectedDate.toDateString());
    localStorage.setObject(selectedDate.toDateString(), dayData);
    logModal.style.display = "none";
    updatePage();
}

//DRINK COUNTING
const drinkDisplay = document.querySelector('.drinkDisplay');

function drinkSub(){
    if(dayData.drinks <= 0){
        return;
    }
    dayData.drinks -= 1;
    drinkDisplay.textContent = dayData.drinks;
}

function drinkAdd(){
    dayData.drinks += 1;
    drinkDisplay.textContent = dayData.drinks;
}

//TRIGGERS
var triggers = dayData.triggers;
var triggerOptions = document.querySelectorAll('.trigger');

for (var i = 0; i < triggerOptions.length; i++) {
    triggerOptions[i].addEventListener('click', function() {

    console.log("You toggled:", this.id);
    this.classList.toggle("triggerActive");
    
    dayData.triggers[this.id] = 1 - dayData.triggers[this.id];
    console.log(dayData.triggers);
    });
}


//REFLECTION HIDER

const reflectionButton = document.querySelector(".reflectionButton");
const reflectionCloseButton = document.querySelector(".reflectionCloseButton");
const hideReflection = document.querySelector(".hideReflection");
const reflection = document.querySelector(".reflection");

reflectionButton.onclick = function() {
    hideReflection.style.display = "none";
    reflection.style.display = "block";
    document.getElementsByTagName("BODY")[0].style.background = "var(--y1)";


    // this is here because i want it to update only when reflection is clicked

    const goalText = document.querySelector(".goalText");
    const goalText2 = document.querySelector(".goalText2");

    console.log("sd: ", selectedDate);

    var isDry = false;
    var isOver = false;
    for(j = 0; j < dryDays.length; j++){ //checks if its a dry day
        if(selectedDate == dryDays[j]) {
            isDry = true;
            if(dayData.drinks > 0){
                isUnder = true;
                break;
            }
        }
    }

    if(isDry == false){
        if(dayData.drinks > limit){
            isOver = true;
        }
    }

    if(isOver){
        goalText.textContent = "You went over the Limit";
        goalText2.textContent = "It is okay!";
    } else {
        goalText.textContent = "You stayed Under the Limit"
        goalText2.textContent = "Great Work Today!";
    }

    
}

reflectionCloseButton.onclick = function() {
    hideReflection.style.display = "contents";
    reflection.style.display = "none";
    document.getElementsByTagName("BODY")[0].style.removeProperty("background-color");
}

//REFLECTION GOAL TEXT

