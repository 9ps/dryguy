//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}

// Variables
var data = localStorage.getObject("data");
if(data == null){
    data = {'name': "", 'dryDays': [0, 0, 0, 0, 0, 0, 0], 'dailyLimit': 2, 'majorGoal': 0, 'minorGoals': [1, 0, 0, 0, 0, 0, 0, 0, 0]};
}

const limitDisplay = document.querySelector('#limitDisplay');
const dayButtons = document.querySelectorAll('.dayButton');
const modalBacking = document.querySelector('#modalBacking');

// Initial Loading

limitDisplay.textContent = data.dailyLimit;
var currentInfo = "";

// Pop up Things
function activate(info) {
    currentInfo = info;
    modalBacking.classList.toggle("hidden");
    let selected = document.getElementById(info);
    selected.classList.toggle("hidden");
};

window.onclick = function(event) {
    if (event.target == modalBacking) {
        activate(currentInfo);
    }
}


// Change Limit
function changeLimit(n){

  if(data.dailyLimit <= 0 && n == -1){
		return;
	}
	data.dailyLimit += n;
	limitDisplay.textContent = data.dailyLimit;
}


// Button clicking
for (var i = 0; i < dayButtons.length; i++) {
    if(data.dryDays[i]){
        dayButtons[i].classList.add("dayButtonActive");
    }
	dayButtons[i].addEventListener('click', function() {
    this.classList.toggle("dayButtonActive");
    var dayIndex = removeLetters(this.id, "day");
    data.dryDays[dayIndex] = 1 - data.dryDays[dayIndex];
    console.log(data.dryDays);
	});
}

function removeLetters(str, rem) {
    return parseInt(str.replace(rem, ''));
}

function pushToStorage(){
  console.log("pushed to storage:", data);
  localStorage.setObject("data", data);
}

