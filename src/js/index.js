import { createApi } from 'unsplash-js';
import { saveToStorage, getFromStorage } from './localStorage';
import { RenderMenu } from './renderMenu';
import { ShowDetails } from './ShowDetails';
import { ToggleStatus } from './ToggleStatus';

//initialize
const content = document.querySelector('#content');
let favorite = getFromStorage();
const blackHeart = '\u2665';
let photos = [];
let flag = true;
const menuList = ["Modren Art", "Abstract", "Classic", "Cubism", "Sculptures", "Favorite"];

//API key
const unsplash = createApi({
    accessKey: 'iAsMitWEByhYlU4YoiImNcRGeOGrlilLU09fFwBmHmY',
});



//Create menu buttons and attach listner
RenderMenu({ menuList });
const allButtons = document.querySelectorAll(".buttons");
allButtons.forEach((button) => {
    button.addEventListener('click', (button) => {
        getdetails(button.target.innerText)
    });
});

//Display Modren Art when the page loads up
getdetails("Modren Art");


const searchButton = document.querySelector(".searchButton");
searchButton.addEventListener('click', searchArt);

function searchArt () {
    console.log('in');
    const searchInput = document.querySelector(".searchInput");
    console.log(searchInput.value);
    getdetails(searchInput.value);
}




//to get photos from API and to display them on document
async function getdetails(searchKeyword) {

    if (searchKeyword === "Favorite") {
        flag = false;
        renderDetails(favorite);

    } else {
        flag = true;
        console.log(searchKeyword);
        await unsplash.search.getPhotos({
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
function renderDetails(photos) {
    let getUrls = '';
    if (photos.length <= 0) {
        getUrls = `<div class="nothing-to-display">
            <h2>Nothing to display</h2>
            </div>`
    }
    else {
        let classStatus;
        if (favorite.length > 0) {
            favorite.forEach(i => {
                photos.forEach(j => {
                    if (i.id === j.id) {
                        j.isfavorite = true;
                    }
                })
            })
        }
        getUrls = photos.map(i => {
            if (i.isfavorite === true) {
                classStatus = 'active';
            } else {
                classStatus = 'inactive';
            }
            return `<div class="photo-display">
                <img class="images" id=${i.id} src="${i.urls.regular}"/>
                <p class="heart ${classStatus}" id=${i.id}>${blackHeart}</p>
                </div>`;

        });
        getUrls = getUrls.join('');
    }
    content.innerHTML = getUrls;
    attacheventlistener();

}

//attach event listner to heart buttons and images
function attacheventlistener() {
    const hearts = document.querySelectorAll(".photo-display");
    hearts.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.classList[0] === "heart") {
                const selectedHeart = ToggleStatus(e.target);
                selectedHeart.classList[1] === "active" ?
                    addTOFavorite(selectedHeart.id) :
                    removeFromFavorite(selectedHeart.id);
            } else {
                const home = ShowDetails(e.target.id, photos, favorite, flag);
                home.addEventListener('click', () => { flag ? renderDetails(photos) : renderDetails(favorite) });
            }
        });
    });
}

//Add to Favorite
function addTOFavorite(id) {
    const index = photos.findIndex(i => i.id === id);
    photos[index].isfavorite = true;
    favorite.push(photos[index]);
    saveToStorage(favorite);
    renderDetails(photos);
}

// Remove from Favorite
function removeFromFavorite(id) {
    const index = favorite.findIndex(i => i.id === id);
    const index2 = photos.findIndex(j => j.id === id);
    index2 > -1 ? photos[index2].isfavorite = false : null;
    const removed = favorite.splice(index, 1);
    saveToStorage(favorite);
    flag ? null : renderDetails(favorite);
}
