export const RenderMenu = function ({menuList}) {
    let menuButtons = "";
    menuList.forEach((menuButton) => {
    menuButton = `<button class="buttons">${menuButton}</button>` ;
    menuButtons += menuButton;
    });
    let searchButton= `<div class="searchMenu"><input class="searchInput" value="Search here"></input><button class="searchButton">Search</button></div>`;
    let menuButtons1= searchButton + menuButtons;
    document.getElementById('menuButtons').innerHTML = menuButtons1;
}


