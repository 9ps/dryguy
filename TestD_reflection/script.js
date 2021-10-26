//these prototype methods are to set and get objects to Local storage
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}



const date = document.querySelector('.date');
const date2 = document.querySelector('.date2');
const beerDisplay = document.querySelector('.beerCount');
const save = document.querySelector('.save');
const startReflection = document.querySelector('.startReflection');
const endReflection = document.querySelector('.endReflection');
const afterMood = document.querySelector('.after-mood');

//DATE STUFF

var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// ISO Date 	"2015-03-25" (The International Standard)
// const randomDay = new Date("2021-02-21");
//date2.textContent = randomDay.toDateString();
// console.log(today);

date.textContent = today.toDateString();
date2.textContent = today.getDate(); //get method (date = day of the month, day = weekday)

//LOCAL STORAGE STUFFS

var testObject = { 'drinks': 0, 'triggers': [0, 0, 0, 1], 'reflections': ["", ""] };

localStorage.setObject(today, testObject);


//BEER STUFF

var beerCount = 0;

function beerSub(){
    if(beerCount <= 0){
        return;
    }
    beerCount -= 1;
    beerDisplay.textContent = beerCount;
}

function beerAdd(){
    beerCount += 1;
    beerDisplay.textContent = beerCount;
}

const saveBeer = () => {
    console.log("saved " + beerCount);

    console.log(testObject["drinks"]);

    testObject[drinks] = beerCount;

    //localStorage.setItem(today, beerCount) //we use the replicated thing for some reason...
}

save.addEventListener('click', saveBeer)

// functions to hide the beer stuff and show the reflection stuff and vice versa

function displayReflection(){
    console.log("reflection started");

    document.querySelector('.to-be-hidden').style.display = 'none';
    document.querySelector('.hidden').style.display = 'block';
}

function hideReflection(){
    console.log("reflection ended");

    document.querySelector('.to-be-hidden').style.display = 'block';
    document.querySelector('.hidden').style.display = 'none';
}

startReflection.addEventListener("click", displayReflection);
endReflection.addEventListener("click", hideReflection);


//MOOD STUFF

var mood;

const saveMood = () => {
    selected = document.querySelector('input[name="mood"]:checked');

    mood = selected.value;

    localStorage.setItem('dailyMood', mood)

    console.log(mood);
}

afterMood.addEventListener("click", saveMood);
