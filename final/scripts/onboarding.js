//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

const prev = document.querySelector("#prev");
const prevPlaceholder = document.querySelector("#prevPlaceholder");
const next = document.querySelector("#next");
const onboardingProgress = document.querySelector("#onboardingProgress");
const pages = document.querySelectorAll(".page");
const begin = document.querySelector("#begin");
const nameInput = document.querySelector('#nameInput'); //all the emotions
const majorGoalDisplay = document.querySelector('#majorGoalDisplay');

var data = {'name': "", 'dryDays': [0, 0, 0, 0, 0, 0, 0], 'dailyLimit': 0, 'majorGoal': 0, 'minorGoals': [0, 0, 0, 0, 0, 0, 0, 0, 0]};
var currentPage = 0;
const majorList = ["Track Drinking", "Control Drinking", "Reduce Drinking", "Quit Drinking", "Maintain Sobriety"];
const minorList = ["Better my Health", "Lose Weight", "Sleep Better", "Gain Control", "Cope Better", "Have Sober Time", "Be more Social", "Save Money", "Improve Relationships"];

showPage(currentPage);

function showPage() {
  pages[currentPage].style.display = "block";
  onboardingProgress.style.width = (currentPage*100/7) + "%";

  next.style.display = "inline";
  begin.style.display = "none";

  if (currentPage == 0) {
    prev.style.display = "none";
    prevPlaceholder.style.display ="inline";
    next.innerHTML = "Next";
  } else {
    prev.style.display = "inline";
    prevPlaceholder.style.display ="none";
    next.innerHTML = "Confirm";
  }

  if (currentPage == (pages.length - 1)) {
    next.style.display = "none";
    begin.style.display = "inline";
  }
}

function changePage(n) {
  
  if(currentPage == 1){
    data.name = nameInput.value;
  }

  if(currentPage == 2){
    majorGoalDisplay.innerText = majorList[data.majorGoal];
  }

  pages[currentPage].style.display = "none";
  currentPage = currentPage + n;
  showPage();
}


// Major Goal Selector

const majorGoals = document.querySelectorAll('.majorGoal'); //all the emotions

for (var i = 0; i < majorGoals.length; i++) {
	majorGoals[i].addEventListener('click', function() { //if an emotion is clicked
		
		for (var i = 0; i < majorGoals.length; i++) { //set every other emotion to inactive looking
			majorGoals[i].classList.remove("buttonActive");
		}

		this.classList.add("buttonActive"); //make this one active looking
		data.majorGoal = removeLetters(this.id, 'majorGoal'); //update data
	});
}

// Minor Goal Selector

const minorGoals = document.querySelectorAll('.minorGoal');

for (var i = 0; i < minorGoals.length; i++) {
	minorGoals[i].addEventListener('click', function() {
    this.classList.toggle("triggerActive");
    var minorGoalIndex = removeLetters(this.id, "minorGoal");
    data.minorGoals[minorGoalIndex] = 1 - data.minorGoals[minorGoalIndex];
	});
}

const limitDisplay = document.querySelector('#limitDisplay');

function changeLimit(n){

  if(data.dailyLimit <= 0 && n == -1){
		return;
	}

	data.dailyLimit += n;
	limitDisplay.textContent = data.dailyLimit;
}


function removeLetters(str, rem) {
  return parseInt(str.replace(rem, ''));
}

const dayButtons = document.querySelectorAll('.dayButton');

for (var i = 0; i < dayButtons.length; i++) {
	dayButtons[i].addEventListener('click', function() {
    this.classList.toggle("dayButtonActive");
    var dayIndex = removeLetters(this.id, "day");
    data.dryDays[dayIndex] = 1 - data.dryDays[dayIndex];
    console.log(data.dryDays);
	});
}

function pushToStorage(){
  localStorage.setObject("data", data);
}



//Modal stuff

/*
const questionButton1 = document.querySelector("#questionButton1");
const questionButton2 = document.querySelector("#questionButton2");
const questionModal1 = document.querySelector("#questionModal1");
const questionModal2 = document.querySelector("#questionModal2");
const background1 = document.querySelector("#background1");
const background2 = document.querySelector("#background2");

questionButton1.onclick = function() {
  console.log("clicked");
  background1.style.display = "block";
	questionModal1.style.display = "block";
}

questionButton2.onclick = function() {
  background2.style.display = "block";
	questionModal2.style.display = "block";
}

window.onclick = function(event) {
	if (event.target == background1) {
    background1.style.display = "none";
		questionModal1.style.display = "none"
  } else if (event.target == background2) {
    background2.style.display = "none";
		questionModal2.style.display = "none";
  }
}
*/
