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