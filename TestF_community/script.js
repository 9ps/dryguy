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

let newPostPopup = document.getElementById('newPostPopup');
let newPost = document.getElementById('newPost');
let closeBtn = document.getElementById('closeBtn');

let backButton = document.getElementById('backButton');

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
            dp.setAttribute("class", "smalldp");
            dp.src = "profile_picture.jpg";
            //dp.onclick = openProfile();

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
            save.textContent = "Save";

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
            //Testing resource stuff (this will loop through a seperate api)
            let card2 = document.createElement('div');
            card2.setAttribute("class", "card")

            let saveBlog = document.createElement('button');
            saveBlog.textContent = "Save";

            let title = document.createElement('h2');
            title.textContent = post.title;

            let image = document.createElement('img');
            image.src = "blog_image.jpg";
            image.setAttribute("class", "blogImage");

            let body = document.createElement('p');
            body.textContent = post.body;

            let readBtn = document.createElement('button');
            readBtn.textContent = "Read full post";

            card2.appendChild(image);
            card2.appendChild(title);
            card2.appendChild(saveBlog);
            card2.appendChild(body);
            card2.appendChild(readBtn);


            resourceContent.appendChild(card2);
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
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
            newPost.classList.remove("hidden");
        } else if (elementID == 'resourcesTab') {
            var visibleElement = document.getElementById('resourceContent');
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
            newPost.classList.add("hidden");
        } else if (elementID == 'savedTab') {
            var visibleElement = document.getElementById('savedContent');
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
            newPost.classList.add("hidden");
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


newPost.addEventListener("click", function() {
    newPostPopup.classList.remove("hidden");
    newPost.classList.add("hidden");

});
closeBtn.addEventListener("click", function() {
    newPostPopup.classList.add("hidden");
    newPost.classList.remove("hidden");
});

let profile = document.getElementById('profileContent')

function openProfile() {
    profile.classList.remove("hidden");
    document.getElementById('feedContent').classList.add("hidden");
    document.getElementById('feedContent').classList.add("hidden");
    document.getElementById('feedContent').classList.add("hidden");
};


backButton.addEventListener("click", function() {
    profile.classList.add("hidden");
    document.getElementById('feedContent').classList.remove("hidden");
    userFeed.classList.add("active");
    resources.classList.remove("active");
    saved.classList.remove("active");
    newPost.classList.remove("hidden");
});