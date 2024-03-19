export const RenderInformation = function ({displayData}) {
        return (`<div class="detailed-Display">
        <div class="home"><button class="homeButton"> ⏪ Back</button></div>
         <img class="display-image" src=${displayData.urls.regular}/>
         <div class="description">
         <h3>Description : ${displayData.alt_description}</h3>
         <h3>Created By: ${displayData.user.first_name} </h3>
         <h3>Full Image: <a href=${displayData.urls.full} target="/blanck">Click here</a> </h3>
         </div>    
    </div>`) ;
}