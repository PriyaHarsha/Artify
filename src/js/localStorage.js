export const saveToStorage = function (favoriteList) {
    window.localStorage.setItem(
        'favorite_Items',
        JSON.stringify(favoriteList),
    );
}

export const getFromStorage = function () {
    
    const getFavorite = window.localStorage.getItem('favorite_Items');
        
    return (
        getFavorite ? JSON.parse(getFavorite) : [] 
    )
        
    
    
}