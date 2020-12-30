//Url and Endpoints
let urlstart = "https://api.sportsdata.io/v3/nba/stats/json/";
let key = "?key=04342f2525124fc8967646d8bfc8826e";
let newsEndpoint = "News";
let playerStatsForDate = "PlayerGameStatsByDate/";

// gets the date for the endpoint
function setDateEndPoint(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let monthsArr = ["JAN" , "FEB", "MAR", "APR" , "MAY" , "JUN" , "JUL" , "AUG", "SEP" , "OCT", "NOV", "DEC"];
    let monthStr = monthsArr[month];
    let previousDay = new Date(today.setDate(today.getDate() - 1));
    let previousDayNum = previousDay.getDate(); 
    let dateEndpoint = `${year}-${monthStr}-${previousDayNum}`;
    return dateEndpoint;
}

setInterval(setDateEndPoint , 1000);
let dateEndpointValue = setDateEndPoint();

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

// Code for getting player images
let pointsLeaderID = "";
let assistsLeaderID = "";
let rebsLeaderID = "";
let stealsLeaderID = "";
let blocksLeaderID = "";
let pointsLeaderImgURL;
let assistsLeaderImgURL;
let rebsLeaderImgURL;
let stealsLeaderImgURL;
let blocksLeaderImgURL;


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
})

fetch(urlstart + playerStatsForDate + dateEndpointValue + key).then(function(response){
    return response.json();
}).then(function(data){
    for(let i = 0; i < data.length -1; i++){
        if(data[i].Points > points){
            points = data[i].Points;
            pointsLead = data[i].Name + " (Points)";
            //pointsLeaderID = data[i].PlayerID;
            //console.log(pointsLeaderID)
        }
        if(data[i].Assists > assists){
            assists = data[i].Assists;
            assistsLead = data[i].Name + " (Assists)";
            //assistsLeaderID += data[i].PlayerID;
        }
        if(data[i].Rebounds > rebounds){
            rebounds = data[i].Rebounds;
            rebsLead = data[i].Name + " (Rebounds)";
            // rebsLeaderID = data[i].PlayerID;
        }
        if(data[i].Steals > steals){
            steals = data[i].Steals;
            stealsLead = data[i].Name + " (Steals)";
            // stealsLeaderID = data[i].PlayerID;
        }
        if(data[i].BlockedShots > blocks){
            blocks = data[i].BlockedShots;
            blocksLead = data[i].Name + " (Blocks)";
            // blocksLeaderID = data[i].PlayerID;
        }
    
    }

    // Sets each the nights Stats leaders to a section in the 
    document.getElementById("pointsLeader").innerHTML = pointsLead;
    document.getElementById("assistsLeader").innerHTML = assistsLead;
    document.getElementById("reboundsLeader").innerHTML = rebsLead;
    document.getElementById("stealsLeader").innerHTML = stealsLead;
    document.getElementById("blocksLeader").innerHTML = blocksLead;
});


// function gets the leaders image when given a players ID in the API and then sets it to the variable 
// respective of the stat in which the player lead

// function fetchLeaderImage(leaderID, leaderImage){
//     fetch(urlstart + "Player/" + leaderID + key).then(function(response){
//         return response.json();
//     }).then(function(data){
//         leaderImage = data.PhotoUrl;
//     });
// }


// fetchLeaderImage(pointsLeaderID, pointsLeaderImgURL);
// fetchLeaderImage(assistsLeaderID, assistsLeaderImgURL);
// fetchLeaderImage(rebsLeaderID, rebsLeaderImgURL);
// fetchLeaderImage(stealsLeaderID, stealsLeaderImgURL);
// fetchLeaderImage(blocksLeaderID, blocksLeaderImgURL);


// let pointsLeadImage = document.createElement("img");
// let assistsLeadImage = document.createElement("img");
// let rebsLeadImage = document.createElement("img");
// let stealsLeadImage = document.createElement("img");
// let blocksLeadImage = document.createElement("img");

// pointsLeadImage.src = pointsLeaderImgURL;
// assistsLeadImage.src = assistsLeaderImgURL;
// rebsLeadImage.src = rebsLeaderImgURL;
// stealsLeadImage.src = stealsLeaderImgURL;
// blocksLeadImage.src = blocksLeaderImgURL;

// document.getElementById("pointsLeader").appendChild(pointsLeadImage);
// document.getElementById("assistsLeader").appendChild(assistsLeadImage);
// document.getElementById("reboundsLeader").appendChild(rebsLeadImage);
// document.getElementById("stealsLeader").appendChild(stealsLeadImage);
// document.getElementById("blocksLeader").appendChild(blocksLeadImage);










