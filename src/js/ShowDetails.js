import { RenderInformation } from "./RenderInformation";

//Show Details of the image

export const ShowDetails = function (id, photos, favorite, flag ) {
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
    return home;
}