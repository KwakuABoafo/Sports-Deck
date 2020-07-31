let urlstart = "https://api.sportsdata.io/v3/nba/stats/json/";
let key = "?key=04342f2525124fc8967646d8bfc8826e";
let newsEndpoint = "News";


// this code fetchs sports news (currently only nba news) and populates the feed
fetch(urlstart + newsEndpoint + key).then(function(response){
    return response.json();
}).then(function(data){
    for(let i = 0; i < data.length - 1; i++){
    // this composes the structure of the post

        // this is the general card
        let post = document.createElement("div");
        post.className = "card text-center";

        //this is the heading on the card
        let heading = document.createElement("div");
        heading.className = "card-header";
        heading.innerHTML = data[i].Title;
        heading.style.fontWeight = "bold";
        heading.style.color = "#d00";

        // this is the content of the card 
        let postBody = document.createElement("div");
        postBody.className = "card-body";
        let content = document.createElement("p");
        content.innerHTML = data[i].Content;
        postBody.appendChild(content);

        //this is the interaction menu 
        let navigation = document.createElement("div");
        navigation.className = "btn-group";
        let like = document.createElement("button");
        let dislike = document.createElement("button");
        let comment = document.createElement("button");
        let view = document.createElement("button");
        like.innerHTML = "Like";
        dislike.innerHTML = "Dislike";
        comment.innerHTML = "Comment";
        view.innerHTML = "View";
        like.className = "btn btn-primary";
        dislike.className = "btn btn-primary";
        comment.className = "btn btn-primary";
        view.className = "btn btn-primary";
        navigation.appendChild(like);
        navigation.appendChild(dislike);
        navigation.appendChild(comment);
        navigation.appendChild(view);
        
        // this code puts all the pieces of the card together 
        // and spaces them out appropriately 
        post.appendChild(heading);
        post.appendChild(postBody);
        post.appendChild(navigation);
        let feed = document.getElementById("feedView");
        feed.appendChild(post);
        post.style.width = "800px";
        post.style.marginLeft = "20px";
        post.style.marginRight = "20px";
        post.style.marginBottom = "20px";

    }
});

