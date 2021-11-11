//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

let data = localStorage.getObject("data");
if (data == null) { //if onboarding not complete
    console.log("no Data, fallback");
    localStorage.setObject("data", { name: "Ricky", 'dryDays': [0, 0, 1, 0, 1, 0, 0], 'dailyLimit': 2, 'majorGoal': 3, 'minorGoals': [1, 1, 1, 1, 0, 0, 0, 0] });
    let data = localStorage.getObject("data");
}

const triggersList = ["Family", "Friends", "Work", "Occasions", "Routine", "Media", "Lonliness", "Stress", "Boredom", "Pain Relief"]
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const majorList = ["Track Drinking", "Control Drinking", "Reduce Drinking", "Quit Drinking", "Maintain Sobriety"];
const minorList = ["Better my Health", "Lose Weight", "Sleep Better", "Gain Control", "Cope Better", "Have Sober Time", "Be more Social", "Save Money", "Improve Relationships"];

let mainGoal = document.getElementById('mainGoal');
mainGoal.textContent = majorList[data.majorGoal]

let count = 0;

let mainReasons = document.getElementById('mainReasons');
const countOccurrences = (arr) => arr.reduce((a, v) => (v === 1 ? a + 1 : a), 0);
if (countOccurrences(data.minorGoals) > 1) {
    console.log(data.minorGoals);
    data.minorGoals.forEach(reason => {
        //console.log(reason);
        if (reason == 1) {
            let reasonDisplay = document.createElement('button');
            reasonDisplay.setAttribute('class', 'triggerActive');

            reasonDisplay.textContent = minorList[count];
            mainReasons.appendChild(reasonDisplay);
        }
        count += 1;
        //console.log(count)
    });
} else if (countOccurrences(data.minorGoals) == 0) {
    let reasonDisplay = document.createElement('button');
    reasonDisplay.setAttribute('class', 'triggerActive');

    reasonDisplay.textContent = minorList[count];
    mainReasons.appendChild(reasonDisplay);
}


var dailyLimit = data.dailyLimit;

const dailyGoal = document.querySelector("#dailyGoal");
dailyGoal.textContent = "Daily Limit of " + dailyLimit + " Drinks";

const overviewContent = document.getElementById('overview');
const reflectionsContent = document.getElementById('reflections');
const reasonsContent = document.getElementById('reasons');

let popup = document.getElementById('supportPopUp');

let overviewTab = document.getElementById('overviewTab');
let reflectionsTab = document.getElementById('reflectionsTab');
let reasonsTab = document.getElementById('reasonsTab');


overviewTab.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('overviewTab', activeElement);
    //console.log('click');
    popup.classList.add('hidden');
});
reflectionsTab.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('reflectionsTab', activeElement);
    popup.classList.add('hidden');

});
reasonsTab.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('reasonsTab', activeElement);
    popup.classList.add('hidden');
});

//function to switch between tabs
function toggleActive(elementID, activeID) {
    var element = document.getElementById(elementID);
    var activeElement = document.getElementById(activeID);
    if (element == activeElement) {} else {
        //console.log(elementID);
        //console.log(activeID);
        activeID[0].classList.remove("active");
        element.classList.add("active");
        activeID[1].classList.add("hidden");
        activeID[1].classList.remove("active");
        if (elementID == 'overviewTab') {
            var visibleElement = document.getElementById('overview');
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
        } else if (elementID == 'reflectionsTab') {
            var visibleElement = document.getElementById('reflections');
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
        } else if (elementID == 'reasonsTab') {
            var visibleElement = document.getElementById('reasons');
            //console.log(visibleElement);
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
        }
    }
}

function openSupport() {
    popup.classList.remove('hidden');
    overviewContent.classList.add('hidden');
}

function closeSupport() {
    popup.classList.add('hidden');
    overviewContent.classList.remove('hidden');
}

Object.keys(localStorage).forEach(function(key) {
    //console.log(localStorage.getItem(key));
});