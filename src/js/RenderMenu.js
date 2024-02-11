export const RenderMenu = function ({menuList}) {
    let menuButtons = "";
    menuList.forEach((menuButton) => {
    menuButton = `<button class="buttons">${menuButton}</button>` ;
    menuButtons += menuButton;
    });

    document.getElementById('menuButtons').innerHTML = menuButtons;
}


