
const prev = document.querySelector("#prev");
const prevPlaceholder = document.querySelector("#prevPlaceholder");
const next = document.querySelector("#next");
const onboardingProgress = document.querySelector("#onboardingProgress");
const pages = document.querySelectorAll(".page");
const begin = document.querySelector("#begin");

var currentPage = 0;
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

  pages[currentPage].style.display = "none";
  currentPage = currentPage + n;
  showPage();
}