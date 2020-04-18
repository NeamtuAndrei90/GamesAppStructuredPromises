var apiURL = "https://games-world.herokuapp.com";

// function getGamesList(callbackFunction){
//     fetch(apiURL + "/games", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     }).then(function(response){
//         return response.json();
//     }).then(function(arrayOfGames){
//         callbackFunction(arrayOfGames);
//     });
// }

function getGamesList(){
    return fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        } 
    })
    .then(response => response.json());
}


// function deleteGame(gameID, callbackFunction) {
//     fetch(apiURL + "/games/" + gameID, {
//         method: "DELETE"
//     }).then(function(r){
//         return r.text();
//     }).then(function(apiresponse){
//         callbackFunction(apiresponse);
//     });

// }

function deleteGame(gameID){
    return fetch(apiURL + "/games/" + gameID, {
        method: "DELETE",
    }).then(r => r.text());
}

// function createGameRequest(gameObject, callbackCreateGame){
//     fetch(apiURL + "/games", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: gameObject
//     }).then(function(response){
//         return response.json();
//     }).then(function(createdGame){
//         console.log(createdGame);
//         callbackCreateGame(createdGame);
//     });
// }

function createGameRequest(gameObject){
    return fetch(apiURL + "/games/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(response => response.json());
}


// function updateGameRequest(gameId, updatedGameObj, callbackCreateGame){
//     fetch(apiURL + "/games/" + gameId , {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: updatedGameObj
//     }).then(function(response){
//         return response.json();
//     }).then(function(updatedGame){
//         console.log(updatedGame);
//         callbackCreateGame(updatedGame);
//     });
// }

function updateGameRequest(gameId, updatedGameObj){
    return fetch(apiURL + "/games/" + gameId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    }).then(response => response.json())
}