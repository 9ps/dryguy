//METHODS, use localStorage.<>()
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

let data = localStorage.getObject("data");
if (data == null) {
  //if onboarding not complete
  console.log("no Data, fallback");
  localStorage.setObject("data", {
    name: "Ricky",
    dryDays: [0, 0, 1, 0, 1, 0, 0],
    dailyLimit: 2,
    majorGoal: 3,
    minorGoals: [1, 1, 1, 1, 0, 0, 0, 0],
  });
  data = localStorage.getObject("data");
}

const triggersList = [
  "Family",
  "Friends",
  "Work",
  "Occasions",
  "Routine",
  "Media",
  "Lonliness",
  "Stress",
  "Boredom",
  "Pain Relief",
];
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const majorList = [
  "Track Drinking",
  "Control Drinking",
  "Reduce Drinking",
  "Quit Drinking",
  "Maintain Sobriety",
];
const minorList = [
  "Better my Health",
  "Lose Weight",
  "Sleep Better",
  "Gain Control",
  "Cope Better",
  "Have Sober Time",
  "Be more Social",
  "Save Money",
  "Improve Relationships",
];

// let mainGoal = document.getElementById('mainGoal');
// mainGoal.textContent = majorList[data.majorGoal]

// let count = 0;

// let mainReasons = document.getElementById('mainReasons');
// const countOccurrences = (arr) => arr.reduce((a, v) => (v === 1 ? a + 1 : a), 0);
// if (countOccurrences(data.minorGoals) > 1) {
//     console.log(data.minorGoals);
//     data.minorGoals.forEach(reason => {
//         //console.log(reason);
//         if (reason == 1) {
//             let reasonDisplay = document.createElement('button');
//             reasonDisplay.setAttribute('class', 'triggerActive');

//             reasonDisplay.textContent = minorList[count];
//             mainReasons.appendChild(reasonDisplay);
//         }
//         count += 1;
//         //console.log(count)
//     });
// } else if (countOccurrences(data.minorGoals) == 0) {
//     let reasonDisplay = document.createElement('button');
//     reasonDisplay.setAttribute('class', 'triggerActive');

//     reasonDisplay.textContent = minorList[count];
//     mainReasons.appendChild(reasonDisplay);
// }

// var dailyLimit = data.dailyLimit;

// const dailyGoal = document.querySelector("#dailyGoal");
// dailyGoal.textContent = "Daily Limit of " + dailyLimit + " Drinks";

const popup = document.getElementById("supportPopUp");
const weekBtn = document.getElementById("weekBtn");
const monthBtn = document.getElementById("monthBtn");
const yearBtn = document.getElementById("yearBtn");

const dateText = document.querySelector("#dateText");
const averageDrinks = document.querySelector("#averageDrinks");
const averageDrinksText = document.querySelector("#averageDrinksText");
const averageMood = document.querySelector("#averageMood");
const reflectPercent = document.querySelector("#reflectPercent");
const trigger1 = document.querySelector("#trigger1");
const trigger2 = document.querySelector("#trigger2");
const trigger3 = document.querySelector("#trigger3");
const wettestDay = document.querySelector("#wettestDay");
const wettestDayText = document.querySelector("#wettestDayText");

const data1 = ["15-21 November", "November 2021", "2021"];
const data2 = ["1.6", "1.8", "2.3"];
const data3 = [
  "Lower than last week!",
  "Higher than last month!",
  "Good Progress!",
];
const data4 = ["😓", "😐", "😊"];
const data5 = ["80%", "60%", "50%"];
const data6 = ["Lonliness", "Lonliness", "Stress"];
const data7 = ["Work", "Stress", "Work"];
const data8 = ["Routine", "Stress", "Lonliness"];
const data9 = ["Fri", "Sat", "Sun"];
const data10 = [
  "1.7x greater than Average",
  "1.3x greater than Average",
  "1.7x less than Average",
];

const color1 = ["good", "good", "bad"];
const color2 = ["good", "bad", "bad"];

weekBtn.addEventListener("click", function () {
  toggleView(0);
});

monthBtn.addEventListener("click", function () {
  toggleView(1);
});

yearBtn.addEventListener("click", function () {
  toggleView(2);
});

const buttons = document.querySelectorAll(".dateBtns");

function toggleView(n) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("dateBtnsActive");
  }

  buttons[n].classList.add("dateBtnsActive");

  console.log("toggling view");
  dateText.innerText = data1[n];
  averageDrinks.innerText = data2[n];

  averageDrinks.classList.remove("good");
  averageDrinks.classList.remove("bad");
  averageDrinks.classList.add(color1[n]);

  averageDrinksText.innerText = data3[n];
  averageMood.innerText = data4[n];
  reflectPercent.innerText = data5[n];

  reflectPercent.classList.remove("good");
  reflectPercent.classList.remove("bad");
  reflectPercent.classList.toggle(color2[n]);

  trigger1.innerText = data6[n];
  trigger2.innerText = data7[n];
  trigger3.innerText = data8[n];
  wettestDay.innerText = data9[n];
  wettestDayText.innerText = data10[n];
}

const modalBacking = document.querySelector("#modalBacking");
const modalBacking2 = document.querySelector("#modalBacking2");

function openSupport() {
  modalBacking.style.display = "block";
}

function closeSupport() {
  modalBacking.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalBacking) {
    closeSupport();
  } else if (event.target == modalBacking2) {
    closeDay();
  }
};
