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

function loadJSON3(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'files/Replies.json', true);
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
        dp.src = post.profPic;
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

        let repliesID = post.id + "replies";
        let replies = document.createElement('button');
        replies.setAttribute('id', repliesID);
        replies.textContent = post.replies + " replies";

        replies.addEventListener("click", function() {

            document.getElementById('newPost').classList.add('hidden');

            repliesContent.appendChild(card.cloneNode(true));
            document.getElementById('header').classList.add('hidden');
            content.classList.add('hidden');

            repliesSection.classList.remove('hidden');

            let countReplies = 0;

            loadJSON3(function(response2) {
                jsonresponse2 = JSON.parse(response2);

                // Assuming json data is wrapped in square brackets as Drew suggests
                jsonresponse2.every(reply => {

                    if (countReplies == post.replies) {
                        return false;
                    }

                    let card5 = document.createElement('div');
                    card5.setAttribute('class', 'card');

                    let p = document.createElement('p');
                    p.textContent = reply.body;

                    let profilePic = document.createElement('img');
                    profilePic.setAttribute('class', 'smalldp')
                    profilePic.src = reply.pofPic;

                    let replyUser = document.createElement('h2');
                    replyUser.textContent = reply.username;

                    card5.appendChild(profilePic);
                    card5.appendChild(replyUser);
                    card5.appendChild(p);

                    repliesContent.appendChild(card5);

                    countReplies++
                    return true;

                })
            });
            let closeReplies = document.getElementById('closePost');
            closeReplies.addEventListener("click", function() {
                document.getElementById('header').classList.remove('hidden');
                document.getElementById('newPost').classList.remove('hidden');
                content.classList.remove('hidden');
                repliesSection.classList.add("hidden");
                console.log(repliesContent.childNodes)
                let sectionLength = repliesContent.childNodes.length;
                for (let i = 0; i < sectionLength; i++) {
                    if (i !== 0) {
                        console.log(repliesContent.childNodes[i])
                        repliesContent.removeChild(repliesContent.childNodes[i]);
                        //repliesContent.removeChild(card5);
                    }
                }
            })
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

let repliesSection = document.getElementById('replies');
let repliesContent = document.getElementById('repliesContent');


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


    console.log(blogCard)
    console.log(blogPostContent)

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
    console.log(savedContent.childNodes)
    console.log(savedContent.childNodes[1])
    if (savedContent.childNodes[1] == advice || savedContent.childNodes[1] == null) {
        savedContent.appendChild(advice);
    } else if (savedContent.childNodes.length > 1) {
        savedContent.removeChild(advice);
    }


});

let advice = document.createElement('p');
advice.setAttribute('class', 'advice')
advice.textContent = "You haven't saved anything yet! Check out the User Feed or Resources. Any posts you save will be displayed here!"


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
        image.src = post.image;
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


var newReply = document.getElementById("newReply");

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
            newReply.classList.add("hidden");
        } else if (elementID == 'savedTab') {
            var visibleElement = document.getElementById('savedContent');
            visibleElement.classList.add("active");
            visibleElement.classList.remove("hidden");
            newPost.classList.add("hidden");
            newReply.classList.add("hidden");
        }
    }
}


function savePost(elementID) {
    var element = document.getElementById(elementID);
    //console.log(element);
    element.classList.toggle("liked");

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("newPostBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("closeBtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

function handleFormSubmit(event) {
    newPostPopup.classList.add("hidden");
    newPost.classList.remove("hidden");

    event.preventDefault();

    const data = new FormData(event.target);

    const results = Object.fromEntries(data.entries());


    const neewUserPost = document.querySelector('.newUserPost');
    //let results = JSON.stringify(formJSON, null, 2);

    console.log(results)

    let card4 = document.createElement('div');
    card4.setAttribute("class", "card")

    //Create profile image
    let dp = document.createElement('img');
    dp.setAttribute("class", "smalldp");
    dp.src = "images/profile_picture.jpg";
    //dp.onclick = openProfile();

    //Create title username element
    let heading = document.createElement('h2');
    heading.textContent = "ricky-boi"

    //Create date element
    let date = document.createElement('h4');
    date.textContent = "today"

    //Create body p element
    let title = document.createElement('h3');
    title.textContent = results.subject;

    let description = document.createElement('p');
    description.textContent = results.postBody;

    //create like & replies buttons
    let btn = document.createElement('button');
    btn.textContent = 0 + " likes";

    let replies = document.createElement('button');
    replies.setAttribute('id', 'repliesBtn');
    replies.textContent = 0 + " replies";

    replies.addEventListener("click", function() {

    });

    //Append the text elements to the card element
    card4.appendChild(dp);
    card4.appendChild(heading);
    card4.appendChild(date);
    card4.appendChild(title);
    card4.appendChild(description);
    card4.appendChild(btn);
    card4.appendChild(replies);

    //Append the card element to the page
    neewUserPost.appendChild(card4);

    neewUserPost.insertBefore(card4, neewUserPost.childNodes[0]);
    //Content population
}

const form = document.querySelector('.newPostForm');
form.addEventListener('submit', handleFormSubmit);


// Get the modal
var replyModal = document.getElementById("replyModal");

// Get the button that opens the modal
var replyBtn = document.getElementById("newReplyBtn");

// Get the <span> element that closes the modal
var replySpan = document.getElementById("replyCloseBtn");

// When the user clicks on the button, open the modal
replyBtn.onclick = function() {
    replyModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
replySpan.onclick = function() {
    replyModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == replyModal) {
        replyModal.style.display = "none";
    }
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const replyForm = document.getElementById('newReplyForm');
replyForm.addEventListener('submit', handleFormSubmitReply);

function handleFormSubmitReply(event) {
    replyModal.classList.add("hidden");
    replyBtn.classList.remove("hidden");

    event.preventDefault();

    const data = new FormData(event.target);

    const results = Object.fromEntries(data.entries());


    const repliesContent = document.getElementById('repliesContent');
    //let results = JSON.stringify(formJSON, null, 2);

    console.log(results)

    let card6 = document.createElement('div');
    card6.setAttribute("class", "card")

    //Create profile image
    let dp = document.createElement('img');
    dp.setAttribute("class", "smalldp");
    dp.src = "images/profile_picture.jpg";
    //dp.onclick = openProfile();

    //Create title username element
    let heading = document.createElement('h2');
    heading.textContent = "ricky-boi"

    //Create body p element

    let description = document.createElement('p');
    description.textContent = results.postReply;

    //Append the text elements to the card element
    card6.appendChild(dp);
    card6.appendChild(heading);
    card6.appendChild(description);

    console.log(card6);

    //Append the card element to the page
    repliesContent.appendChild(card6);

    //repliesContent.insertBefore(card6, repliesContent.childNodes[0]);
    //Content population
}