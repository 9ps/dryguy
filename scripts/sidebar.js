var sidebarAction;
var sidebar = document.querySelector("nav");
var main = document.querySelector("main");
var sidebarClose = document.querySelector("#sidebarClose");
var sidebarOpen = document.querySelector("#sidebarOpen");

if (window.innerWidth > 640) {
  sidebarAction(1);
}

function sidebarAction(n) {
  console.log(n);
  if (n) {
    //open it
    sidebar.style.width = "300px";
    sidebarOpen.style.visibility = "hidden";
    if (window.innerWidth > 640) {
      main.style.marginLeft = "300px";
      main.classList.remove("width1");
      main.classList.add("width2");
    }
  } else {
    sidebar.style.width = "0px";
    sidebarOpen.style.visibility = "visible";
    if (window.innerWidth > 640) {
      main.style.marginLeft = "0px";
      main.classList.add("width1");
      main.classList.remove("width2");
    }
  }
}
