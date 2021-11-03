//DOM selection for content element
const content = document.querySelector('#feedContent');
const resourceContent = document.querySelector('#resourceContent');
const savedContent = document.querySelector('#savedContent');

//XML HTTP Request
var request = new XMLHttpRequest();

//Open connection
request.open("GET", "https://jsonplaceholder.typicode.com/posts");

let userFeed = document.getElementById('userFeedTab');
let resources = document.getElementById('resourcesTab');
let saved = document.getElementById('savedTab');

userFeed.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('userFeedTab', activeElement);
});
resources.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('resourcesTab', activeElement);
});
saved.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('savedTab', activeElement);
});
//Handling response
request.onload = function() {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        //console.log(data);

        data.forEach(function(post) {
            //DOM creation for HTML elements
            //Create card div element
            let card = document.createElement('div');
            card.setAttribute("class", "card")

            //Create profile image
            let dp = document.createElement('img');
            dp.src = "profile_picture.jpg";

            //Create title username element
            let heading = document.createElement('h2');
            heading.textContent = "username" + post.id;

            //Create date element
            let date = document.createElement('h2');
            date.textContent = "date" + post.id;

            //create save button
            let saveID = post.id + 'save';
            let save = document.createElement('button');
            save.setAttribute('id', saveID);
            save.textContent = "Save post";

            //Create body p element
            let description = document.createElement('p');
            description.textContent = post.body;

            //create like & replies buttons
            let likeID = post.id + 'like'
            let btn = document.createElement('button');
            btn.setAttribute('id', likeID);
            btn.textContent = "Like";

            let replies = document.createElement('button');
            replies.setAttribute('id', 'repliesBtn');
            replies.textContent = "View replies";

            //Append the text elements to the card element
            card.appendChild(dp);
            card.appendChild(heading);
            card.appendChild(date);
            card.appendChild(save);
            card.appendChild(description);
            card.appendChild(btn);
            card.appendChild(replies);

            //Append the card element to the page
            content.appendChild(card);
            //Content population
            btn.addEventListener("click", function() {
                addLike(likeID);
            });
            save.addEventListener("click", function() {
                let key = 'savedPosts';
                var value = this.parentNode.querySelector('h2').textContent;
                //add the favourite to the localstorage
                //localStorage.setItem(key, value);
                //console.log(key,value);

                let exists = false;
                for (let i = 0; i < localStorage.length + 1; i++) {
                    if (localStorage.getItem(localStorage.key) == value) {
                        alert(value + " is already in your favourites!");
                        exists = true;
                    }
                }
                if (exists == false) {
                    localStorage.setItem(key, value);
                }
            });


        })


    } else {
        let errorHeader = document.createElement('h1');
        errorHeader.textContent = "Oops something went wrong!";
        let errorMessage = document.createElement('p');
        errorMessage.textContent = "Error: Unable to process your API request. Status: " + request.status + ". Please try again later";
        content.appendChild(errorHeader);
        content.appendChild(errorMessage);
    }
}

request.send();

//Testing resource stuff (this will loop through a seperate api)
let card2 = document.createElement('div');
card2.setAttribute("class", "card")
let testing = document.createElement('p');
testing.textContent = "this is a test";

card2.appendChild(testing);

resourceContent.appendChild(card2);


//function to switch between tabs
function toggleActive(elementID, activeID) {
    var element = document.getElementById(elementID);
    var activeElement = document.getElementById(activeID);
    //console.log(element);
    if (element == activeElement) {} else {
        console.log(elementID);
        activeID[0].classList.toggle("active");
        element.classList.toggle("active");
        activeID[1].classList.toggle("hidden");
        activeID[1].classList.toggle("active");
        if (elementID == 'userFeedTab') {
            var visibleElement = document.getElementById('feedContent');
            visibleElement.classList.toggle("active");
            visibleElement.classList.toggle("hidden");
        } else if (elementID == 'resourcesTab') {
            var visibleElement = document.getElementById('resourceContent');
            visibleElement.classList.toggle("active");
            visibleElement.classList.toggle("hidden");
        } else if (elementID == 'savedTab') {
            var visibleElement = document.getElementById('savedContent');
            visibleElement.classList.toggle("active");
            visibleElement.classList.toggle("hidden");
        }
    }
}


function addLike(elementID) {
    var element = document.getElementById(elementID);
    //console.log(element);
    element.classList.toggle("liked");

}

function savePost(elementID) {
    var element = document.getElementById(elementID);
    //console.log(element);
    element.classList.toggle("liked");

}