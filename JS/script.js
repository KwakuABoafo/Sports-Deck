
//Url and Endpoints
let urlstart = "https://api.sportsdata.io/v3/nba/stats/json/";
let key = "?key=04342f2525124fc8967646d8bfc8826e";
let newsEndpoint = "News";
let playerStatsForDate = "PlayerGameStatsByDate/";

// gets the date for the endpoint
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let monthsArr = ["JAN" , "FEB", "MAR", "APR" , "MAY" , "JUN" , "JUL" , "AUG", "SEP" , "OCT", "NOV", "DEV"];
let monthStr = monthsArr[month -1];
let previousDay = new Date(today.setDate(today.getDate() - 1));
let previousDayNum = previousDay.getDate(); 
let dateEndpoint = `${year}-${monthStr}-${previousDayNum}`;

// Variables for Tonights Leaders Section
let points = 0;
let assists = 0;
let rebounds = 0;
let steals = 0;
let blocks = 0;
let pointsLead = "";
let assistsLead = "";
let rebsLead = "";
let stealsLead = "";
let blocksLead = "";


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


fetch(urlstart + playerStatsForDate + dateEndpoint + key).then(function(response){
    return response.json();
}).then(function(data){
    for(let i = 0; i < data.length -1; i++){
        if(data[i].Points > points){
            points = data[i].Points;
            pointsLead = data[i].Name;
        }
        if(data[i].Assists > assists){
            assists = data[i].Assists;
            assistsLead = data[i].Name;
        }
        if(data[i].Rebounds > rebounds){
            rebounds = data[i].Rebounds;
            rebsLead = data[i].Name;
        }
        if(data[i].Steals > steals){
            steals = data[i].Steals;
            stealsLead = data[i].Name;
        }
        if(data[i].Blocks > blocks){
            blocks = data[i].Blocks;
            blocksLead = data[i].Name;
        }
    
    }
    console.log(pointsLead);
    console.log(assistsLead);
    console.log(rebsLead);
    console.log(stealsLead);
    console.log(blocksLead);

    let PL = document.getElementById("pointsLeader");
    let AL = document.getElementById("assistsLeader");
    let RL = document.getElementById("reboundsLeader");
    let SL = document.getElementById("stealsLeader");
    let BL = document.getElementById("blocksLeader");
 
    PL.innerHTML = pointsLead;
    AL.innerHTML = assistsLead;
    RL.innerHTML = rebsLead;
    SL.innerHTML = stealsLead;
    BL.innerHTML = blocksLead;
    
});
