//METHODS, use localStorage.<>()
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

let data = localStorage.getObject("data");
if (data == null) { //if onboarding not complete
    console.log("no Data, fallback");
    localStorage.setObject("data", { name: "Ricky", 'dryDays': [0, 0, 1, 0, 1, 0, 0], 'dailyLimit': 2, 'majorGoal': 3, 'minorGoals': [1, 1, 1, 1, 0, 0, 0, 0] });
    let data = localStorage.getObject("data");
}

let username = document.getElementById('username');
username.textContent = data.name;


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

const content = document.getElementById('postsContent');
const repliesContent = document.getElementById('replies');

// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);

    // Assuming json data is wrapped in square brackets as Drew suggests
    jsonresponse.forEach(post => {


        if (post.name == 'Ricky') {
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

                if (repliesContent.childNodes.length > 0) {
                    repliesContent.classList.toggle('hidden');
                } else {

                    repliesContent.classList.remove('hidden');

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
                }
            });

            //Append the text elements to the card element
            card.appendChild(dp);
            card.appendChild(heading);
            card.appendChild(date);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(btn);
            card.appendChild(replies);

            //Append the card element to the page
            content.appendChild(card);
            //Content population

        }
    });

});