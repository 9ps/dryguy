//METHODS, use localStorage.<>()
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};
Storage.prototype.getObject = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

//IMPORTANT VARIABLES
//localStorage.setObject("Tue Nov 30 2021", {'track: 0', 'drinks': 100, 'triggers': [1, 0, 1, 0, 0, 0, 0, 0, 0, 0], 'done': 0, 'emotion': 0, 'reflections': ["", "", ""] });

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

var dryDays = data.dryDays; //this causes an issue
var dailyLimit = data.dailyLimit;
var dayId = 0;
var streak = 0;
var streakOver = false;
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
const numCalender = 30; //controls amounts of dates displayed in scrolling calender

var dates = []; //stores Date objects
var d = new Date(); //temp variable for right now
var selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate()); //current day (stripped of time data);

const streakCount = document.querySelector("#streakCount");
const dailyGoal = document.querySelector("#dailyGoal");
const drinksLoggedDisplay = document.querySelector("#drinksLoggedDisplay");
const triggersDisplay = document.querySelector("#triggersDisplay");

const logModal = document.querySelector("#logModal");
const logButton = document.querySelector("#logButton");
const logCloseButton = document.querySelector("#logCloseButton");
const save = document.querySelector("#save");
const drinkDisplay = document.querySelector("#drinkDisplay");
const dateDisplay = document.querySelector("#dateDisplay");

const todaysRead = document.getElementById("blogPost");

const readText = document.querySelector("#readText");
const footer = document.querySelector("footer");

function openSidebar() {}

function closeSidebar() {}

//PAGE SETUP
dailyGoal.textContent = "Daily Limit of " + dailyLimit + " Drinks";
readText.textContent = data.name + "'s Read:";

for (var i = 0; i < numCalender; i++) {
  //big loop creating the [dates] and formatting the calender
  if (dates.length == 0) {
    //sets today
    dates = [selectedDate];
  } else {
    //sets other days
    dates[i] = new Date(dates[i - 1].getTime() - 24 * 60 * 60 * 1000);
  }

  var currentDay = dates[i].getDay();
  var currentDate = dates[i].getDate();

  var dateThing = document.createElement("div"); //creating the date display frame
  dateThing.classList.add("date");
  document.querySelector("#datesScroll").appendChild(dateThing);
  document.querySelector("#datesScroll").scrollTop = document.querySelector(
    "#datesScroll"
  ).scrollWidth;

  var isCactus = ""; //simple thing that adds cactus to Tue and Thu
  if (dryDays[currentDay]) {
    isCactus = "🌵";
  }

  var dayCactus = document.createElement("h3");
  dayCactus.className = "dayCactus";
  dayCactus.textContent = isCactus;

  var dayText = document.createElement("div");
  dayText.className = "dayText";
  dayText.textContent = daysOfTheWeek[currentDay];

  var dateText = document.createElement("button");
  dateText.classList.add("btn-circle", "dateText");
  dateText.id = i;
  dateText.textContent = currentDate;

  if (localStorage.getObject(dates[i].toDateString()) == null) {
    //creates a localStorage thing if it isnt found [i guess for reflection we check if null or reflections]
    localStorage.setObject(dates[i].toDateString(), {
      track: -1,
      drinks: -1,
      triggers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      done: 0,
      emotion: 0,
      reflections: ["", "", ""],
    });
  }

  var e = localStorage.getObject(dates[i].toDateString()).track; //dictating the color
  if (e == -1) {
    dateText.classList.add("btn-grey");
  } else if (e == 1) {
    dateText.classList.add("btn-red");
  } else {
    dateText.classList.add("btn-green");
  }

  dateThing.appendChild(dayCactus);
  dateThing.appendChild(dayText);
  dateThing.appendChild(dateText);
}

//ARTICLE POPULATION
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "files/BlogContent.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // .open will NOT return a value but simply returns undefined in async mode so use a callback
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function (response) {
  // Do Something with the response e.g.
  jsonresponse = JSON.parse(response);

  // Assuming json data is wrapped in square brackets as Drew suggests
  jsonresponse.forEach((post) => {
    //Testing resource stuff (this will loop through a seperate api)
    let card2 = document.createElement("div");
    card2.setAttribute("class", "card");
    card2.id = post.id + "card";
    // console.log(card2.id);

    let author = document.createElement("span");
    author.textContent = post.author;

    let date = document.createElement("span");
    date.classList.add("floatright");
    date.textContent = post.date;

    let title = document.createElement("h3");
    title.textContent = post.title;

    let image = document.createElement("img");
    image.src = post.image;
    image.setAttribute("class", "blogImage");

    card2.addEventListener("click", function () {
      let blogPostContent = document.getElementById("bigPostContent");
      let bigPost = document.getElementById("bigPost");

      //document.getElementById('content').style.display = "none";
      console.log(document.getElementById("content"));

      hideReflection.style.display = "none";
      document.getElementById("content").style.display = "none";

      bigPost.classList.remove("hidden");

      let card3 = document.createElement("div");
      card3.setAttribute("id", "blogCard");
      card3.setAttribute("class", "card");

      let blogPost = document.createElement("p");
      blogPost.textContent = post.content;

      let source = document.createElement("button");
      source.setAttribute("class", "center-margin");
      source.textContent = "source";
      source.addEventListener("click", function () {
        let url = post.source;
        window.open(url, "_blank").focus();
      });

      let closePost = document.getElementById("closePost");
      closePost.addEventListener("click", function () {
        hideReflection.style.display = "block";
        document.getElementById("content").style.display = "block";
        bigPost.classList.add("hidden");
        blogPostContent.removeChild(card3);
      });

      card3.appendChild(author.cloneNode(true));
      card3.appendChild(date.cloneNode(true));
      card3.appendChild(title.cloneNode(true));
      card3.appendChild(blogPost);
      card3.appendChild(source);

      blogPostContent.appendChild(card3);

      if (blogPostContent.childNodes.length > 2) {
        console.log("true");
        blogPostContent.removeChild(card3);
      }
    });

    card2.appendChild(image);
    card2.appendChild(author);
    card2.appendChild(date);
    card2.appendChild(title);

    todaysRead.appendChild(card2);
    card2.style.display = "none";
  });

  updatePage(3);
});

//DATE SWITCHER
var dateTexts = document.querySelectorAll(".dateText");
var dayData = localStorage.getObject(dates[0].toDateString()); //this sets as current day!!
dateTexts[0].classList.add("date-active");

for (i = 0; i < dateTexts.length; i++) {
  dateTexts[i].addEventListener("click", function () {
    selectedDate = dates[this.id]; //this is important
    console.log("Selected Calender Date: ", selectedDate.toDateString());
    dayId = this.id;

    for (j = 0; j < dateTexts.length; j++) {
      dateTexts[j].classList.remove("date-active");
      dateTexts[j].classList.add("btn-grey");
    }
    this.classList.add("date-active");
    this.classList.remove("btn-grey");

    dayData = localStorage.getObject(selectedDate.toDateString());
    updatePage(0);
  });
}

function updatePage(flag) {
  //this sets the page
  console.log("Update Page Called: ", dayId, flag);

  // Formatting of Date Calender Day
  if (dayData.track != -1) {
    dateTexts[dayId].classList.remove("btn-grey");
  }
  if (dayData.track == 0) {
    dateTexts[dayId].classList.remove("btn-red");
    dateTexts[dayId].classList.add("btn-green");
  } else if (dayData.track == 1) {
    dateTexts[dayId].classList.remove("btn-green");
    dateTexts[dayId].classList.add("btn-red");
  }

  // Generic Text Handling
  var daysAgo;
  if (dayId == 0) {
    daysAgo = "Today";
  } else if (dayId == 1) {
    daysAgo = dayId + " Day Ago";
  } else {
    daysAgo = dayId + " Days Ago";
  }
  dateDisplay.textContent = daysAgo;

  if (dayData.drinks == -1) {
    drinksLoggedDisplay.textContent = "Let's Log Today:";
  } else if (dayData.drinks == 1) {
    drinksLoggedDisplay.textContent = dayData.drinks + " Drink Logged";
  } else {
    drinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";
  }

  // Triggers Handling
  while (triggersDisplay.lastChild) {
    //removes previous triggers
    triggersDisplay.removeChild(triggersDisplay.lastChild);
  }
  var anyTriggerCheck = false;
  for (i = 0; i < dayData.triggers.length; i++) {
    if (dayData.triggers[i] == 1) {
      var triggerInstance = document.createElement("div");
      triggerInstance.className = "triggerDisplay";
      triggerInstance.innerText = triggersList[i];
      triggersDisplay.appendChild(triggerInstance);
      anyTriggerCheck = true;
    }
  }
  if (!anyTriggerCheck) {
    var triggerInstance = document.createElement("div");
    triggerInstance.className = "triggerDisplay";
    triggerInstance.innerText = "No Triggers Yet";
    triggersDisplay.appendChild(triggerInstance);
  }

  // Reload Articles
  if (flag == 0 || flag == 3) {
    const readCards = document.querySelectorAll(".card");
    for (var i = 0; i < readCards.length; i++) {
      readCards[i].style.display = "none";
    }
    readCards[dayId % readCards.length].style.display = "block";
  }

  if (flag == 2 || flag == 3) {
    updateStreak();
  }
}

function updateStreak() {
  streak = 0;
  streakOver = false;

  for (var i = 0; i < dates.length; i++) {
    var d = localStorage.getObject(dates[i].toDateString()).track;
    if (d != 0) {
      break;
    } else {
      streak += 1;
    }
  }

  streakCount.textContent = streak + " Day Streak!";
}

//LOG MODAL
logButton.onclick = function () {
  openLog();
};

function openLog() {
  // document.getElementById("blogPost").style.display = "none";
  // // nav.style.display = "none";
  // footer.style.display = "none";
  logModal.style.display = "block";

  if (dayData.drinks == -1) {
    dayData.drinks = 0;
  }

  drinkDisplay.textContent = dayData.drinks; //sets the content [?do we need exception handling]

  for (var i = 0; i < triggerOptions.length; i++) {
    //sets the triggers
    if (dayData.triggers[i] == 1) {
      triggerOptions[i].classList.add("btn-blue");
    } else {
      triggerOptions[i].classList.remove("btn-blue");
    }
  }
}

logCloseButton.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == logModal) {
    closeModal();
  }
};

save.onclick = function () {
  console.log("saving: ", selectedDate.toDateString());

  dayData.track = 0;

  if (data.dryDays[selectedDate.getDay()]) {
    if (dayData.drinks > 0) {
      dayData.track = 1;
      console.log("shame");
    }
  } else if (dayData.drinks > data.dailyLimit) {
    dayData.track = 1;
  }

  localStorage.setObject(selectedDate.toDateString(), dayData);
  closeModal();
  updatePage(2);
};

function closeModal() {
  logModal.style.display = "none";
  footer.style.display = "flex";
  document.getElementById("blogPost").style.display = "block";
}

//DRINK COUNTING
function changeDrinks(n) {
  if (dayData.drinks <= 0 && n == -1) {
    return;
  }

  dayData.drinks += n;
  drinkDisplay.textContent = dayData.drinks;
}

//TRIGGERS
var triggerOptions = document.querySelectorAll(".trigger");

for (var i = 0; i < triggerOptions.length; i++) {
  triggerOptions[i].addEventListener("click", function () {
    console.log("You toggled:", this.id);

    if (this.classList.contains("btn-white")) {
      this.classList.remove("btn-white");
      this.classList.add("btn-blue");
    } else {
      this.classList.remove("btn-blue");
      this.classList.add("btn-white");
    }

    dayData.triggers[this.id] = 1 - dayData.triggers[this.id];
  });
}

//REFLECTION HIDER

const reflectionDrinksLoggedDisplay = document.querySelector(
  ".reflectionDrinksLoggedDisplay"
);
const reflectionTriggersDisplay = document.querySelector(
  ".reflectionTriggersDisplay"
);
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
const hideReflection = document.querySelector("#hideReflection");
const reflection = document.querySelector(".reflection");

reflection1.style.display = "none";
reflection2.style.display = "none";
reflection3.style.display = "none";

const next1 = document.querySelector(".next1");
const next2 = document.querySelector(".next2");
const next3 = document.querySelector(".next3");

const emotions = document.querySelectorAll(".emotion"); //all the emotions
const goalText = document.querySelector(".goalText");
const goalText2 = document.querySelector(".goalText2");

reflectionButton.onclick = function () {
  reflectionProgress.style.width = "0%";

  hideReflection.style.display = "none";
  reflection.style.display = "block";
  reflection1.style.display = "block";
  document.getElementsByTagName("BODY")[0].style.background = "var(--y1)";

  console.log("reflection date: ", selectedDate);

  if (dayData.track == -1) {
    goalText.textContent = "You should complete your log";
    goalText2.textContent = "before doing the reflection";

    reflectionDrinksLoggedDisplay.textContent = "Log not Complete!";
    return;
  } else if (dayData.track == 0) {
    goalText.textContent = "You stayed Under the Limit";
    goalText2.textContent = "Great Work Today!";
  } else {
    goalText.textContent = "You went over the Limit";
    goalText2.textContent = "It is okay!";
  }

  reflectionDrinksLoggedDisplay.textContent = dayData.drinks + " Drinks Logged";

  // Removes other days triggers
  while (reflectionTriggersDisplay.lastChild) {
    //removes previous triggers
    reflectionTriggersDisplay.removeChild(reflectionTriggersDisplay.lastChild);
  }

  var anyTriggerCheck = false;
  for (i = 0; i < dayData.triggers.length; i++) {
    if (dayData.triggers[i] == 1) {
      var triggerInstance = document.createElement("div");
      triggerInstance.className = "triggerDisplay";
      triggerInstance.innerText = triggersList[i];
      reflectionTriggersDisplay.appendChild(triggerInstance);
      anyTriggerCheck = true;
    }
  }
  if (!anyTriggerCheck) {
    var triggerInstance = document.createElement("div");
    triggerInstance.className = "triggerDisplay";
    triggerInstance.innerText = "No Triggers";
    reflectionTriggersDisplay.appendChild(triggerInstance);
  }
};

summaryCard.onclick = function () {
  hideReflection.style.display = "contents";
  reflection.style.display = "none";
  document
    .getElementsByTagName("BODY")[0]
    .style.removeProperty("background-color");
  openLog();
};

next1.onclick = function () {
  console.log("next");
  reflection1.style.display = "none";
  reflection2.style.display = "block";
  reflectionProgress.style.width = "50%";
};

next2.onclick = function () {
  reflection2.style.display = "none";
  reflection3.style.display = "block";
  reflectionProgress.style.width = "100%";

  dayData.reflection1 = response1.value;
};

next3.onclick = function () {
  hideReflection.style.display = "contents";
  reflection.style.display = "none";
  reflection3.style.display = "none";
  document
    .getElementsByTagName("BODY")[0]
    .style.removeProperty("background-color");

  dayData.reflection2 = response2.value;
  dayData.reflection3 = response3.value;
  dayData.reflection = 1;

  console.log("saving: ", selectedDate.toDateString());
  localStorage.setObject(selectedDate.toDateString(), dayData);
  updatePage(1);
};

reflectionCloseButton.onclick = function () {
  hideReflection.style.display = "contents";
  reflection.style.display = "none";
  reflection1.style.display = "none";
  reflection2.style.display = "none";
  reflection3.style.display = "none";
  document
    .getElementsByTagName("BODY")[0]
    .style.removeProperty("background-color");
};

for (var i = 0; i < emotions.length; i++) {
  emotions[i].addEventListener("click", function () {
    //if an emotion is clicked

    for (var i = 0; i < emotions.length; i++) {
      //set every other emotion to inactive looking
      emotions[i].classList.remove("emotionActive");
      emotions[i].classList.add("emotionInactive");
    }
    this.classList.toggle("emotionActive"); //make this one active looking
    dayData.emotion = this.id; //update data
    console.log("dayData Emotion: ", dayData.emotion);
  });
}
