import { createApi } from 'unsplash-js';
import { saveToStorage, getFromStorage } from './localStorage';
import { RenderMenu } from './renderMenu';
import { RenderInformation } from './RenderInformation';
import { ToggleStatus } from './ToggleStatus';

//initialize
const content= document.querySelector('#content');
let favorite = getFromStorage();
const blackHeart = '\u2665';
let photos =[];
let flag = true;
const menuList = ["Modren Art", "Abstract", "Classic", "Cubism", "Sculptures", "Favorite"];

//API key
const unsplash = createApi({
    accessKey: 'iAsMitWEByhYlU4YoiImNcRGeOGrlilLU09fFwBmHmY',
});

//Create menu buttons
RenderMenu({menuList});

//Display Modren Art when the page loads up
getdetails("Modren Art");

//create event listner for each menu button
const allButtons = document.querySelectorAll("button");
allButtons.forEach ((button) => {
    button.addEventListener('click', (button) => {
        getdetails(button.target.innerText)});
});





//function to get photos from API and to display them on document
function getdetails(searchKeyword) {

    if (searchKeyword === "Favorite"){
        flag = false;
        renderDetails(favorite); 

        } else {
            flag = true;
            unsplash.search.getPhotos({
                query: searchKeyword,
                page: 1,
                perPage: 16,
                orientation: 'portrait',
            }).then(results => {
                if (results.type === 'success') {
                    photos = results.response.results;
                }         
                    renderDetails(photos);
                })
            }
    }

//render photos to DOM
function renderDetails (photos) {
    let classStatus;
     if (favorite.length > 0) {
         favorite.forEach(i => {
            photos.forEach(j => {
                if (i.id === j.id)
                {
                    j.isfavorite = true;
                }
            })
         })
     }
    const getUrls = photos.map(i => {
        if (i.isfavorite === true){
            classStatus = 'active';
        } else {
            classStatus = 'inactive';
        }
        return `<div class="photo-display">
        <img class="images" id=${i.id} src="${i.urls.regular}"/>
        <p class="heart ${classStatus}" id=${i.id}>${blackHeart}</p>
        </div>`;
    });
    content.innerHTML = getUrls.join('');
    attacheventlistener();
}

//attach event listner to hearts once loaded
function attacheventlistener () {
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach ((button) => {
    button.addEventListener('click', (e) =>{
        const selectedHeart = ToggleStatus(e.target);
        if (selectedHeart.classList[1] === "active") {
            addTOFavorite(selectedHeart.id);
        } else {
            removeFromFavorite(selectedHeart.id);
        }
    });
    });
    const images = document.querySelectorAll(".images");
    images.forEach((image) => {
        image.addEventListener('click', (e) => showDetails(e.target.id));
        
    })

}

//Add to Favorite
function addTOFavorite (id) {
    const index = photos.findIndex(i => i.id === id );
    photos[index].isfavorite = true;
    favorite.push(photos[index]);
    saveToStorage(favorite);
    renderDetails(photos);
}

// Remove from Favorite
function removeFromFavorite (id) {
    const index = favorite.findIndex(i => i.id === id);
    const index2 = photos.findIndex(j => j.id === id);
    index2 > -1 ? photos[index2].isfavorite = false : null;
    const removed = favorite.splice(index, 1);
    saveToStorage(favorite);
    flag ? null : renderDetails(favorite);
}


//Show Details of the image
function showDetails (id) {
    let displayData=[];
    let index = photos.findIndex(i => i.id === id);
    if (index > -1){
        displayData = photos[index];
    } else {
       index= favorite.findIndex(i => i.id === id);
       displayData = favorite[index];
    }
    const contentToBeRendered = RenderInformation({displayData});
    content.innerHTML = contentToBeRendered;

    const home = document.querySelector(".homeButton");
    home.addEventListener('click', () => {flag ? renderDetails(photos) : renderDetails(favorite);});
}