//DOM selection for content element
const content = document.querySelector('.content');

//XML HTTP Request
var request = new XMLHttpRequest();

//Open connection
request.open("GET", "https://jsonplaceholder.typicode.com/posts");

//Handling response
request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        //console.log(data);

        data.forEach(function (post) {
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
            let save = document.createElement('button');
            save.setAttribute('id', 'saveBtn');
            save.textContent = "Save post";

            //Create body p element
            let description = document.createElement('p');
            description.textContent = post.body;

            //create like & replies buttons
            let btn = document.createElement('button');
            btn.setAttribute('id', 'likeBtn');
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