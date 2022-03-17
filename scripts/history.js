const dates = document.querySelectorAll(".date");
const modalBacking = document.querySelector("#modalBacking");

for (var i = 0; i < dates.length; i++) {
  if (i % 5 != 0 && i % 9 != 0) {
    dates[i].classList.add("btn-yellow");
  }
  dates[i].addEventListener("click", function () {
    if (!this.classList.contains("btn-yellow")) {
      return;
    }
    console.log(this.innerText);
    openDay(this.innerText);
  });
}

const replaceDayText = document.querySelector("#replaceDayText");

function openDay(date) {
  replaceStr = "November " + date;

  if (date == 1) {
    replaceStr += "st";
  } else if (date == 2) {
    replaceStr += "nd";
  } else if (date == 3) {
    replaceStr += "rd";
  } else {
    replaceStr += "th";
  }

  replaceDayText.textContent = replaceStr;

  modalBacking.style.display = "block";
}

function closeDay() {
  console.log("close");
  modalBacking.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modalBacking) {
    closeDay();
  }
};
