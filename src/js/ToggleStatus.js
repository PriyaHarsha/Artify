

export const ToggleStatus = function (selectedHeart) {
    //toggle the status {
    selectedHeart.classList.toggle("inactive");
    selectedHeart.classList.toggle("active");
    return (selectedHeart);
}

export default ToggleStatus;