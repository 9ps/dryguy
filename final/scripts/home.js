//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

//IMPORTANT VARIABLES
//localStorage.setObject("Tue Nov 30 2021", { 'drinks': 100, 'triggers': [1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });

const data = localStorage.getObject("data");
var dryDays = data.dryDays;
var dailyLimit = data.dailyLimit;

const triggersList = ["Family", "Friends", "Work", "Occasions", "Routine", "Media", "Lonliness", "Stress", "Boredom", "Pain Relief"]

//DATE STUFF
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var dates = []; //stores Date objects
var d = new Date(); //temp variable for right now
var selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //current day (stripped of time data);
const numCalender = 14; //controls amounts of dates displayed in scrolling calender

//PAGE SETUP
const streakCount = document.querySelector("#streakCount"); 
const dailyGoal = document.querySelector("#dailyGoal"); 
dailyGoal.textContent = "Daily Limit of " + dailyLimit + " Drinks";

for(var i = 0; i < numCalender; i++){ //big loop creating the [dates] and formatting the calender
	if(dates.length == 0) { //sets today
		dates = [selectedDate];
	} else { //sets other days
		dates[i] = new Date((dates[i-1].getTime() - 24*60*60*1000));
	}

	var currentDay = dates[i].getDay();
	var currentDate = dates[i].getDate();

	var dateThing = document.createElement('div'); //creating the date display frame
	dateThing.className = 'date';
	document.querySelector('#datesScroll').appendChild(dateThing);
	
	var isCactus = ""; //simple thing that adds cactus to Tue and Thu
	// for(j = 0; j < dryDays.length; j++){
	// 	console.log(j, currentDay, dryDays[j]);
	// 	if(currentDay == dryDays[j]) {
	// 		isCactus = "🌵";
	// 	}
	// }
	if(dryDays[currentDay]){
		isCactus = "🌵";
	}
	// console.log(dates[i], currentDay);

	var dayCactus = document.createElement('div');
	dayCactus.className = 'dayCactus';
	dayCactus.textContent = isCactus;
	
	var dayText = document.createElement('div');
	dayText.className = 'dayText';
	dayText.textContent = daysOfTheWeek[currentDay];

	var dateText = document.createElement('div');
	dateText.className = 'dateText';
	dateText.id = i;
	dateText.textContent = currentDate;

	if(localStorage.getObject(dates[i].toDateString()) == null){ //creates a localStorage thing if it isnt found [i guess for reflection we check if null or reflections]
		localStorage.setObject(dates[i].toDateString(), { 'drinks': 0, 'triggers': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });
	}

	var e = localStorage.getObject(dates[i].toDateString()).drinks > dailyLimit; //dictating the color
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
const drinksLoggedDisplay = document.querySelector('#drinksLoggedDisplay');
const triggersDisplay = document.querySelector('#triggersDisplay');
const reflectionState = document.querySelector("#reflectionState");

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
	// fullDate.textContent = selectedDate.toDateString(); //this isnt needed
	drinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";
	
	console.log("update page request");
	if(dayData.reflection) {
		reflectionState.innerText = "Reflection Completed!";
	} else {
		reflectionState.innerText = "";
	}

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
const logModal = document.querySelector("#logModal");
const logButton = document.querySelector(".logButton");
const logCloseButton = document.querySelector("#logCloseButton");
const save = document.querySelector(".save");

logButton.onclick = function() {
	openLog();
}

function openLog(){
	
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

logCloseButton.onclick = function() {
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
const drinkDisplay = document.querySelector('#drinkDisplay');

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
// var triggers = dayData.triggers;
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

const reflectionDrinksLoggedDisplay = document.querySelector(".reflectionDrinksLoggedDisplay");
const reflectionTriggersDisplay = document.querySelector(".reflectionTriggersDisplay");
const summaryCard = document.querySelector(".summaryCard");

const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");
const response3 = document.querySelector("#response3");

const reflection1 = document.querySelector(".reflection1");
const reflection2 = document.querySelector(".reflection2");
const reflection3 = document.querySelector(".reflection3");

const reflectionProgress = document.querySelector("#reflectionProgress");

const reflectionButton = document.querySelector("#reflectionButton");
const reflectionCloseButton = document.querySelector(".reflectionCloseButton");
const hideReflection = document.querySelector(".hideReflection");
const reflection = document.querySelector(".reflection");

reflection1.style.display = "none";
reflection2.style.display = "none";
reflection3.style.display = "none";

const next1 = document.querySelector(".next1");
const next2 = document.querySelector(".next2");
const next3 = document.querySelector(".next3");


reflectionButton.onclick = function() {
	reflectionProgress.style.width = "0%";

	hideReflection.style.display = "none";
	reflection.style.display = "block";
	reflection1.style.display = "block";
	document.getElementsByTagName("BODY")[0].style.background = "var(--y1)";

	// this is here because i want it to update only when reflection is clicked

	const goalText = document.querySelector(".goalText");
	const goalText2 = document.querySelector(".goalText2");

	reflectionDrinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";
	
	//repeated code die mad about it
	while (reflectionTriggersDisplay.lastChild) { //removes previous triggers
		reflectionTriggersDisplay.removeChild(reflectionTriggersDisplay.lastChild);
	}
	
	var anyTriggerCheck = false;
	for(i = 0; i < dayData.triggers.length; i++){
		if(dayData.triggers[i] == 1) {
			var triggerInstance = document.createElement('div');
			triggerInstance.className = 'triggerDisplay';
			triggerInstance.innerText = triggersList[i];
			reflectionTriggersDisplay.appendChild(triggerInstance);
			anyTriggerCheck = true;
		}
	}
	if(!anyTriggerCheck){
		var triggerInstance = document.createElement('div');
		triggerInstance.innerText = "No Triggers Yet";
		reflectionTriggersDisplay.appendChild(triggerInstance);
	}

	console.log("reflection date: ", selectedDate);

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
		if(dayData.drinks > dailyLimit){
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

summaryCard.onclick = function () {
	hideReflection.style.display = "contents";
	reflection.style.display = "none";
	document.getElementsByTagName("BODY")[0].style.removeProperty("background-color"); 
	openLog();   
}

next1.onclick = function () {
	console.log("next");
	reflection1.style.display = "none";
	reflection2.style.display = "block";
	reflectionProgress.style.width = "50%";
}

next2.onclick = function () {
	reflection2.style.display = "none";
	reflection3.style.display = "block";
	reflectionProgress.style.width = "100%";

	dayData.reflection1 = response1.value;
}

next3.onclick = function () {

	hideReflection.style.display = "contents";
	reflection.style.display = "none";
	reflection3.style.display = "none";
	document.getElementsByTagName("BODY")[0].style.removeProperty("background-color");

	dayData.reflection2 = response2.value;
	dayData.reflection3 = response3.value;
	dayData.reflection = 1;

	console.log("saving: ", selectedDate.toDateString());
	localStorage.setObject(selectedDate.toDateString(), dayData);
	updatePage();
}

reflectionCloseButton.onclick = function() {
	hideReflection.style.display = "contents";
	reflection.style.display = "none";
	reflection1.style.display = "none";
	reflection2.style.display = "none";
	reflection3.style.display = "none";
	document.getElementsByTagName("BODY")[0].style.removeProperty("background-color");
}

const emotions = document.querySelectorAll('.emotion'); //all the emotions

for (var i = 0; i < emotions.length; i++) {
	emotions[i].addEventListener('click', function() { //if an emotion is clicked
		
		for (var i = 0; i < emotions.length; i++) { //set every other emotion to inactive looking
			emotions[i].classList.remove("emotionActive");
			emotions[i].classList.add("emotionInactive");
		}
		this.classList.toggle("emotionActive"); //make this one active looking
		dayData.emotion = this.id; //update data
		console.log("dayData Emotion: ", dayData.emotion);
	});
}