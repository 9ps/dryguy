const date = document.querySelector('.date');
const date2 = document.querySelector('.date2');
const beerDisplay = document.querySelector('.beerCount');
const save = document.querySelector('.save');
//DATE STUFF

var d = new Date(); //right now
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

// ISO Date 	"2015-03-25" (The International Standard)
// const randomDay = new Date("2021-02-21");
//date2.textContent = randomDay.toDateString();
// console.log(today);

date.textContent = today.toDateString();
date2.textContent = today.getDate(); //get method (date = day of the month, day = weekday)

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
    console.log("saved beerAmount");
    localStorage.setItem('beerAmount', beerCount) //we use the replicated thing for some reason...
}

save.addEventListener('click', saveBeer)




// function to toggle button states

// const b1 = document.querySelector('.b1');
// b1.addEventListener("click", function(evt) {
//     console.log("RAN");
//     var e = document.querySelector('.b1');
//     e.classList.toggle("toggleActive");
//   });