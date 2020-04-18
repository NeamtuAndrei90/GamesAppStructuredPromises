
// getGamesList(function(arrayOfGames){
//     for(var i = 0; i < arrayOfGames.length; i++) {
//         createDomElement(arrayOfGames[i]);
//     }
// });

getGamesList().then(arrayOfGames =>{
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id)
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                            <img src="${gameObj.imageUrl}" />
                            <p>${gameObj.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="edit-btn">Edit Game</button>`;

    const updateGameElement = document.createElement('form');
    updateGameElement.classList.add('updateForm')
    updateGameElement.innerHTML = `<label for="newGameTitle">Title *</label>
                                    <input type="text" value="${gameObj.title}" name="newGameTitle" id="newGameTitle" />
                                    <label for="newGameDescription">Description</label>
                                    <textarea name="newGameDescription" id="newGameDescription">${gameObj.description}</textarea>
                                    <label for="newGameImageUrl">Image URL *</label>
                                    <input type="text" name="newGameImageUrl" id="newGameImageUrl" value="${gameObj.imageUrl}"/>
                                    <button class="updateBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>`;

    container1.appendChild(gameELement);
    
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
        if(event.target.classList.contains('delete-btn')){
            const gameDiv = event.target.parentElement;
            // deleteGame(gameELement.getAttribute("id"), function(apiResponse){
            //     console.log(apiResponse);
            //     removeDeletedElementFromDOM(gameDiv);
            // })

            deleteGame(gameELement.getAttribute("id")).then(apiResponse => {
                console.log(apiResponse);
                removeDeletedElementFromDOM(gameDiv);
            })
        }else if(event.target.classList.contains('edit-btn')) {
            const gameDiv = event.target.parentElement;
            gameDiv.appendChild(updateGameElement);
        }else if(event.target.classList.contains('cancelBtn')){
            const gameForm = event.target.parentElement;
            removeDeletedElementFromDOM(gameForm);
        }else if(event.target.classList.contains('updateBtn')){
            const gameForm = event.target.parentElement;
            event.preventDefault();
            console.log(gameForm.parentElement);
            newDomElement(gameForm.parentElement);
            removeDeletedElementFromDOM(gameForm);
        }
    });

}

function newDomElement(gameElement){
    const newGameTitle = document.getElementById("newGameTitle").value;
    const newGameDescription = document.getElementById("newGameDescription").value;
    const newGameImageUrl = document.getElementById("newGameImageUrl").value;
    gameElement.querySelector('h1').innerHTML = newGameTitle;
    gameElement.querySelector('p').innerHTML = newGameDescription;
    gameElement.querySelector('img').src = newGameImageUrl;
    var urlencoded = new URLSearchParams();
    urlencoded.append("title", newGameTitle);
    urlencoded.append("description", newGameDescription);
    urlencoded.append("imageUrl", newGameImageUrl);
console.log(gameElement);
    // updateGameRequest(gameElement.getAttribute('id'), urlencoded, createDomElement);
    updateGameRequest(gameELement.getAttribute('id'),urlEncoded).then(editedDom);
}

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        // createGameRequest(urlencoded, createDomElement);
        createGameRequest(urlencoded).then(createDomElement);
    }
})
