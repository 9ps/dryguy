const content = document.querySelector('#feedContent');
const resourceContent = document.querySelector('#resourceContent');
const savedContent = document.querySelector('#savedContent');


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'files/UserFeedContent.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    jsonresponse.forEach(post => {
        //DOM creation for HTML elements
        //Create card div element
        let card = document.createElement('div');
        card.setAttribute("class", "card")
        card.id = post.id;

        //Create profile image
        let dp = document.createElement('img');
        dp.setAttribute("class", "smalldp");
        dp.src = "images/profile_picture.jpg";
        //dp.onclick = openProfile();

        //Create title username element
        let heading = document.createElement('h2');
        heading.textContent = post.username;

        //Create date element
        let date = document.createElement('h4');
        date.textContent = post.date;

        //create save button
        let saveID = post.id + 'save';
        let save = document.createElement('button');
        save.setAttribute('saveID', saveID);
        save.setAttribute('class', 'saveBtn');
        save.textContent = "Save";

        save.addEventListener("click", function() {
            save.classList.toggle("liked");

            if (save.classList.contains("liked")) {
                save.textContent = "Saved"
                savedContent.appendChild(card.cloneNode(true));

            } else {

                save.textContent = "Save"

                for (i = 0; i < savedContent.children.length; i++) {
                    if (savedContent.children[i].id == card.id) {
                        console.log("Index:", i, "Item:", savedContent.children[i]);
                        savedContent.children[i].remove();
                        break;
                    }
                }
            }
        })

        //Create body p element
        let title = document.createElement('h3');
        title.textContent = post.title;

        let description = document.createElement('p');
        description.textContent = post.post;

        //create like & replies buttons
        let likeID = post.id + 'like'
        let btn = document.createElement('button');
        btn.setAttribute('id', likeID);
        btn.textContent = post.likes + " likes";

        btn.addEventListener("click", function() {
            //console.log("liked");
            btn.classList.toggle("liked");
            if (btn.classList.contains("liked")) {
                btn.textContent = post.likes + 1 + " likes";
            } else {
                btn.textContent = post.likes + " likes";
            }
        })

        let replies = document.createElement('button');
        replies.setAttribute('id', 'repliesBtn');
        replies.textContent = post.replies + " replies";

        replies.addEventListener("click", function() {

        });

        //Append the text elements to the card element
        card.appendChild(dp);
        card.appendChild(heading);
        card.appendChild(date);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(btn);
        card.appendChild(replies);
        card.appendChild(save);

        //Append the card element to the page
        content.appendChild(card);
        //Content population
    });

});


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

    let blogCard = document.getElementById('blogCard');
    let blogPostContent = document.getElementById('blogPost');

    if (blogCard !== null) {
        blogPostContent.removeChild(blogCard);
    }
});
resources.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('resourcesTab', activeElement);

    let blogCard = document.getElementById('blogCard');
    let blogPostContent = document.getElementById('blogPost');

    if (blogCard !== null) {
        blogPostContent.removeChild(blogCard);
    }

});
saved.addEventListener("click", function() {
    let activeElement = document.getElementsByClassName("active");
    toggleActive('savedTab', activeElement);

    let blogCard = document.getElementById('blogCard');
    let blogPostContent = document.getElementById('blogPost');

    if (blogCard !== null) {
        blogPostContent.removeChild(blogCard);
    }
});


function loadJSON2(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'files/BlogContent.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// Call to function with anonymous callback
loadJSON2(function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    jsonresponse.forEach(post => {
        //Testing resource stuff (this will loop through a seperate api)
        let card2 = document.createElement('div');
        card2.setAttribute("class", "card")
        card2.id = post.id;

        let saveID = post.id + "savePost";
        let saveBlog = document.createElement('button');
        saveBlog.setAttribute('saveID', saveID);
        saveBlog.setAttribute('class', 'saveBtn');
        saveBlog.setAttribute('class', 'center');
        saveBlog.textContent = "Save";

        saveBlog.addEventListener("click", function() {
            saveBlog.classList.toggle("liked");

            if (saveBlog.classList.contains("liked")) {
                saveBlog.textContent = "Saved"
                savedContent.appendChild(card2.cloneNode(true));

            } else {

                saveBlog.textContent = "Save"

                for (i = 0; i < savedContent.children.length; i++) {
                    if (savedContent.children[i].id == card2.id) {
                        console.log("Index:", i, "Item:", savedContent.children[i]);
                        savedContent.children[i].remove();
                        break;
                    }
                }
            }
        })

        let author = document.createElement('h2');
        author.textContent = post.author;

        let date = document.createElement('h4');
        date.textContent = post.date;

        let title = document.createElement('h3');
        title.textContent = post.title;

        let image = document.createElement('img');
        image.src = "images/blog_image.jpg";
        image.setAttribute("class", "blogImage");

        let body = document.createElement('p');
        body.textContent = post.summary;

        card2.addEventListener("click", function() {
            let blogPostContent = document.getElementById('blogPost');

            blogPostContent.classList.remove("hidden");

            document.getElementById('feedContent').classList.add("hidden");
            document.getElementById('resourceContent').classList.add("hidden");
            document.getElementById('savedContent').classList.add("hidden");

            let card3 = document.createElement('div');
            card3.setAttribute('id', 'blogCard');
            card3.setAttribute('class', 'card');

            let closePost = document.createElement('button');
            closePost.setAttribute('class', 'right');
            closePost.textContent = "close";

            closePost.addEventListener("click", function() {
                blogPostContent.removeChild(card3)
                if (resources.classList.contains("active")) {
                    document.getElementById('resourceContent').classList.remove("hidden");
                } else if (saved.classList.contains("active")) {
                    document.getElementById('savedContent').classList.remove("hidden");
                }
            })

            let blogPost = document.createElement('p');
            //console.log(post.content);
            blogPost.textContent = post.content;

            let source = document.createElement('button');
            source.setAttribute('class', 'center');
            source.textContent = "source";
            source.addEventListener("click", function() {
                let url = post.source;
                window.open(url, '_blank').focus();
            })

            card3.appendChild(closePost);
            card3.appendChild(author.cloneNode(true));
            card3.appendChild(date.cloneNode(true));
            card3.appendChild(title.cloneNode(true));
            card3.appendChild(blogPost);
            card3.appendChild(source);

            blogPostContent.appendChild(card3);

        })

        card2.appendChild(image);
        card2.appendChild(author);
        card2.appendChild(date);
        card2.appendChild(title);
        card2.appendChild(body);
        card2.appendChild(saveBlog);


        resourceContent.appendChild(card2);

    });

});



//function to switch between tabs
function toggleActive(elementID, activeID) {
    var element = document.getElementById(elementID);
    var activeElement = document.getElementById(activeID);
    //console.log(element);
    if (element == activeElement) {} else {
        //console.log(elementID);
        activeID[0].classList.remove("active");
        element.classList.add("active");
        activeID[1].classList.add("hidden");
        activeID[1].classList.remove("active");
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

function openProfile(displayUser) {
    document.getElementById('username').textContent = displayUser;
    profile.classList.remove("hidden");
    document.getElementById('feedContent').classList.add("hidden");
    document.getElementById('resourceContent').classList.add("hidden");
    document.getElementById('savedContent').classList.add("hidden");

    let blogCard = document.getElementById('blogCard');
    let blogPostContent = document.getElementById('blogPost');

    if (blogCard !== null) {
        blogPostContent.removeChild(blogCard);
    }
};


backButton.addEventListener("click", function() {
    profile.classList.add("hidden");
    document.getElementById('feedContent').classList.remove("hidden");
    userFeed.classList.add("active");
    resources.classList.remove("active");
    saved.classList.remove("active");
    newPost.classList.remove("hidden");
});